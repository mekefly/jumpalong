import { type RelayConfigurator } from "@/nostr/relayConfigurator";
import { EventEmitter } from "events";
import { Event, Filter } from "nostr-tools";
import {
  arrayRemove,
  getSetIncrement,
  reverseSearchInsertOnObjectList,
  searchInsertOnObjectList,
} from "../utils/utils";
import { createEvent } from "./event";
import { IdGenerator } from "./IdGenerator";
import { type SubOptions } from "./relay";
import { RelayEmiter } from "./RelayEmiter";
import {
  createPreventCircularReferencesStaff,
  FeatType,
  Staff,
  StaffState,
} from "./staff";
import { createFilterStaff } from "./staff/createFilterStaff";

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
  public getRoot() {
    this.root;
  }
  public getExtends() {
    return this.extends;
  }

  public getExtendTo() {
    return this.extendTo;
  }
  public addExtends(line: EventBeltline) {
    this.extends.add(line);
    line.extendTo.add(this);

    for (const event of line.getList()) {
      this.pushEvent(event);
    }
    return this;
  }

  public pushEvent(event: Event, subId?: string) {
    // if (!toFilters(event, this.filters, this.eventList.length)) {
    //   return;
    // }
    for (const staff of this.staffs) {
      staff.beforePush?.(event, this.eventList);
    }

    let state: StaffState = StaffState.NEXT;
    for (const staff of this.staffs) {
      const _state: StaffState =
        staff.push?.(event, this.eventList, { lastState: state, subId }) ??
        StaffState.NEXT;

      state = _state;

      if (_state !== StaffState.NEXT) {
        break;
      }
    }

    for (const staff of this.staffs) {
      state = staff.afterPush?.(event, this.eventList, state) ?? state;
    }
    state === StaffState.NEXT && this.eventList.push(event);

    if (state === StaffState.NEXT || state === StaffState.BREAK) {
      this.extendTo.forEach((child) => {
        child.pushEvent(event, subId);
      });
    }
  }
  public getRelayUrls() {
    return this.urls;
  }
  public addReadUrl() {
    console.debug("addReadUrl", this.relayConfigurator);
    this.relayConfigurator &&
      this.addRelayUrls(this.relayConfigurator.getReadList() as any);

    return this;
  }
  public addRelayUrls(urls?: Set<string>) {
    console.debug(this.name, urls as any);

    if (!urls) return this;
    if (urls.size === 0) return this;
    const incrementUrl = getSetIncrement(this.urls, urls);

    for (const item of incrementUrl) {
      this.urls.add(item);
    }
    // 增加的url和所有的过滤器请求
    this.reqs(incrementUrl, this.filters);
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
  public async publish(eventPart: Partial<Event>, urls: Set<string>) {
    const event = createEvent(eventPart);
    this.pushEvent(event);
    for (const url of urls) {
      this.toPublish(url, event);
    }
  }
  private req(url: string, filters: Filter[]) {
    const subId = this.idGenerator.createId();
    this.onReceiveEvent(subId);

    this.subidMap.set(subId, url);
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

    this.relayEmiter.on("event", subId, ({ event }) => {
      this.pushEvent(event);
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
