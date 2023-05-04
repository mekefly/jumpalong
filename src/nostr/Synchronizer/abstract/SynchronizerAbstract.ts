import { LocalStorageMap } from "@/utils/cache/cacheKeyList";
import { getPubkeyOrNull } from "@/utils/nostrApiUse";
import { setAdds, syncInterval, timeout } from "@/utils/utils";
import { inject, injectable } from "inversify";
import { Event, Filter } from "nostr-tools";
import { EventBeltline, PublishOpt } from "../../eventBeltline";
import { TYPES, relayConfigurator, rootEventBeltline } from "../../nostr";
import autoAddRelayurlByPubkeyStaff from "../../staff/autoAddRelayurlByPubkeyStaff";
import createEoseUnSubStaff from "../../staff/createEoseUnSubStaff";
import createTimeoutUnSubStaff from "../../staff/createTimeoutUnSubStaff";
import { RelayConfiguratorSynchronizer } from "../RelayConfiguratorSynchronizer";
const logger = loggerScope;

export type SyncOption = {
  moreUrls?: Set<string>;
  onlyUrl?: string;
  onEvent?(e: Event, url: string): void;
  onPush?(url: string): void;
  isAutoAddRelayurl?: boolean;
};
export type SynchronizerAbstractOption = {} & SyncOption;
@injectable()
export default abstract class SynchronizerAbstract<E> {
  static list: SynchronizerAbstract<any>[] = [];
  static syncAll() {
    for (const item of SynchronizerAbstract.list) {
      item.sync();
    }
  }

  static clearAll() {
    for (const item of SynchronizerAbstract.list) {
      item.clear();
    }
  }

  private name: string;
  private eventMap: LocalStorageMap<Event>;

  //inject
  @inject(TYPES.RootEventBeltline)
  private line: EventBeltline<any> = rootEventBeltline;
  @inject(TYPES.RelayConfiguratorFactory)
  getRelayConfigurator: () => RelayConfiguratorSynchronizer = () =>
    relayConfigurator;

  constructor(name: string, opts?: SynchronizerAbstractOption) {
    //reactive
    const slef = reactive(this);

    //static
    SynchronizerAbstract.list.push(slef as any);

    //init
    this.name = name;
    this.eventMap = new LocalStorageMap(`__key_list:${name}`);
    slef.init(opts);

    return slef as any;
  }
  async init(opt?: SynchronizerAbstractOption) {
    await this.readEventMap();
    await this.sync(opt);
  }
  getLine() {
    return this.line;
  }

  abstract getFilters(): Promise<Filter[]>;

  /**
   * 将事件序列化为你所需要的数据
   * @param e
   */
  abstract serializeToData(e: Event): Promise<E>;

  /**
   * 将你的数据序列为存储和同步时需要使用的event
   * @param data
   * @param changeAt
   */
  abstract deserializeToEvent(data: E, changeAt: number): Promise<Event>;

  abstract eventToFilter(event: Event): Promise<Filter[]>;
  async createKeyByEvent(event: Event): Promise<string> {
    return await this.createKey(await this.eventToFilter(event));
  }
  abstract createKey(filter: Filter[]): Promise<string>;

  abstract setData(key: string, value: E): Promise<void>;
  abstract getData(key: string): Promise<E | null>;
  abstract getDataKeys(): Promise<Iterable<string>>;

  public async readEventMap() {
    const eventMap = this.eventMap.getMap();

    for (const [cacheKey, event] of eventMap) {
      const v = await this.serializeToData(event);
      const key = this.cacheKeyToKey(cacheKey);
      this.setData(key, v);
    }
  }

  /**
   * 更改本地的event
   * @param event
   */
  public async setLocalEvent(event: Event) {
    const key = await this.createKeyByEvent(event);
    this.setEvent(key, event);
  }
  public getEvent(key: string): Event | null {
    return this.eventMap.get(this.createEventCacheKey(key));
  }
  public setEvent(key: string, event: Event): void {
    this.eventMap.set(this.createEventCacheKey(key), event);
  }
  private createEventCacheKey(key: string) {
    return `${this.name}:${key}`;
  }
  private cacheKeyToKey(cacheKey: string) {
    return cacheKey.slice(this.name.length + 1);
  }
  public async getChangeAtByFilter(filter: Filter[]) {
    const key = await this.createKey(filter);

    return this.getData(key);
  }

  /**
   * 获取最新一次保存的时间
   * @returns
   */
  public getUpdateAt(key: string) {
    const event = this.getEvent(key);
    if (!event) return null;
    return event.created_at;
  }

  /**
   * 当改变数据对象时需要调用
   */
  abstract toChanged(key: string): Promise<void>;

  private async getIsChanged(key: string): Promise<boolean> {
    return !!(await this.getChangeAt(key));
  }

  abstract getChangeAt(key: string): Promise<number | null>;
  abstract changesSaved(key: string): Promise<void>;

  private createEventBeltline() {
    return this.getLine().createChild();
  }

  /**
   * 同步读写列表
   */
  public async sync(opt?: SyncOption) {
    logger.debug(this.name, "sync", opt);
    await timeout(0);
    const isOnly = Boolean(opt?.onlyUrl);

    const localUrls: Set<string> = new Set();
    const urls: Set<string> = opt?.onlyUrl
      ? new Set<string>().add(opt.onlyUrl)
      : setAdds(
          new Set(),
          localUrls,
          this.getRelayConfigurator().getWriteList(),
          this.getRelayConfigurator().getReadList(),
          opt?.moreUrls
        );
    syncInterval(
      `cache:${this.name}:${JSON.stringify(opt)}`,
      async () => {
        let filters = await this.getFilters();
        if (filters.length === 0) return;

        const slef = this;
        const withEvent = new Set();
        const line = this.createEventBeltline()
          .addFilters(filters)
          //执行的事件回调
          .addStaff({
            initialization() {
              //中继不存在某事件的回调
              this.beltline.onAfterReq(({ subId, url }) => {
                this.beltline.getRelayEmiter().once("eose", subId, () => {
                  //中继不存在此事件
                  if (!withEvent.has(url)) {
                    const list = slef.eventMap.getValues();
                    for (const event of list) {
                      slef
                        .createEventBeltline()
                        .createChild()
                        .publish(event, new Set<string>().add(url), {
                          autoPublishToTagR: false,
                        });
                    }

                    opt?.onPush?.(url);
                  }
                });
              });
            }, //具有事件的检测
            push(e, _, { subId, url }) {
              if (!url) return;

              //具有event的事件
              withEvent.add(url);
              opt?.onEvent?.(e, url);
            },
          })
          .addStaff(createEoseUnSubStaff())
          .addStaff(createTimeoutUnSubStaff());

        if (!isOnly) {
          setTimeout(async () => {
            line.addRelayUrls(urls);
            if (urls.size > 0 && !opt?.isAutoAddRelayurl) return;
            const pubkey = await getPubkeyOrNull();
            if (!pubkey) return;
            line.addStaff(autoAddRelayurlByPubkeyStaff(pubkey));
          });
        }

        const oldUrl = new Set<string>();
        //更旧的数据列表
        line.addStaff({
          push: (event, _, { subId }) => {
            // debounceListener(event, subId);

            this.syncByEvent(event, subId, oldUrl, line);
          },
        });

        !opt?.onlyUrl && line.addExtends(rootEventBeltline);

        const events = this.eventMap.getValues();
        for (const event of events) {
          rootEventBeltline.pushEvent(event);
        }
      },
      10_000
    );
  }

  private async syncByEvent(
    e: Event,
    subId: string | undefined,
    oldUrl: Set<string>,
    line: EventBeltline<any>
  ) {
    const url = line.getUrlBySubId(subId ?? "");

    const key = await this.createKeyByEvent(e);
    const updateAt = this.getUpdateAt(key);

    if (!updateAt || e.created_at > updateAt) {
      //远程更新到本地
      //更新本地内存上的数据
      this.setData(key, await this.serializeToData(e));
      //设置本地event
      this.setLocalEvent(e);

      // oldUrl是之前所有请求过的连接，发现远程 更 新，就将event从新发布到其他不是最新的中继上去
      line.publish(e, oldUrl);
    } else if (e.created_at < updateAt && url) {
      //本地更新到远程
      const localEvent = await this.getEvent(key);

      localEvent &&
        line.createChild().publish(localEvent, new Set<string>().add(url), {
          autoPublishToTagR: false,
        });
    }

    //url不存在应该就是本地或存储上下载下来的event，而不是relay,目前没有提供对应的删除更新方法
    if (!url) return;
    oldUrl.add(url);
  }

  /**
   * 保存行为不会比对，直接将数据发布到云端
   */
  public async save(opt?: PublishOpt) {
    const keys = [...(await this.getDataKeys())];

    for (const key of keys) {
      const isChangeed = await this.getIsChanged(key);

      if (!isChangeed) continue;

      const changeAt = await this.getChangeAt(key);
      if (!changeAt) continue;

      const data = await this.getData(key);
      if (!data) continue;

      //生成
      const event = await this.deserializeToEvent(data, changeAt);

      //写入本地存储
      this.setEvent(key, event);

      //设置为已保存了
      await this.changesSaved(key);
      //发布
      await this.publish(event, opt);
    }
  }
  /**
   * 发布事件
   * @param event
   * @param opt
   */
  private async publish(event: Event, opt?: PublishOpt) {
    await this.createEventBeltline().publish(
      event,
      this.getRelayConfigurator().getWriteList(),
      opt
    );
  }

  clear() {
    this.eventMap.clear();
  }
}
