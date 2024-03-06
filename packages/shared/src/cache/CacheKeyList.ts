export class KeyList {
  private LIST_KEY
  private keyList!: Set<string>
  constructor(LIST_KEY: string) {
    this.LIST_KEY = LIST_KEY

    this.init()
  }
  init() {
    const str = localStorage.getItem(this.LIST_KEY)

    if (!str) {
      this.keyList = new Set()
      return
    }

    const v = JSON.parse(str)
    if (!Array.isArray(v)) {
      this.keyList = new Set()
      return
    }

    this.keyList = new Set(v)
  }

  add(key: string) {
    this.keyList.add(key)

    this.updateKeyList()
  }
  delete(key: string) {
    this.keyList.delete(key)
    this.updateKeyList()
  }
  getKeys() {
    return this.keyList
  }
  private updateKeyList() {
    const cacheString = JSON.stringify(Array.from(this.keyList))
    localStorage.setItem(this.LIST_KEY, cacheString)
  }
  clear() {
    localStorage.removeItem(this.LIST_KEY)
  }
}
export class LocalStorageMap<V> {
  private keyList: KeyList
  private map: Map<string, V> | null = null

  constructor(CACHE_LIST_KEY: string) {
    this.keyList = new KeyList(CACHE_LIST_KEY)
  }
  set(key: string, value: V) {
    localStorage.setItem(key, JSON.stringify(value))
    this.keyList.add(key)
    this.getMap().set(key, value)
  }
  get(key: string): V | null {
    if (this.map) {
      return this.map.get(key) ?? null
    } else {
      return this.localGet(key)
    }
  }
  has(key: string) {
    return !!this.get(key)
  }
  localGet(key: string): V | null {
    const valueStr = localStorage.getItem(key)
    if (!valueStr) {
      return null
    }
    return JSON.parse(valueStr)
  }
  remote(key: string) {
    localStorage.removeItem(key)
    this.keyList.delete(key)
    this.map?.delete(key)
  }
  getValues() {
    return [...this.getMap().values()]
  }
  getKeys() {
    return this.keyList.getKeys()
  }
  getMap() {
    if (this.map) return this.map
    this.map = new Map<string, V>()
    const keys = this.keyList.getKeys()

    for (const key of keys) {
      const v = this.localGet(key)

      if (!v) {
        continue
      }
      this.map.set(key, v)
    }
    return this.map
  }
  clear() {
    for (const key of this.getKeys()) {
      this.remote(key)
    }
    this.keyList.clear()
    this.keyList.init()
  }
}
