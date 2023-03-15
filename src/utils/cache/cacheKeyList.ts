export class LocalStorageKeyList {
  private CACHE_LIST_KEY;
  private cacheList: Set<string>;
  constructor(CACHE_LIST_KEY: string) {
    this.CACHE_LIST_KEY = CACHE_LIST_KEY;

    const str = localStorage.getItem(CACHE_LIST_KEY);
    if (!str) {
      this.cacheList = new Set();
      return;
    }
    const v = JSON.parse(str);
    if (!Array.isArray(v)) {
      this.cacheList = new Set();
      return;
    }
    this.cacheList = new Set(v);
  }

  addCacheKey(key: string) {
    this.cacheList.add(key);

    this.reviseCacheList();
  }
  deleteCacheKey(key: string) {
    this.cacheList.delete(key);
    this.reviseCacheList();
  }
  getCacheList() {
    return this.cacheList;
  }
  private reviseCacheList() {
    const cacheString = JSON.stringify(Array.from(this.cacheList));
    localStorage.setItem(this.CACHE_LIST_KEY, cacheString);
  }
}
