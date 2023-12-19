import { checkCache, isCache } from ".";
import { cacheParser } from "./cache";
import keylist from "./keylist";

setTimeout(() => {
  intelligentCleaning();
});
export function intelligentCleaning() {
  const localStorage = window.localStorage;

  const list = keylist.getKeys();
  for (const key of list) {
    try {
      const cacheString = localStorage.getItem(key);
      if (!cacheString) {
        continue;
      }

      const cache: any = cacheParser(cacheString);
      if (!isCache(cache)) {
        continue;
      }
      checkCache(cache);
    } catch (err) {
      localStorage.removeItem(key);
    }
  }
}
(window as any).clearCache = clearCache;
export function clearCache() {
  const localStorage = window.localStorage;
  const len = localStorage.length;

  const list = keylist.getKeys();
  for (const key of list) {
    try {
      const cacheString = localStorage.getItem(key);
      if (!cacheString) {
        continue;
      }
      const cache: any = cacheParser(cacheString);
      if (!isCache(cache)) {
        continue;
      }

      localStorage.removeItem(key);
    } catch (error) {}
  }
}

(window as any).clearCacheAll = clearCacheAll;
export function clearCacheAll() {
  const localStorage = window.localStorage;
  const len = localStorage.length;

  for (let i = 0; i < len; i++) {
    const key = localStorage.key(i);
    if (!key) {
      continue;
    }
    const cacheString = localStorage.getItem(key);
    if (!cacheString) {
      continue;
    }

    try {
      const cache: any = cacheParser(cacheString);

      if (!isCache(cache)) {
        continue;
      }
      localStorage.removeItem(key);
    } catch (error) {
      continue;
    }
  }
}
