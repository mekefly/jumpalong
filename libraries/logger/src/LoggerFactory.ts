import { Logger } from './Logger'

export class LoggerFactory<Config = {}> {
  plugins: LoggerPlugin<any>[] = []
  config: Config = {} as any
  global?: Logger<Config>

  addPlugin<_Config>(
    plugin: LoggerPlugin<Partial<_Config>>
  ): LoggerFactory<_Config & Config> {
    this.plugins.push(plugin)
    return this as any
  }
  assignConfig(config: Partial<Config>) {
    Object.assign(this.config as any, config)
    return this
  }
  create(path: string, config?: Config): Logger<Config> {
    return new Logger(
      path,
      Object.assign({}, this.config, config),
      this,
      this.plugins
    )
  }
  provideFactoryGlobal(key: string = '__loggerFactory') {
    ;(window as any)[key] = this
    return this
  }
  provideRootGlobal(key: string = 'logger') {
    ;(window as any)[key] = this.getGlobal()
    return this
  }
  getGlobal() {
    return this.global ?? (this.global = this.create('global'))
  }
}
export type LoggerPlugin<Config = {}> = (
  logger: Logger,
  loggerFactory: LoggerFactory<Config>
) => void | Logger<Config>

export function createPlugin<P extends LoggerPlugin<any>>(p: P): P {
  return p as any
}
