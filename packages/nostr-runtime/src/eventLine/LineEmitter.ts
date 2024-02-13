import { ReversePromise, createTaskQueue, timeout } from '@jumpalong/shared'
import { BlobOptions } from 'buffer'
import { listeners } from 'process'
$LoggerScope()

console.log('logger', logger)
logger.debug('xx')

type KeyType = string | symbol | number
type Listener = ((...rest: any[]) => any) & listenerFlags
const queue = createTaskQueue(0)
export type listenerFlags = OnceOptions & {
  unShift?: boolean
}
export type ReturnContext = {
  stop(): void
}
export interface OnceOptions {
  once?: boolean
}
export interface EmitOptions<TYPE extends KeyType = KeyType, ReturnValue = any>
  extends OnceOptions {
  type?: TYPE
  types?: TYPE[]
  onReturnOnce?: boolean
  noPause?: boolean
  onReturn?(v: ReturnValue, context: ReturnContext): void
  onReturns?(vs: any[]): void
}

export type LineEmitterOptions = { name?: string }
export class LineEmitter {
  private events: Record<KeyType, Set<Listener> | undefined> = {}
  parseState: boolean = false
  parsePromise = new ReversePromise()
  name: string = ''

  constructor(options?: LineEmitterOptions) {
    if (!options) return
    options.name && (this.name = options?.name)
  }

  private getEventAndInit(type: KeyType) {
    return this.events[type] || (this.events[type] = new Set())
  }

  private setEventAndInit(type: KeyType, set: Set<Listener>) {
    return (this.events[type] = set)
  }
  on(type: KeyType, listener: Listener, flags?: listenerFlags) {
    Object.assign(listener, flags)
    if (flags?.unShift) {
      this.setEventAndInit(
        type,
        new Set([listener, ...this.getEventAndInit(type)])
      )
    } else {
      this.getEventAndInit(type).add(listener)
    }
  }
  once(type: KeyType, listener: Listener) {
    this.on(type, Object.assign(listener, { once: true }))
  }

  async emitResult(options: EmitOptions, ...rest: any[]): Promise<any>
  async emitResult(type: KeyType, ...rest: any[]): Promise<any>
  async emitResult(maybeOptions: KeyType | EmitOptions, ...rest: any[]) {
    return new Promise<any>((resolve, reject) => {
      if (typeof maybeOptions === 'object') {
        this.emit(Object.assign(maybeOptions, { onReturn: resolve }), ...rest)
      } else {
        this.emit({ type: maybeOptions, onReturn: resolve }, rest)
      }
    })
  }

  async emitResults(options: EmitOptions, ...rest: any[]): Promise<any[]>
  async emitResults(type: KeyType, ...rest: any[]): Promise<any[]>
  async emitResults(maybeOptions: KeyType | EmitOptions, ...rest: any[]) {
    return new Promise<any[]>((resolve, reject) => {
      if (typeof maybeOptions === 'object') {
        this.emit(Object.assign(maybeOptions, { onReturns: resolve }), ...rest)
      } else {
        this.emit({ type: maybeOptions, onReturns: resolve }, rest)
      }
    })
  }
  async emit(options: EmitOptions, ...rest: any[]): Promise<void>
  async emit(type: KeyType, ...rest: any[]): Promise<void>
  async emit(maybeOptions: KeyType | EmitOptions, ...rest: any[]) {
    if (typeof maybeOptions === 'object') {
      if (maybeOptions.type) {
        await this._emit(maybeOptions.type, maybeOptions, rest)
      }
      if (maybeOptions.types) {
        for (const type of maybeOptions.types) {
          await this._emit(type, maybeOptions, rest)
        }
      }
    } else {
      await this._emit(maybeOptions, {}, rest)
    }
  }

  private async _emit(type: KeyType, options: EmitOptions, rest: any[]) {
    let excludes = new Set<KeyType>(['create-child'])
    if (excludes.has(type) || options.noPause) {
      this.__emit(type, options, rest)
      return
    }
    await this.awaitToRun()
    this.__emit(type, options, rest)
  }
  private __emit(type: KeyType, options: EmitOptions, rest: any[]) {
    let { onReturn, onReturns, once: emitOnce, onReturnOnce } = options
    let listeners = this.events[type]
    if (!listeners) return

    let isStop = false

    const context = {
      stop() {
        isStop = true
      },
    }
    let returnValues: any[] = []

    for (const listener of listeners) {
      let returnValue = listener(...rest)
      returnValues.push(returnValue)

      listener.once && this.removeListen(type, listener)

      onReturn?.(returnValue, context)
      onReturnOnce && (onReturn = undefined)

      if (isStop) break
    }

    onReturns?.(returnValues)
    emitOnce && this.removeAllListen(type)
  }
  parse() {
    this.parseState = true
    this.parsePromise.reset()
    logger.debug(`emitter${this.name ? `:${this.name}` : ''}:`, '已暂停')
  }
  continue() {
    this.parseState = false
    this.parsePromise.resolve()
    logger.debug(`emitter${this.name ? `:${this.name}` : ''}:`, '己继续')
  }
  awaitToRun(): Promise<void> | void {
    if (this.parseState) {
      return this.parsePromise.promise
    }
  }
  async emitOnce(type: KeyType, ...rest: any[]) {
    await this.emit({ type, once: true }, ...rest)
    this.removeAllListen(type)
  }
  removeListen(type: KeyType, listener: Listener) {
    let listeners = this.events[type]
    listeners?.delete(listener)
  }
  removeAllListen(type: KeyType) {
    delete this.events[type]
  }
  clear() {
    this.events = {}
  }
}
