import { capitalize, reduceSet } from '@jumpalong/shared'
import {
  AssignChain,
  AssignFeat,
  ClassStaff,
  CreateChildHookStaff,
  CreateChildOptions,
  CreateHookStaff,
  Emit,
  EmitType,
  EventLineConfig,
  EventLineOptions,
  Feat,
  FunctionStaff,
  MergeStaffConfig,
  PauseStaff,
  StaffFlag,
  StaffType,
} from '.'
import { EmitOptions, LineEmitter, listenerFlags } from './LineEmitter'

// type ChainType<Config extends EventLineConfig = {}> = {
//   [key in keyof EventLine<Config>]: EventLine<Config>[key] extends (
//     ...rest: any
//   ) => any
//     ? (...rest: Parameters<EventLine<Config>[key]>) => ChainType<Config>
//     : never
// } & {
//   line: EventLine<Config>
// }

/**
 * 事件线
 */
export type EventLine<Config extends EventLineConfig = {}> =
  EventLineImpl<Config> & EventLineChain<Config>
type EventLineChain<Config extends EventLineConfig = {}> = Config['feat'] & {
  [KEY in keyof Config['chain']]: (
    ...rest: Config['chain'][KEY] extends infer PS
      ? PS extends (...rest: any[]) => void
        ? Parameters<PS>
        : never
      : never
  ) => EventLine<Config>
}

/**
 * 事件线实现类
 */
export class EventLineImpl<Config extends EventLineConfig = {}> {
  parent: EventLine<Config> | null = null
  public mod: EventLineMod<Config>
  emitter
  constructor(mod: EventLineMod<Config>, options?: EventLineOptions) {
    this.mod = mod
    this.emitter = new LineEmitter(options)
    this.feat = this
    ;(this as any)['line'] = this //暂停监听
    setTimeout(() => {
      ;(this.add(PauseStaff) as any).on('pause', (target: any) => {
        this.emitter.parse()
        target.on('continue', () => {
          this.emitter.continue()
        })
      })
    })
  }

  feat: Config['feat']

  /**
   * 用来修改事件线核心
   * @param f
   * @returns
   */
  modify<C extends EventLineConfig>(
    f: (factory: EventLineMod<Config>) => EventLineMod<C>
  ): EventLine<C> {
    return f(this.mod).out()
  }

  getName() {
    return this.mod.getName()
  }
  on<TYPE extends keyof Config['emits']>(
    type: TYPE,
    monitor: Config['emits'] extends EmitType ? Config['emits'][TYPE] : never,
    options?: listenerFlags
  ): EventLine<Config>

  on<TYPE extends keyof Config['emits']>(
    type: 'emit',
    listener: (type: string, ...rest: any[]) => void,
    flags?: listenerFlags
  ): EventLine<Config>
  /**
   * 在事线上监听
   * @param type
   * @param monitor
   * @param options
   * @returns
   */
  on<TYPE extends keyof Config['emits']>(
    type: TYPE,
    listener: Config['emits'] extends EmitType ? Config['emits'][TYPE] : never,
    flags?: listenerFlags
  ): EventLine<Config> {
    this.emitter.on(type, listener, flags)
    return this as any
  }

  once<TYPE extends keyof Config['emits']>(
    type: TYPE,
    listener: Config['emits'] extends EmitType ? Config['emits'][TYPE] : never,
    options?: listenerFlags
  ): EventLine<Config> {
    this.emitter.once(type, listener, options)
    return this as any
  }
  emit<TYPE extends keyof Config['emits']>(
    type:
      | TYPE
      | EmitOptions<
          TYPE,
          Config['emits'] extends EmitType
            ? ReturnType<Config['emits'][TYPE]>
            : undefined
        >,
    ...rest: Config['emits'] extends EmitType
      ? Parameters<Config['emits'][TYPE]>
      : []
  ) {
    this.emitter.emit(type as any, ...(rest as any))
    this.emitter.emit('emit', type, ...(rest as any))
    return this
  }
  createChild(options?: CreateChildOptions) {
    return this.mod.createChild(options).out()
  }
  extendsEmit(line: EventLine<any>, keys?: string[]) {
    //extends all
    if (!keys) {
      line.on('emit', (type: any, ...rest: any[]) => {
        ;(this as any).emit(type as any, ...rest)
      })
      return this
    }
    //extends
    for (const key of keys) {
      line.on(key, (...rest: any[]) => {
        ;(this as any).emit(key as any, ...rest)
      })
    }
    return this
  }

  removeListener<TYPE extends keyof Config['emits']>(
    type: TYPE,
    fn: (...rest: any) => any
  ) {
    this.emitter.removeListen(type, fn)
  }
  removeAllListener<TYPE extends keyof Config['emits']>(type: TYPE) {
    this.emitter.removeAllListen(type)
  }

  /**
   * 添加事件线组装工，插件化的添加特性
   * @param staff
   * @returns
   */
  add<ArrayFlag extends StaffFlag[] = []>(
    ...staffs: ArrayFlag
  ): EventLine<MergeStaffConfig<ArrayFlag> & Config>

  /**
   * 添加事件线组装工，插件化的添加特性
   * @param staff
   * @returns
   */
  add<C extends ClassStaff<Name>, Name extends string>(
    staff: C
  ): EventLine<Feat<InstanceType<C>['name'], InstanceType<C>> & Config>

  /**
   * 添加事件线组装工，插件化的添加特性
   * @param staff
   * @returns
   */
  add<_Config extends EventLineConfig>(
    staff: StaffType<{}, [], _Config>
  ): EventLine<Config & _Config>
  add(...rest: any[]): any {
    return this.mod.add(...(rest as [any])).out()
  }
}

let id = 0
export class EventLineMod<Config extends EventLineConfig = {}> {
  public id = id++
  private core: EventLine

  private parent: EventLineMod<Config> | null = null
  public get line(): EventLine<Config> {
    return this.core as any
  }
  public get mod(): typeof this {
    return this
  }
  //这个name列表要做到的是
  private staffNames: Set<any> = new Set()
  private staffs: Set<any> = new Set()
  constructor(
    options?: {
      staffs?: Set<StaffFlag>
      parent?: EventLineMod<Config>
    } & EventLineOptions
  ) {
    options?.name && this.setName(options.name)

    this.core = new EventLineImpl(this, options) as any

    //继承父线
    if (options?.parent) {
      let parent = options.parent

      console.log(this.id, parent.id)

      this.parent = parent as any
      this.line.parent = parent.line

      //继承父亲
      Object.setPrototypeOf(this, parent)
      //继承父线
      Object.setPrototypeOf(this.core, parent.core)
    }

    //初始化添加staffs
    let m = options?.staffs
      ? reduceSet(options.staffs, (t: any, staff) => t.add(staff), this)
      : this

    this.add(CreateChildHookStaff, PauseStaff)

    //创建事件
    ;(this as any)
      .add(CreateHookStaff)
      .line.emit({ type: 'create', noPause: true }, this.out())
    return m
  }
  setName(name: string) {
    ;(this as any).name = name
  }
  getName(): string | undefined {
    return (this as any).name
  }
  createChild(options?: CreateChildOptions): typeof this {
    let childMod = new EventLineMod(
      Object.assign({ parent: this }, options)
    ) as any
    this.emitHook('create-child', this.out(), childMod.out())
    return childMod
  }
  private emitHook(type: 'create-child', ...rest: any[]) {
    ;(this as any).line.emit(
      { type: type, noPause: true },
      //@ts-nocheck
      ...rest
    )
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
  ): EventLineMod<Config & Emit<T, P, R>> {
    return this as any
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
  ): EventLineMod<Config & Feat<Name, Value>> {
    ;(this.core.feat as any)[name] = value
    return this as any
  }
  /**
   * 显著特点是不继承
   * @param createFeat
   * @returns
   */
  assignOwnFeat<T extends {}>(
    createFeat: () => T & ThisType<EventLine<Config> & T>
  ): EventLineMod<AssignFeat<T> & Config> {
    this.assignFeat(createFeat() as any)

    this.core.on('create-child' as any, (p: any, c: any) => {
      c.mod.assignOwnFeat(createFeat)
    })

    return this as any
  }
  defineFn<Name extends string, REST extends any[], R, Fn>(
    name: Name,
    fn: (this: EventLine<Config>, ...rest: REST) => R
  ): EventLineMod<Feat<Name, (...rest: REST) => R> & Config> {
    this.assignFeat({
      name: fn,
    })
    return this as any
  }
  assignFn<T extends Record<string, Function>>(
    feat: T & ThisType<EventLine<AssignFeat<T> & Config>>
  ): EventLineMod<AssignFeat<T> & Config> {
    return (this as any).assignFeat(feat) as any
  }
  /**
   * 批量添加特性，会继承，子继承父类
   * @param feat 特性
   * @returns
   */
  assignFeat<T extends {}>(
    feat: T & ThisType<EventLine<AssignFeat<T> & Config>>
  ): EventLineMod<
    AssignFeat<T> &
      // T & ThisType<unknown extends Config['feat'] ? {} : Config['feat']>
      Config
  > {
    // ): EventLineFactory<AssignFeat<T> & Config> {
    Object.assign(this.core as any, feat)
    return this as any
  }
  provide<K extends string, V>(
    key: K,
    createValue: (this: EventLine<Config>) => V
  ): EventLineMod<
    AssignChain<{
      [k in `provide${Capitalize<K>}`]: () => void
    }> &
      AssignFeat<{
        [k in `inject${Capitalize<K>}`]: () => V
      }> &
      Config
  > {
    let line = this.line as any
    let k2 = capitalize(key)
    line[`provide${k2}`] = function () {
      this[key] = createValue.call(this)
      return this
    }
    line[`inject${k2}`] = function () {
      let value = this[key]
      if (value === undefined) {
        throw new Error(`EventLine:inject Not find ${key}`)
      }
      return this[key]
    }

    return this as any
  }

  assignChain<T extends {}>(
    feat: T & ThisType<EventLine<AssignChain<T> & Config>>
  ): EventLineMod<AssignChain<T> & Config> {
    this.assignFeat(
      Object.fromEntries(
        Object.entries(feat).map(([key, value]) => [
          key,
          function (this: any, ...rest: any[]) {
            ;(value as any).bind(this)(...rest)
            return this
          },
        ])
      )
    )
    return this as any
  }

  onlyFeat<T extends {}>(
    feat: T & ThisType<EventLine<Config> & T>
  ): EventLineMod<AssignFeat<T> & Config> {
    Object.entries(feat).forEach(([key, value]) => {
      if ((this.core as any)[key] !== undefined) {
        ;(this.core as any)[key] = value
      }
    })
    Object.assign(this.core as any, feat)
    return this as any
  }

  hasStaff<R extends EventLineConfig>(staff: StaffFlag<any>): boolean {
    let id = (staff as any).id ?? (staff as any).name
    //空的name不会记录（匿名特性可以直接添加，但不会重复添加），所以可以直接这样判断
    return Boolean(
      this.staffNames.has(id) ||
        this.staffs.has(staff) ||
        (this.parent && this.parent.hasStaff(staff))
    )
  }

  /**
   * 添加事件线组装工，插件化的添加特性
   * @param staff
   * @returns
   */
  add<ArrayFlag extends StaffFlag[] = []>(
    ...staffs: ArrayFlag
  ): EventLineMod<MergeStaffConfig<ArrayFlag> & Config>

  /**
   * 添加事件线组装工，插件化的添加特性
   * @param staff
   * @returns
   */
  add<C extends ClassStaff<Name>, Name extends string>(
    staff: C
  ): EventLineMod<Feat<InstanceType<C>['name'], InstanceType<C>> & Config>

  /**
   * 添加事件线组装工，插件化的添加特性
   * @param staff
   * @returns
   */
  add<_Config extends EventLineConfig>(
    staff: StaffType<any, [], _Config>
  ): EventLineMod<Config & _Config>
  add(...rest: any[]): any {
    return rest.reduce((mod, staff) => {
      return mod._add(staff)
    }, this as any) as any
  }

  /**
   * 添加事件线组装工，插件化的添加特性
   * @param staff
   * @returns
   */
  private _add<R extends EventLineConfig>(
    staff: StaffType<Config, [], R>
  ): EventLineMod<R & Config> {
    if (!staff) return this as any
    if (String(staff).startsWith('class')) {
      return this.addClassStaff(staff as any) as any
    } else if (typeof staff === 'function') {
      return this.addFunctionStaff(staff as any)
    } else {
      throw new Error('EventLine.add:not is a staff')
    }
  }
  /**
   * 添加事件线组装工，插件化的添加特性
   * @param staff
   * @returns
   */
  private addFunctionStaff<R extends EventLineConfig>(
    staff: FunctionStaff<Config, [], R>
  ): EventLineMod<R & Config> {
    //空的name不会记录（匿名特性可以直接添加，但不会重复添加），所以可以直接这样判断
    //是否已添加对应的staff
    if (this.hasStaff(staff as any)) {
      return this as any
    }
    let id = staff.id

    //空的name不会添加
    //先添加可避免循环回调
    id && this.staffNames.add(id)
    this.staffs.add(staff)

    //添加依赖
    if (staff.dependents) {
      const dependents = staff.dependents()
      if (__DEV__) {
        if (!Array.isArray(dependents)) {
          logger.error(`add => dependents is undefined`)
        }
      }
      for (const dependent of dependents) {
        if (__DEV__ || __TEST__) {
          if (!dependent) {
            let e = `staff is a undefined ,please check it, For example, a circular dependency may occur,\nat staff ${id},\ncode:${staff.toString()}`
            logger.error(e)
            throw new Error(e)
          }
        }
        this.add(dependent)
      }
    }

    //添加staff
    return staff(this as any) as any
  }
  addClassStaff<Class extends ClassStaff<Name>, Name extends string>(
    staff: Class
  ): EventLineMod<Feat<Name, Class>> {
    let i = new staff(this.out())
    return this.assignFeat({ [i.name]: i }) as any
  }
  /**
   * 事件线复用
   * @returns x
   */
  reuse(): EventLine<Config> {
    return this.core as any
  }
  /**
   * 创建一个新的事件线
   * @returns
   */
  createAsATemplate(): EventLine<Config> {
    return this.createAsATemplateMod().out() as any
  }
  createAsATemplateMod(): EventLineMod<Config> {
    return new EventLineMod({ staffs: this.staffs }) as any
  }
  /**
   * 返回到已构造的事件线
   * @returns
   */
  out(): EventLine<Config> {
    return this.reuse()
  }
  inLine(fn: (line: EventLine<Config>) => void): typeof this {
    fn(this.out())
    return this
  }
}
