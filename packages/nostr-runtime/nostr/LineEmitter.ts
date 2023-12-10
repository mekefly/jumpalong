type KeyType = string | symbol | number;
type Listener = ((...rest: any[]) => any) & listenerFlags;
type listenerFlags = { void?: boolean };
export class LineEmitter {
  private events: Record<KeyType, Set<Listener>> = {};
  // 防止无限循环
  private _returnEmitter: LineEmitter | null = null;
  public get returnEmitter() {
    return this._returnEmitter || (this._returnEmitter = new LineEmitter());
  }
  public set returnEmitter(value) {
    this._returnEmitter = value;
  }
  private isRunMap = new Map();

  constructor() {}

  private getEventAndInit(type: KeyType) {
    return this.events[type] || (this.events[type] = new Set());
  }
  on(type: KeyType, listener: Listener, options?: listenerFlags) {
    Object.assign(listener, options);
    this.getEventAndInit(type).add(listener);
  }
  once(type: KeyType, listener: Listener) {
    this.on(type, listener);
    this.on(type, () => {
      this.removeListen(type, listener);
    },{'void':true});
  }
  emit(type: KeyType, ...rest: any[]) {
    let eventListener = this.events[type];
    if (!eventListener) return;
    this.start(type);
    for (const listener of eventListener) {
      if (!this.isRun(type)) {
        break;
      }
      let returnValue = listener(...rest);
      listener.void || this.returnEmitter.emit(type, returnValue);
    }
    this.stop(type);
  }
  emitOnce(type: KeyType, ...rest: any[]) {
    this.emit(type, ...rest);
    this.removeAllListen(type);
    this.returnEmitter.removeAllListen(type);
  }
  start(key: KeyType) {
    return this.isRunMap.set(key, true);
  }
  stop(key: KeyType) {
    return this.isRunMap.set(key, false);
  }
  isRun(key: KeyType) {
    return this.isRunMap.has(key);
  }
  removeListen(type: KeyType, listener: Listener) {
    this.events[type]?.delete(listener);
  }
  removeAllListen(type: KeyType) {
    delete this.events[type];
  }
  clear() {
    this.events = {};
  }
}
class Stopable {
  constructor() {}
}
