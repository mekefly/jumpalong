import { type RelayConfigurator } from "@/nostr/relayConfigurator";
import { type RelayEmiterResponseEventMap } from "@/nostr/relayEmiter";
import { EventEmitter } from "events";
import { Event, Filter, verifySignature } from "nostr-tools";
import {
  arrayRemove,
  getSetIncrement,
  reverseSearchInsertOnObjectList,
  searchInsertOnObjectList,
  setAdds,
} from "../utils/utils";
import { createEvent } from "./event";
import { IdGenerator } from "./IdGenerator";
import { type SubOptions } from "./relay";
import { RelayEmiter } from "./RelayEmiter";
import {
  createPreventCircularReferencesStaff,
  StaffState,
  type FeatType,
  type Staff,
} from "./staff";
import { createFilterStaff } from "./staff/createFilterStaff";
import { deserializeTagR } from "./tag";
import { userKey } from "./user";

const EventBeltlineSetSlef: new (slef: any) => {} = function (
  this: any,
  slef: any
) {
  (slef as any).__proto__ = this.__proto__;
  return slef;
} as any;

let id = 0;
export class EventBeltline<
  FEAT extends object = {}
> extends EventBeltlineSetSlef {
  relayConfigurator: RelayConfigurator | undefined;
  static isEventBeltlin(o: unknown): o is EventBeltline {
    return typeof o === "object" && Boolean((o as any).__EventBeltline__);
  }
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

  // event
  private eventEmitter = new EventEmitter().setMaxListeners(200);

  constructor(options?: EventBeltlineOptions) {
    //注入self，比如reactive，然后让整个功能都可响应运转
    super(options?.slef ?? {});
    this.options = options ?? {};
    options?.name && (this.name = options.name);
    this.feat = {
      beltline: this,
    } as any;
    options?.describe && (this.name = options?.describe);

    this.relayEmiter = options?.relayEmiter ?? new RelayEmiter();
    this.root = options?.root ?? this;
    this.parent = options?.parent ?? null;
    this.relayConfigurator = options?.relayConfigurator;
    this.idGenerator = options?.idGenerator ?? new IdGenerator();

    options?.preventCircularReferences && this.addPreventCircularReferences();

    this.addFiltersStaff(this.filters, { unshift: true });

    for (const staff of this.staffs) {
      staff?.initialization?.();
    }
  }
  public getRelayEmiter() {
    return this.relayEmiter;
  }
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
    state === StaffState.NEXT && this.eventList.push(event);

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
    this.relayConfigurator &&
      this.addRelayUrls(this.relayConfigurator.getReadList() as any);

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
          relayEmiter: this.relayEmiter,
          idGenerator: this.idGenerator,
          relayConfigurator: this.relayConfigurator,
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

  public addStaffOfSortByCreateAt() {
    this.addStaff({
      push: (event, eventList) => {
        const searchInsert = searchInsertOnObjectList(
          this.eventList,
          event.created_at,
          "created_at"
        );

        eventList.splice(searchInsert, 0, event);
        return StaffState.BREAK;
      },
    });
    return this;
  }
  public addStaffOfReverseSortByCreateAt() {
    this.addStaff({
      push: (event, eventList) => {
        const searchInsert = reverseSearchInsertOnObjectList(
          this.eventList,
          event.created_at,
          "created_at"
        );

        eventList.splice(searchInsert, 0, event);
        return StaffState.BREAK;
      },
    });
    return this;
  }
  private addPreventCircularReferences() {
    this.addStaff(createPreventCircularReferencesStaff());
  }

  private reqs(urls: Set<string>, filters: Filter[]) {
    if (filters.length === 0) return;
    urls?.forEach(async (url) => {
      try {
        this.req(url, filters);
      } catch (error) {}
    });
  }
  public publish(
    eventPart: Partial<Event>,
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
      if (eventPart.pubkey && eventPart.pubkey !== userKey.value.publicKey)
        return;

      //不完整但是自己发送的，就从新签名
      event = createEvent(eventPart);
    }

    // push到本地
    this.pushEvent(event);

    //设置监听
    opt?.onOK && this.relayEmiter.on("ok", event.id, opt.onOK);

    // pushEvent
    for (const url of publishToUrls) {
      this.toPublish(url, event);
    }
    return event;
  }

  private req(url: string, filters: Filter[]) {
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
    this.relayEmiter.once("eose", subId, () => {
      this.relayEmiter.removeAllListener(subId);
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
  sub?: (filters: Filter[], subOptions: SubOptions) => void;
  slef?: object;
  describe?: string;
  relayEmiter?: RelayEmiter;
  root?: EventBeltline;
  parent?: EventBeltline;
  relayConfigurator?: RelayConfigurator;
  idGenerator?: IdGenerator;
};
// & SubOptions;

export type AddStaffOpt = {
  unshift: boolean;
};
export type PublishOpt = {
  onOK?: (v: RelayEmiterResponseEventMap["ok"]) => void;
  addUrl?: boolean;
};
