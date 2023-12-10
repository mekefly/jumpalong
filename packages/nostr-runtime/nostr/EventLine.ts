import { sn } from "@/utils/staff";
import { reduceSet } from "../utils/set";
import { LineEmitter } from "./LineEmitter";
import { Staff } from "./staff/Staff";
export class EventLineEmitter<Config extends EventLineConfig = {}> {
  constructor(public mod: EventLineFactory<Config>) {
    this.feat = this;
  }

  emitter = new LineEmitter();
  feat: Config["feat"];
  /**
   * 用来修改事件线核心
   * @param f
   * @returns
   */
  modify<C extends EventLineConfig>(
    f: (factory: EventLineFactory<Config>) => EventLineFactory<C>
  ): EventLine<C> {
    return f(this.mod).out();
  }
  /**
   * 在事线上监听
   * @param type
   * @param monitor
   * @param options
   * @returns
   */
  on<TYPE extends keyof Config["emits"]>(
    type: TYPE,
    monitor: Config["emits"] extends EmitType ? Config["emits"][TYPE] : never,
    options?: { once?: boolean }
  ): EventLine<Config> {
    this.emitter[options?.once ? "once" : "on"](type as any, monitor as any);

    return this;
  }

  /**
   * 抛出一个事事件
   * @param type
   * @param parm 参数，当参数为空时可忽略
   * @param options 选项，定义只有一次和返回值回调
   * @returns
   */
  emit<TYPE extends keyof Config["emits"]>(
    type: TYPE,
    ...rest: [
      //第二个参数,如果为数组可以忽略
      ...rest: (
        Config["emits"] extends EmitType
          ? Parameters<Config["emits"][TYPE]>
          : []
      ) extends infer T
        ? T extends []
          ? [parm?: T]
          : [parm: T]
        : never,
      //第三个参数,如果为数组可以忽略
      ...rest: [options?: EmitOptions<Config, TYPE>]
    ]
  ): EventLine<Config> {
    const [parm = [], options = {}] = rest;
    const { returnListener, once } = options as EmitOptions<Config, TYPE>;

    this.emitter[once ? "emit" : "emitOnce"](type as any, ...(parm as any));

    returnListener &&
      this.emitter.returnEmitter.on(type, returnListener as any);
    return this;
  }
  removeListener<TYPE extends keyof Config["emits"]>(
    type: TYPE,
    fn: (...rest: any) => any
  ) {
    this.emitter.removeListen(type, fn);
  }
  removeAllListener<TYPE extends keyof Config["emits"]>(type: TYPE) {
    this.emitter.removeAllListen(type);
  }
  stop<TYPE extends keyof Config["emits"]>(key: TYPE) {
    this.emitter;
  }
}
/**
 * 事件线
 */
export type EventLine<Config extends EventLineConfig = {}> =
  EventLineEmitter<Config> & Config["feat"];
type Feat<Name extends string | symbol | number, Value> = {
  feat: { [key in Name]: Value };
};
type AssignFeat<F extends FeatType> = { feat: F };
export class EventLineFactory<Config extends EventLineConfig = {}> {
  private core: EventLineEmitter;
  public get line() {
    return this.core;
  }
  //这个name列表要做到的是
  private staffNames: Set<any>;
  private staffs: Set<any>;
  constructor(
    staffs: Set<(line: EventLineFactory) => EventLineFactory> = new Set()
  ) {
    this.core = new EventLineEmitter(this);
    this.staffNames = new Set();
    this.staffs = new Set();
    return reduceSet(staffs, (t: any, staff) => t.add(staff), this);
  }
  /**
   * 定义一个事件发射器的类型
   * @param type
   * @param parameter
   * @returns
   */
  defineEmit<T extends string, P extends any[] = [], R = void>(
    type?: T,
    parameter?: P
  ): EventLineFactory<Config & Emit<T, P, R>> {
    return this as any;
  }
  /**
   * 向事件线添加特性
   * @param name 特性名
   * @param value 特性值
   * @returns
   */
  defineFeat<Name extends string | symbol | number, Value>(
    name: Name,
    value: Value
  ): EventLineFactory<Config & Feat<Name, Value>> {
    (this.core.feat as any)[name] = value;
    return this as any;
  }
  /**
   * 批量添加特性
   * @param feat 特性
   * @returns
   */
  assignFeat<T extends FeatType>(
    feat: T & ThisType<EventLine<Config> & T>
  ): EventLineFactory<AssignFeat<T> & Config> {
    Object.assign(this.core as any, feat);
    return this as any;
  }

  /**
   * 添加事件线组装工，插件化的添加特性
   * @param staff
   * @returns
   */
  add<R extends EventLineConfig, L extends EventLineConfig>(
    staff: Staff<Config extends L ? L : Config, R, any[]>
  ): EventLineFactory<R> {
    let id = sn(staff).id;

    //空的name不会记录（匿名特性可以直接添加，但不会重复添加），所以可以直接这样判断
    if (this.staffNames.has(id) || this.staffs.has(staff)) {
      return this as any;
    }

    let self = staff(this as any) as any;

    //空的name不会添加
    id && this.staffNames.add(id);
    this.staffs.add(staff);

    if (staff.dependents) {
      for (const dependent of staff.dependents) {
        this.add(dependent);
      }
    }

    return self;
  }
  /**
   * 事件线复用
   * @returns x
   */
  reuse(): EventLine<Config> {
    return this.core as any;
  }
  /**
   * 创建一个新的事件线
   * @returns
   */
  createAsATemplate(): EventLine<Config> {
    return new EventLineFactory(this.staffs).out() as any;
  }
  /**
   * 返回到已构造的事件线
   * @returns
   */
  out(): EventLine<Config> {
    return this.reuse();
  }
}
/**
 * 事件线的配置类型
 */
export type EventLineConfig<
  Emit extends EmitType = EmitType,
  Feat extends FeatType = FeatType
> = {
  emits?: Emit;
  feat?: Feat;
};
/**
 * 一个emit配置
 */
type Emit<T extends string | symbol, P extends any[], R = void> = {
  emits: { [key in T]: (...rest: P) => R };
};

type EmitType = Record<string | symbol, (...rest: any) => any>;
type FeatType = Record<any, any>;

/**
 * emit的选项
 */
type EmitOptions<
  Config extends EventLineConfig,
  TYPE extends keyof Config["emits"]
> = {
  once?: boolean;
  returnListener?: (
    returnValue: Config["emits"] extends EmitType
      ? ReturnType<Config["emits"][TYPE]>
      : []
  ) => void;
};
