import { createEventBeltline } from "@/nostr/createEventBeltline";
import { type EventBeltline } from "@/nostr/eventBeltline";
import { nostrApi, relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import {
  debounce,
  nowSecondTimestamp,
  setAdds,
  syncInterval,
} from "@/utils/utils";
import { Event, Filter } from "nostr-tools";
import createTimeoutUnSubStaff from "./staff/createTimeoutUnSubStaff";

export abstract class ReplaceableEventSyncAbstract<E> {
  private name: string;
  private localEvent: Event | null = null;
  private data!: E;
  private isChange: boolean = false;
  private changeAt: number | null = null;
  private isSync = false;
  private changeCount: number = 0;
  static cacheList: string[] = [];
  static list: ReplaceableEventSyncAbstract<any>[] = [];

  static syncAll() {
    for (const item of ReplaceableEventSyncAbstract.list) {
      item.sync();
    }
  }
  static clearAll() {
    for (const item of ReplaceableEventSyncAbstract.cacheList) {
      localStorage.removeItem(item);
    }
  }

  constructor(name: string, defaul: E) {
    this.name = name;
    ReplaceableEventSyncAbstract.cacheList.push(this.name);
    ReplaceableEventSyncAbstract.list.push(this);

    const event = this.getLocalEvent();
    if (!event) {
      this.data = defaul;
      return;
    }
    this.setDataByEvent(event);
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

  /**
   * 更改本地的event
   * @param e
   */
  public setLocalEvent(e: Event) {
    this.localEvent = e;
    window.localStorage.setItem(this.name, JSON.stringify(e));
  }

  /**
   * 得到event
   * @returns
   */
  public getLocalEvent(): Event | null {
    const e = this.localEvent;
    if (e) return e;

    const str = localStorage.getItem(this.name);
    if (!str) return null;
    try {
      const event = JSON.parse(str);
      return event;
    } catch (error) {
      localStorage.removeItem(this.name);
      return null;
    }
  }

  public getChangeAt() {
    return this.changeAt;
  }

  /**
   * 获取最新一次保存的时间
   * @returns
   */
  public getUpdateAt() {
    return this.getLocalEvent()?.created_at;
  }

  /**
   * 当改变数据对象时需要调用
   */
  public toChanged() {
    this.changeAt = nowSecondTimestamp();
    this.isChange = true;
    return (this.changeCount += 1);
  }
  public hasChange() {
    return this.isChange;
  }
  public isReChange(changeId: number) {
    return this.changeCount !== changeId;
  }

  onSetData: ((data: E) => void) | null = null;
  public setData(data: E) {
    this.data = data;

    this.onSetData?.(data);
  }
  public getData() {
    return this.data;
  }

  /**
   * 如果对象内部需要一些改变，可以使用这种get，你也可以使用toChanged去标记发生了改变，或使用setData()
   * @returns
   */
  public getDataAndChange() {
    this.toChanged();
    return this.data;
  }

  /**
   * 通过event去设置data
   * @param e
   */
  public async setDataByEvent(e: Event) {
    this.setData(await this.serializeToData(e));
  }

  /**
   * 同步读写列表
   */
  public sync(opt?: {
    moreUrls?: Set<string>;
    onlyUrl?: string;
    onEvent?(e: Event, url: string): void;
    onPush?(url: string): void;
  }) {
    this.isSync = true;

    const localUrls: Set<string> = new Set();
    try {
      setAdds(localUrls, new Set(Object.keys(nostrApi.getRelays())));
    } catch (error) {}
    const urls: Set<string> = opt?.onlyUrl
      ? new Set<string>().add(opt.onlyUrl)
      : setAdds(
          new Set(),
          localUrls,
          relayConfigurator.getWriteList(),
          relayConfigurator.getReadList(),
          opt?.moreUrls
        );
    syncInterval(
      `cache:${this.name}:${JSON.stringify(opt)}`,
      async () => {
        let filters;
        try {
          filters = await this.getFilters().catch((e) => {
            throw e;
          });
        } catch (error) {
          return;
        }
        const slef = this;
        const withEvent = new Set();
        const line = createEventBeltline()
          .addFilters(filters)
          .addStaff({
            push(e, _, { subId }) {
              if (!subId) return;
              const url = this.beltline.getUrlBySubId(subId);

              if (!url) return;
              withEvent.add(url);
              opt?.onEvent?.(e, url);
            },
          })
          .addStaff(createLatestEventStaff())
          .addStaff({
            initialization() {
              this.beltline.onAfterReq(({ subId, url }) => {
                this.beltline.getRelayEmiter().once("eose", subId, () => {
                  if (!withEvent.has(url)) {
                    const localEvent = slef.getLocalEvent();
                    localEvent &&
                      line.publish(localEvent, new Set<string>().add(url));
                    opt?.onPush?.(url);
                  }
                });
              });
            },
          })
          .addStaff(createEoseUnSubStaff())
          .addStaff(createTimeoutUnSubStaff());
        setTimeout(() => {
          line.addRelayUrls(urls);
        });

        !opt?.onlyUrl && line.addExtends(rootEventBeltline);
        const localEvent = this.getLocalEvent();

        localEvent && rootEventBeltline.pushEvent(localEvent);

        const oldUrl = new Set<string>();

        //更旧的数据列表
        const debounceListener = debounce((e: Event, subId?: string) => {
          this.syncByEvent(e, subId, oldUrl, line);
        });

        line.feat.onHasLatestEvent(debounceListener);
      },
      10_000
    );
  }
  syncOne() {
    if (this.isSync) {
      return;
    }
    this.sync();
  }
  private syncByEvent(
    e: Event,
    subId: string | undefined,
    oldUrl: Set<string>,
    line: EventBeltline<any>
  ) {
    const url = line.getUrlBySubId(subId ?? "");

    const updateAt = this.getUpdateAt();

    if (!updateAt || e.created_at > updateAt) {
      //远程更新
      //更新本地内存上的
      this.setDataByEvent(e);
      //设置本地event
      this.setLocalEvent(e);

      // oldUrl是之前所有请求过的连接，发现远程 更 新，就将event从新发布到其他不是最新的中继上去
      line.publish(e, oldUrl);
    } else if (e.created_at < updateAt && url) {
      //本地更新
      const localEvent = this.getLocalEvent();
      localEvent && line.publish(localEvent, new Set<string>().add(url));
    }

    //url不存在应该就是本地或存储上下载下来的event，而不是relay,目前没有提供对应的删除更新方法
    if (!url) return;
    oldUrl.add(url);
  }

  /**
   * 保存行为不会比对，直接将数据发布到云端
   */
  public async save() {
    if (!this.isChange) return;

    const state = await this.saveToEvent();
    if (!state) return;

    const event = this.getLocalEvent();
    if (!event) return;

    //发布到写列表
    rootEventBeltline.publish(event, relayConfigurator.getWriteList());

    this.isChange = false;
  }

  private async saveToEvent() {
    if (!this.data) return false;
    const event = await this.deserializeToEvent(
      this.data,
      this.getChangeAt() ?? nowSecondTimestamp()
    );
    this.setLocalEvent(event);
    return true;
  }
}
