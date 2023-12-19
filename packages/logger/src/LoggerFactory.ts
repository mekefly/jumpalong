import { Logger } from "./Logger";

export class LoggerFactory<Config = {}> {
  plugins: LoggerPlugin<any>[] = [];
  config: Config = {} as any;
  global?: Logger<Config>;

  addPlugin<_Config>(
    plugin: LoggerPlugin<Partial<_Config>>
  ): LoggerFactory<_Config & Config> {
    this.plugins.push(plugin);
    return this as any;
  }
  assignConfig(config: Partial<Config>) {
    Object.assign(this.config as any, config);
    return this;
  }
  create(path: string): Logger<Config> {
    const logger = new Logger(path, this.config);
    return this.plugins.reduce((logger, currentValue) => {
      return currentValue(logger as any, this) ?? logger;
    }, logger);
  }
  provideFactoryGlobal(key: string = "loggerFactory") {
    (window as any)[Symbol.for(key)] = this;
    return this;
  }
  provideRootGlobal(key: string = "logger") {
    (window as any)[key] = this.getGlobal();
    return this;
  }
  getGlobal() {
    return this.global ?? (this.global = this.create("global"));
  }
}
export type LoggerPlugin<Config = {}> = (
  logger: Logger,
  loggerFactory: LoggerFactory<Config>
) => void | Logger<Config>;

export function createPlugin<P extends LoggerPlugin<any>>(p: P): P {
  return p as any;
}
