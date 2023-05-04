import { type Logger } from "@/logger/Logger";
import { type RelayConfiguratorSynchronizer } from "@/nostr/Synchronizer/RelayConfiguratorSynchronizer";
import { type RelayEmiterResponseEventMap } from "@/nostr/relayEmiter";
import { callLogger } from "@/utils/decorator";
import { getPubkeyOrNull } from "@/utils/nostrApiUse";
import { throwNotFoundError } from "@/utils/throw";
import { EventEmitter } from "events";
import { inject, injectable, optional, type Container } from "inversify";
import { verifySignature, type Event, type Filter } from "nostr-tools";
import {
  arrayRemove,
  getSetIncrement,
  reverseSearchInsertOnObjectList,
  searchInsertOnObjectList,
  setAdds,
} from "../utils/utils";
import { IdGenerator } from "./IdGenerator";
import { type RelayEmiter } from "./RelayEmiter";
import { createEvent } from "./event";
import { TYPES } from "./nostr";
import { StaffState, type FeatType, type Staff } from "./staff";
import { createFilterStaff } from "./staff/createFilterStaff";
import createPushStaff from "./staff/createPushStaff";
import { deserializeTagR } from "./tag";

const logger = loggerScope;

@injectable()
class EventBeltlineSetSlef {
  constructor(slef: any) {
    (slef as any).__proto__ = (this as any).__proto__;
    return slef;
  }
}

let id = 0;

@injectable()
export class EventBeltline<
  FEAT extends object = {}
> extends EventBeltlineSetSlef {
  static isEventBeltlin(o: unknown): o is EventBeltline {
    return (
      typeof o === "object" &&
      (o instanceof EventBeltline || Boolean((o as any).__EventBeltline__))
    );
  }
  static logger: Logger = logger;

  public logger: Logger = logger;

  // flag
  public __EventBeltline__: true = true;

  // describe
  public id = id++;
  public name = String(id);

  // plugin
  private staffs: (Staff<any> & { beltline: EventBeltline<FEAT> })[] = [];
  public feat: FeatType<FEAT>;

  // data
  private subidMap: Map<string, string> = new Map();
  private options: EventBeltlineOptions;
  private urls = new Set<string>();
  private filters: Filter[] = [];
  private eventList: Event[] = [];

  // relation
  private parent: EventBeltline | null = null;
  private children: Set<EventBeltline> = new Set();
  private extends: Set<EventBeltline> = new Set();
  private extendTo: Set<EventBeltline> = new Set();
  private root: EventBeltline;

  // inject
  private idGenerator: IdGenerator;
  private relayEmiter: RelayEmiter;
  private relayConfiguratorFactory: () => RelayConfiguratorSynchronizer;
  private nostrContainer: Container;

  // event
  private eventEmitter = new EventEmitter().setMaxListeners(200);

  constructor(
    @inject(Symbol.for("EventBeltline:options"))
    @optional()
    options?: EventBeltlineOptions,

    //inject
    @inject(TYPES.NostrContainer)
    nostrContainer?: Container,
    @inject(TYPES.IdGenerator)
    idGenerator?: IdGenerator,
    @inject(TYPES.RelayEmiter)
    relayEmiter?: RelayEmiter,
    @inject(TYPES.RelayConfiguratorFactory)
    relayConfiguratorFactory?: () => RelayConfiguratorSynchronizer
  ) {
    //注入self，比如reactive，然后让整个功能都可响应运转
    //reactive
    super(options?.slef ?? {});
    logger.info("nostrContainer", nostrContainer);

    // inject
    this.idGenerator = options?.idGenerator ?? idGenerator ?? new IdGenerator();
    this.relayEmiter =
      options?.relayEmiter ??
      relayEmiter! ??
      throwNotFoundError("relayEmiter", logger);
    this.relayConfiguratorFactory =
      options?.relayConfiguratorFactory ??
      relayConfiguratorFactory! ??
      throwNotFoundError("getRelayConfigurator", logger);
    this.nostrContainer =
      options?.nostrContainer ??
      nostrContainer ??
      throwNotFoundError("nostrContainer", logger);

    //init
    this.options = options ?? {};
    if (options) {
      options.name && (this.name = options.name);
      options.describe && (this.name = options?.describe);
    }
    this.root = options?.root ?? this;
    this.parent = options?.parent ?? null;

    //init feat
    this.feat = {
      beltline: this,
    } as any;

    //filter
    this.addFiltersStaff(this.filters, { unshift: true });

    //push
    this.addStaff(createPushStaff());
  }
  //inject get
  public getNostrContainer(): Container {
    return this.nostrContainer;
  }
  public getRelayEmiter() {
    return this.relayEmiter;
  }
  public getRelayConfigurator() {
    return this.relayConfiguratorFactory();
  }

  // value get
  public getRoot() {
    this.root;
  }
  public getExtends() {
    return this.extends;
  }

  public getExtendTo() {
    return this.extendTo;
  }
  public addExtends(
    line: EventBeltline,
    opt?: {
      preventPushHistory?: boolean;
    }
  ) {
    this.extends.add(line);
    line.extendTo.add(this);

    if (opt?.preventPushHistory) return this;
    for (const event of line.getList()) {
      this.pushEvent(event);
    }
    return this;
  }

  public pushEvent(
    event: Event,
    opt?: { subId?: string; url?: string },
    set: Set<any> = new Set()
  ) {
    //防循环事件
    if (set.has(this)) return;
    set.add(this);

    const { subId, url } = opt ?? {};

    //前置处理
    for (const staff of this.staffs) {
      staff.beforePush?.(event, this.eventList);
    }

    let state: StaffState = StaffState.NEXT;
    //push处理
    for (const staff of this.staffs) {
      const _state: StaffState =
        staff.push?.(event, this.eventList, { lastState: state, subId, url }) ??
        StaffState.NEXT;

      state = _state;

      if (_state !== StaffState.NEXT) {
        break;
      }
    }

    // 后置处理
    for (const staff of this.staffs) {
      state = staff.afterPush?.(event, this.eventList, state) ?? state;
    }
    state === StaffState.NEXT &&
      this.feat.pushEvent(event, this.eventList, {
        lastState: state,
        subId,
        url,
      });

    // 继承
    if (state === StaffState.NEXT) {
      this.extendTo.forEach((child) => {
        child.pushEvent(event, opt, set);
      });
    }
  }
  public getRelayUrls() {
    return this.urls;
  }
  public addReadUrl() {
    this.relayConfiguratorFactory &&
      this.addRelayUrls(this.relayConfiguratorFactory().getReadList() as any);

    return this;
  }
  public addRelayUrl(url: string) {
    this.addRelayUrls(new Set<string>().add(url));
    return this;
  }
  public addRelayUrls(urls?: Set<string>) {
    if (!urls) return this;
    if (urls.size === 0) return this;
    const incrementUrl = getSetIncrement(this.urls, urls);

    for (const item of incrementUrl) {
      this.urls.add(item);
    }
    // 增加的url和所有的过滤器请求
    this.reqs(incrementUrl, this.filters);

    this.eventEmitter.emit("add-relay-urls", incrementUrl, urls);

    return this;
  }
  public onAddRelayUrlsAfter(
    listener: (incrementUrl: Set<string>, urls: Set<string>) => void
  ) {
    this.eventEmitter.on("add-relay-urls", listener);
    return this;
  }
  public getFilters() {
    return this.filters;
  }
  public addFilter(filter: OriginFilter) {
    this.addFilters([filter]);
    return this;
  }
  public addFilters(filters: Filter[]) {
    this.filters.push(...filters);
    //请求所有urls和增加的过滤器
    this.reqs(this.urls, filters);
    this.eventEmitter.emit("add-filters", filters);
    return this;
  }
  public onAddFilters(l: (filters: Filter[]) => void) {
    this.eventEmitter.on("add-filters", l);
    return this;
  }
  public removeStaff(staff: Staff) {
    arrayRemove(this.staffs, staff);
  }
  public addStaff<STAFF extends Staff<FEAT>>(
    staff: STAFF,
    opt?: AddStaffOpt
  ): EventBeltline<FEAT & STAFF["feat"]> {
    this.initializationStaff(staff);

    if (opt?.unshift) {
      this.staffs.unshift(staff as any);
    } else {
      this.staffs.push(staff as any);
    }

    return this as any;
  }
  private initializationStaff(staff: Staff<any>) {
    staff.feat && Object.assign(this.feat, staff.feat);

    (staff as any)["beltline"] = this as any;
    (staff as any).initialization?.();
  }
  public addFilterStaff(filter: Filter, opt?: AddStaffOpt) {
    this.addFiltersStaff([filter], opt);
    return this;
  }
  public addFiltersStaff(filters: Filter[], opt?: AddStaffOpt) {
    const staff: Staff = createFilterStaff(filters);
    this.addStaff(staff, opt);
    return this;
  }
  public setParent(line: EventBeltline) {
    this.parent = line;
    return this;
  }
  public addChild(line: EventBeltline) {
    this.children.add(line);
    return this;
  }
  @callLogger()
  public createChild(
    opt?: EventBeltlineOptions & {
      addExtendsFromParent?: boolean;
      addExtendsFormRoot?: boolean;
    }
  ) {
    const childLine = new EventBeltline(
      Object.assign(
        {},
        {
          //inject
          relayEmiter: this.relayEmiter,
          idGenerator: this.idGenerator,
          relayConfiguratorFactory: this.relayConfiguratorFactory,
          nostrContainer: this.nostrContainer,
          //value
          root: this.root,
          parent: this,
          slef: {},
        },
        opt
      ) as any
    );

    this.addChild(childLine);

    //等待准备好了之后再准备继承数据

    return childLine;
  }
  /**
   * close Req
   */
  public closeReq() {
    for (const staff of this.staffs) {
      staff.onClose?.();
    }
    for (const child of this.children) {
      child.closeReq();
    }
    for (const [subid, url] of this.subidMap) {
      this._closeReq(subid, url);
    }
    this.eventEmitter.removeAllListeners();
  }
  private _closeReq(subId: string, url: string) {
    this.relayEmiter.emitRequest("closeReq", { subId, url });
  }
  public closeReqBySubid(subid?: string) {
    if (!subid) return;
    const url = this.subidMap.get(subid);
    if (!url) return;
    this._closeReq(subid, url);
  }

  /**
   * 停止生产线，阻止任何请求，可能代表需要的工作已经完成，不在需要向服务器请求任何数据
   */
  public offLine() {}
  public map<U>(
    callbackfn: (value: Event, index: number, array: Event[]) => U
  ): U[] {
    return this.eventList.map(callbackfn);
  }

  public getList() {
    return this.eventList;
  }
  /**
   * 正序插入
   * @returns
   */
  public addStaffOfSortByCreateAt() {
    this.addStaff({
      initialization() {
        this.beltline.feat.pushEvent = function (event, eventList) {
          const searchInsert = searchInsertOnObjectList(
            eventList,
            event.created_at,
            "created_at"
          );
          eventList.splice(searchInsert, 0, event);
        };
      },
    });
    return this;
  }
  /**
   * 反序插入
   * @returns
   */
  public addStaffOfReverseSortByCreateAt() {
    this.addStaff({
      initialization() {
        this.beltline.feat.pushEvent = function (event, eventList) {
          const searchInsert = reverseSearchInsertOnObjectList(
            eventList,
            event.created_at,
            "created_at"
          );
          eventList.splice(searchInsert, 0, event);
        };
      },
    });
    return this;
  }

  private reqs(urls: Set<string>, filters: Filter[]) {
    if (filters.length === 0) return;
    urls?.forEach(async (url) => {
      try {
        this.req(url, filters);
      } catch (error) {
        logger.error(error);
      }
    });
  }
  public async publish(
    eventPart: Partial<Event> & { kind?: number },
    urls: Set<string>,
    opt?: PublishOpt
  ) {
    const publishToUrls = new Set(urls);

    //签名是否正确的标志
    let isReSig = false;

    //验证签名
    try {
      //签名错误从新签名
      !verifySignature(eventPart as Event) && (isReSig = true);
    } catch (error) {
      //签名检查报错，代表签名错误
      isReSig = true;
    }

    //如果没有签名，自动添加一些内容
    if (isReSig || opt?.addUrl) {
      //从新签名
      isReSig = true;

      const tags = eventPart.tags ?? [];
      const relays = deserializeTagR(tags);

      for (const url of publishToUrls) {
        // 防止添加重复url
        if (relays.has(url)) continue;
        tags.push(["r", url]);
      }
      //将此event发布到回复者的url上去
      setAdds(publishToUrls, relays);

      eventPart.tags = tags;
    }

    let event = eventPart as Event;
    if (isReSig) {
      //如果公钥存在，并且不是自己的话，认为是非法信息不发布
      if (eventPart.pubkey && eventPart.pubkey !== (await getPubkeyOrNull()))
        return;

      //不完整但是自己发送的，就从新签名
      event = await createEvent(eventPart);
    }

    // push到本地
    this.pushEvent(event);

    //设置监听
    opt?.onOK && this.relayEmiter.on("ok", event.id, opt.onOK);

    const publishedUrls = new Set<string>();

    // pushEvent
    for (const url of opt?.autoPublishToTagR ?? true ? publishToUrls : urls) {
      this.toPublish(url, event);
      publishedUrls.add(url);
    }
    for (const url of this.getRelayUrls()) {
      if (publishedUrls.has(url)) {
        continue;
      }
      this.toPublish(url, event);
    }
    this.onAddRelayUrlsAfter((urls) => {
      for (const url of urls) {
        if (publishedUrls.has(url)) {
          continue;
        }
        this.toPublish(url, event);
      }
    });

    return event;
  }

  public req(url: string, filters: Filter[]) {
    const subId = this.idGenerator.createId();

    this.onReceiveEvent(subId);

    this.setSubidMap(subId, url);

    this.relayEmiter.emitRequest("req", {
      subId,
      url,
      filters,
    });
  }
  /**
   *
   * @param subId
   * @param set
   * @returns
   */
  onReceiveEvent(subId: string, set = new WeakSet()) {
    //防止循环引用
    if (set.has(this)) return;
    set.add(this);

    // 监听
    this.relayEmiter.on("event", subId, ({ event, url }) => {
      this.pushEvent(event, { subId, url });
    });

    // for (const line of this.extendTo) {
    //   line.onReceiveEvent(subId, set);
    // }
  }

  private async toPublish(url: string, event: Event) {
    this.relayEmiter.emitRequest("publish", {
      event,
      url,
    });
  }
  public setSubidMap(subId: string, url: string) {
    this.subidMap.set(subId, url);
    this.eventEmitter.emit("afterReq", { subId, url });
  }
  public onAfterReq(listener: (v: { subId: string; url: string }) => void) {
    this.eventEmitter.on("afterReq", listener);
    return this;
  }
  public getUrlBySubId(subId: string) {
    return this.subidMap.get(subId);
  }
}

type OriginFilter = Filter;
export type EventBeltlineOptions = {
  name?: string;
  preventCircularReferences?: boolean;
  slef?: object;
  describe?: string;
  relayEmiter?: RelayEmiter;
  root?: EventBeltline;
  parent?: EventBeltline;
  relayConfiguratorFactory?: () => RelayConfiguratorSynchronizer;
  idGenerator?: IdGenerator;
  nostrContainer?: Container;
};

export type AddStaffOpt = {
  unshift: boolean;
};
export type PublishOpt = {
  onOK?: (v: RelayEmiterResponseEventMap["ok"]) => void;
  addUrl?: boolean;
  autoPublishToTagR?: boolean;
};
