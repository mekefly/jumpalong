import { checkCache, isCache } from ".";

intelligentCleaning();
export function intelligentCleaning() {
  const localStorage = window.localStorage;
  const len = localStorage.length;

  for (let i = 0; i < len; i++) {
    try {
      const key = localStorage.key(i);
      if (!key) {
        continue;
      }

      const cacheString = localStorage.getItem(key);
      if (!cacheString) {
        continue;
      }
      const cache: any = JSON.parse(cacheString);
      if (!isCache(cache)) {
        continue;
      }

      try {
        checkCache(cache);
      } catch (err) {
        localStorage.removeItem(key);
      }
    } catch (error) {}
  }
}
(window as any).clearCache = clearCache;
export function clearCache() {
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
      const cache: any = JSON.parse(cacheString);

      if (!isCache(cache)) {
        continue;
      }
      localStorage.removeItem(key);
    } catch (error) {
      continue;
    }
  }
}
