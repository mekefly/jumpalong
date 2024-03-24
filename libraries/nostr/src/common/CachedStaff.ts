import { useCache, deleteCache } from '@jumpalong/shared'
import { createStaff } from '@jumpalong/core'
import { CacheOptions } from '../types/api'

function createKeyByOptions(opts: CacheOptions): string {
  return `CE:${opts.name ? `${opts.name}:` : ''}:${JSON.stringify(opts)}`
}
export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    cacheByOptions<T>(opts: CacheOptions, f: () => T): T {
      return useCache(createKeyByOptions(opts), f, {
        duration: 1000 * 60 * 60,
        useMemoryCache: opts.cache ?? true,
        useLocalStorage: false,
      })
    },
    recacheByOptions(opts: CacheOptions) {
      deleteCache(createKeyByOptions(opts))
    },
  })
})
