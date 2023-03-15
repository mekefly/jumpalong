import { DoublyLinkedList } from "@/utils/DoublyLinkedList";
import { createFormatPlugin } from "./plugin/createFormatPlugin";
import { createIncludePlugin } from "./plugin/createIncludePlugin";
import { LoggerPlugin } from "./plugin/Plugin";

const enum LogLevel {
  Error,
  Warn,
  Info,
  Http,
  Verbose,
  Debug,
  Silly,
}
export const LogLevelMap: Record<
  LogLevel,
  "error" | "warn" | "log" | "info" | "debug"
> = {
  [LogLevel.Error]: "error",
  [LogLevel.Warn]: "warn",
  [LogLevel.Info]: "log",
  [LogLevel.Http]: "info",
  [LogLevel.Verbose]: "info",
  [LogLevel.Debug]: "debug",
  [LogLevel.Silly]: "info",
};

export const Styles = {
  [LogLevel.Info]: "color: green;",
  [LogLevel.Warn]: "color: orange;",
  [LogLevel.Error]: "color: red;",
  [LogLevel.Http]: "color: #4bcffa",
  [LogLevel.Verbose]: "color: #ccae62",
  [LogLevel.Debug]: "color: #7158e2",
  [LogLevel.Silly]: "color: #3d3d3d",
};

const Methods = ["info", "warn", "error"] as const;
const loggerMap = new Map<string, Logger>();
type LoggerConfig<Config extends object> = {
  format?: Format<Config>;
} & Config;
type Format<Config extends object> = (
  logger: Logger<Config>,
  level: LogLevel,
  args: unknown[]
) => unknown[];

const defaultFormat: Format<any> = (logger, level, args) => [
  `%c${logger.namespace}`,
  Styles[level] as string,
  ...args,
];

/**
 * 日志打印工具，统一管理日志输出&上报
 */
export class Logger<Config extends object = {}> {
  static lastLogger: Logger<any> | null = null;

  /** 命名空间（scope），用于区分所在执行文件 */
  public namespace: string;
  private config: LoggerConfig<Config> | null = null;
  public parent!: Logger | null;
  private plugins: Array<LoggerPlugin<Config>>;
  public chain: DoublyLinkedList<string> = new DoublyLinkedList();
  private get format() {
    return this.getConfig().format ?? defaultFormat;
  }

  constructor(
    namespace: string = "root",
    parent: Logger | null = null,
    config?: LoggerConfig<Config>
  ) {
    config && (this.config = config);
    this.namespace = namespace;
    this.plugins = parent?.plugins ?? ([] as any);

    this.setParrent(parent);
  }

  public setConfig(config: Partial<LoggerConfig<Config>>) {
    this.config = config as any;
    return this;
  }
  public getConfig(): LoggerConfig<Config> {
    return this.config ?? this.parent?.getConfig() ?? (this.config = {} as any);
  }
  public assignConfig(
    config: Partial<LoggerConfig<Config>>,
    clone: boolean = true
  ) {
    this.setConfig(
      clone
        ? Object.assign({}, this.config, config)
        : Object.assign(this.config as any, config)
    );
    return this;
  }

  /**
   * 创建新的 Logger 实例
   *
   * @param namespace 命名空间
   * @returns Logger
   */
  public for(namespace?: string): typeof this {
    if (namespace === undefined) {
      return (Logger.lastLogger = Logger.lastLogger ?? (root as any));
    }

    // let logger = loggerMap.get(namespace);

    let lastLogger = Logger.lastLogger ?? root;
    // if (!logger) {
    let logger = new Logger(namespace, lastLogger as any) as any;
    // loggerMap.set(namespace, logger as any);
    // }
    //  logger!.setParrent(Logger.lastLogger);
    // if (
    //   logger !== Logger.lastLogger &&
    //   (logger as any) !== root &&
    //   logger?.parent !== Logger.lastLogger
    // ) {
    //   Logger.lastLogger &&
    // }

    // setTimeout(() => {
    //   Logger.lastLogger = null;
    // }, 0);
    Logger.lastLogger = logger as any;
    return logger as any;
  }
  setParrent(parent: Logger<any> | null) {
    this.parent = parent;

    const chain = new DoublyLinkedList<string>();
    this.chain = chain;

    let current = this as null | Logger<any>;
    const set = new Set();
    while (current) {
      const namespace = current.namespace;

      if (set.has(namespace)) {
        chain.add(current.namespace);
        this.parent = null;

        return;
      }

      set.add(namespace);
      chain.add(current.namespace);

      current = current.parent;
    }
  }
  public addPlugin<C extends object>(
    plugin: LoggerPlugin<C>
  ): Logger<Config & C> {
    plugin.config && this.assignConfig(plugin.config);
    plugin.initialization?.(this as any);

    this.plugins.push(plugin as any);
    return this as any;
  }

  private _log(level: LogLevel, args: unknown[]) {
    if (this.plugins.every((plugin) => plugin.filter?.(this) ?? true))
      console[LogLevelMap[level]](...this.format(this, level, args));
  }

  public log(level: LogLevel, ...args: unknown[]) {
    this._log(level, args);
    return this;
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public silly(...args: unknown[]) {
    this._log(LogLevel.Silly, args);
    return this;
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public debug(...args: unknown[]) {
    this._log(LogLevel.Debug, args);
    return this;
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public verbose(...args: unknown[]) {
    this._log(LogLevel.Verbose, args);
    return this;
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public http(...args: unknown[]) {
    this._log(LogLevel.Http, args);
    return this;
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public info(...args: unknown[]) {
    this._log(LogLevel.Info, args);
    return this;
  }

  /**
   * 打印输出警告信息 ❕
   *
   * @param args 任意参数
   */
  public warn(...args: unknown[]) {
    this._log(LogLevel.Warn, args);
    return this;
  }

  /**
   * 打印输出错误信息 ❌
   *
   * @param args 任意参数
   */
  public error(...args: unknown[]) {
    this._log(LogLevel.Error, args);
    return this;
  }
}

export function createRootLogger() {
  return new Logger()
    .addPlugin(createIncludePlugin())
    .addPlugin(createFormatPlugin());
}

export const root = createRootLogger();

try {
  window && ((window as any).logger = root);
  global && ((global as any).logger = root);
} catch (error) {}

export default root;
