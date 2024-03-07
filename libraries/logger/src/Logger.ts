import { LogLevel } from './LogLevel'
import { LoggerFactory, LoggerPlugin } from './LoggerFactory'
import { EventEmitter } from 'events'

type LoggerFilter<Config> = (logger: Logger<Config>, level: LogLevel) => boolean

type LoggerContext = (opt: { level: LogLevel }, argv: any[]) => void
/**
 * 日志打印工具，统一管理日志输出&上报
 */
export class Logger<Config = {}> {
  /** 命名空间（scope），用于区分所在执行文件 */
  public path: string
  private config: Config = {} as any
  public filters: LoggerFilter<Config>[] = []
  public contexts: LoggerContext[] = []
  public emitter = new EventEmitter()

  constructor(
    path: string,
    config: Config,
    public factory: LoggerFactory<Config>,
    plugins: LoggerPlugin<Partial<Config>>[]
  ) {
    this.config = config
    this.path = path
    let x = plugins.reduce((logger, currentValue) => {
      return currentValue(logger as any, factory as any) ?? logger
    }, this as any)

    this.emitter.emit('created')
    return x
  }

  public setConfig(config: Partial<Config>) {
    this.config = config as any
    return this
  }
  public getConfig(): Config {
    return this.config
  }
  public assignConfig(config: Partial<Config>, clone: boolean = true) {
    this.setConfig(
      clone
        ? Object.assign({}, this.config, config)
        : Object.assign(this.config as any, config)
    )
    return this
  }
  addContext(context: LoggerContext) {
    this.contexts.push(context)
  }
  addFilter(filter: LoggerFilter<Config>) {
    this.filters.push(filter)
  }

  private _log(level: LogLevel, args: unknown[]) {
    if (this.filter(level)) {
      this.context(level, args)
    }
  }
  filter(level: LogLevel) {
    return this.filters.every(filter => filter(this, level))
  }
  context(level: LogLevel, args: unknown[]) {
    for (const content of this.contexts) {
      content({ level }, args)
    }
  }

  public log(level: LogLevel, ...args: unknown[]) {
    this._log(level, args)
    return this
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public silly(...args: unknown[]) {
    this._log(LogLevel.Silly, args)
    return this
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public debug(...args: unknown[]) {
    this._log(LogLevel.Debug, args)
    return this
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public verbose(...args: unknown[]) {
    this._log(LogLevel.Verbose, args)
    return this
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public http(...args: unknown[]) {
    this._log(LogLevel.Http, args)
    return this
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public info(...args: unknown[]) {
    this._log(LogLevel.Info, args)
    return this
  }

  /**
   * 打印输出警告信息 ❕
   *
   * @param args 任意参数
   */
  public warn(...args: unknown[]) {
    this._log(LogLevel.Warn, args)
    return this
  }

  /**
   * 打印输出错误信息 ❌
   *
   * @param args 任意参数
   */
  public error(throwError: boolean, ...args: unknown[]): void
  public error(...args: unknown[]): void
  public error(...args: unknown[]) {
    this._log(LogLevel.Error, args)
    return this
  }
}
