import { type Logger } from "@/logger/Logger";
import { type RelayEmiterResponseEventMap } from "@/nostr/relayEmiter";
import { callLogger } from "@/utils/decorator";
import { getPubkeyOrNull } from "@/utils/nostrApi";
import { throwNotFoundError } from "@/utils/throw";
import { EventEmitter } from "events";
import { inject, injectable, optional, type Container } from "inversify";
import { verifySignature, type Event, type Filter } from "nostr-tools";
import { arrayRemove, getSetIncrement, setAdds } from "../utils/utils";
import { createEvent } from "./event";
import { type IdGenerator } from "./IdGenerator";
import { TYPES } from "./nostr";
import { type RelayEmiter } from "./RelayEmiter";
import {
  AfterPush,
  BeforePush,
  PushContext,
  PushFilter,
  StateContext,
  type FeatType,
  type Staff,
} from "./staff";
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
export class EventBeltline<FEAT extends {} = {}> extends EventBeltlineSetSlef {
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
  private beforePushs: BeforePush<this>[] = [];
  public pushFilters: PushFilter<this>[] = [];
  private afterPushs: AfterPush<this>[] = [];

  private staffs: Staff[] = [];
  public feat: FeatType<FEAT>;

  // data
  private subidMap: Map<string, string> = new Map();
  private urls = new Set<string>();

  // relation
  private children: Set<EventBeltline> = new Set();
  private extends: Set<EventBeltline> = new Set();
  private extendTo: Set<EventBeltline> = new Set();
  private root: EventBeltline;

  // inject
  private idGenerator: IdGenerator;
  private relayEmiter: RelayEmiter;
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
    relayEmiter?: RelayEmiter
  ) {
    //注入self，比如reactive，然后让整个功能都可响应运转
    //reactive
    super(options?.slef ?? {});
    logger.info("nostrContainer", nostrContainer);

    // inject
    this.idGenerator =
      options?.idGenerator ??
      idGenerator ??
      throwNotFoundError("idGenerator", logger);
    this.relayEmiter =
      options?.relayEmiter ??
      relayEmiter! ??
      throwNotFoundError("relayEmiter", logger);
    this.nostrContainer =
      options?.nostrContainer ??
      nostrContainer ??
      throwNotFoundError("nostrContainer", logger);

    //init
    if (options) {
      options.name && (this.name = options.name);
      options.describe && (this.name = options?.describe);
    }
    this.root = options?.root ?? (this as any);

    //init feat
    this.feat = {
      beltline: this,
      on: this.on.bind(this as any),
      emit: this.emit.bind(this),
    } as any;
  }

  // plugin
  /**
   * 删除员工
   * @param staff
   */
  public removeStaff(staff: Staff<any, any>) {
    arrayRemove(this.staffs, staff);
  }
  /**
   * 增加员工(增加功能或特性或插件)
   * @param staff
   * @param opt
   * @returns
   */
  public addStaff<STAFF extends Staff<this, any>>(
    staff: STAFF,
    opt?: AddStaffOpt
  ): ReturnType<STAFF> extends void ? this : ReturnType<STAFF> {
    if (opt?.unshift) {
      this.staffs.unshift(staff as any);
    } else {
      this.staffs.push(staff as any);
    }

    return staff(this) ?? (this as any);
  }

  // add api
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

    this.emit("add-relay-urls", incrementUrl, urls);
    this.emit("afterReq");

    return this;
  }
  public addExtends(
    line: EventBeltline,
    opt?: {
      preventPushHistory?: boolean;
    }
  ) {
    this.extends.add(line);
    line.extendTo.add(this as any);
    this.emit("addExtends", this, line, opt);
    return this;
  }

  // listen
  public on: (<TYPE extends keyof EventMap<this>>(
    type: TYPE,
    listener: (...arge: EventMap<this>[TYPE]) => void
  ) => this) &
    (FEAT extends { on: (...rest: any[]) => void } ? FEAT["on"] : {}) = ((
    type: any,
    listener: any
  ) => {
    this.eventEmitter.on(type, listener);
  }) as any;

  public emit: (<TYPE extends keyof EventMap<this>>(
    type: TYPE,
    ...arge: EventMap<this>[TYPE]
  ) => this) &
    (FEAT extends { emit: (...rest: any[]) => void } ? FEAT["emit"] : never) =
    ((type: any, ...rest: any) => {
      this.eventEmitter.emit(type as any, ...rest);
    }) as any;

  private _on<TYPE extends keyof EventMap<this>>(
    type: TYPE,
    listener: (...arge: EventMap<this>[TYPE]) => void
  ): this {
    this._on(type, listener);
    return this;
  }
  private _emit<TYPE extends keyof EventMap<this>>(
    type: TYPE,
    ...arge: EventMap<this>[TYPE]
  ): this {
    return this.emit(type, ...arge);
  }

  //inject get
  public getNostrContainer(): Container {
    return this.nostrContainer;
  }
  public getRelayEmiter() {
    return this.relayEmiter;
  }

  // value get set
  public getRelayUrls() {
    return this.urls;
  }
  public getRoot() {
    return this.root;
  }
  public getExtends() {
    return this.extends;
  }

  public getExtendTo() {
    return this.extendTo;
  }
  public addPushFilter(push: PushFilter<this>) {
    this.pushFilters.push(push);
    return this;
  }

  // core
  /**
   * 顺序是
   * parent beforePush
   * parent pushFilter
   * child  beforePush
   * child  pushFilter
   * child  afterPush
   * parent afterPush
   *
   * @param event
   * @param opt
   * @param set
   * @returns
   */
  public pushEvent(
    event: Event,
    opt: PushContext = {},
    set: Set<any> = new Set()
  ) {
    // 防循环事件
    if (set.has(this)) return;
    set.add(this);

    // 前置处理
    this.emit("buforePush", this, event, opt);

    // 过滤器
    let state: boolean = this.pushFilters.every(
      (pf) => pf(this, event, opt) ?? true
    );

    // 继承
    if (state) {
      //push
      this.extendTo.forEach((child) => {
        child.pushEvent(event, opt, set);
      });
    }

    // 后置处理
    this.emit("afterPush", this, event, { ...opt, state });
  }
  /**
   * 增加特性
   * @param feat
   * @returns
   */
  public assignFeat<FEAT1 extends object>(
    feat: FEAT1 & ThisType<FeatType<FEAT1 & FEAT>>
  ): EventBeltline<FEAT & FEAT1> {
    Object.assign(this.feat, feat);
    return this as any;
  }
  public defineEmit<TYPE extends string, REST extends any[]>(): DefineEmit<
    FEAT,
    TYPE,
    REST
  > {
    return this as any;
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
          nostrContainer: this.nostrContainer,
          //value
          root: this.root,
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
    this.emit("close");
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

  public reqs(urls: Set<string>, filters: Filter[]) {
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
    this.on("add-relay-urls", (urls) => {
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
    this.emit("afterReq", { subId, url });
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

export interface EventMap<LINE extends EventBeltline<any>> {
  afterReq: [context: { subId: string; url: string }];
  ["add-relay-urls"]: [incrementUrl: Set<string>, urls: Set<string>];
  ["close"]: [];
  afterPush: [line: LINE, event: Event, context: PushContext & StateContext];
  buforePush: [line: LINE, event: Event, context: PushContext];
  addExtends: [
    thisLine: LINE,
    line: EventBeltline,
    opt: {
      preventPushHistory?: boolean;
    }
  ];
}

export type EventMapType = {
  [key: string | symbol]: any[];
};
type ToArray<T> = T extends any[] ? T : [];
type DefineEmit<
  FEAT extends {},
  TYPE extends string | symbol,
  REST extends any[]
> = EventBeltline<
  FEAT & {
    on(
      type: TYPE,
      listener: (...rest: REST) => void
    ): DefineEmit<FEAT, TYPE, REST>;
    emit(type: TYPE, ...rest: REST): DefineEmit<FEAT, TYPE, REST>;
  }
>;
