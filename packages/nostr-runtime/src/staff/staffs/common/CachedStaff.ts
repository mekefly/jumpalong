import { useCache, deleteCache } from '@jumpalong/shared'
import { createStaff } from '../../staff'
import { CacheOptions } from './optionsType'

export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    cacheByOptions<T>(opts: CacheOptions, f: () => T): T {
      return useCache(createKeyByOptions(opts), f, {
        useMemoryCache: opts.cache,
        useLocalStorage: false,
      })
    },
    recacheByOptions(opts: CacheOptions) {
      deleteCache(createKeyByOptions(opts))
    },
  })
})
function createKeyByOptions(opts: CacheOptions): string {
  return 'CE:' + opts.name ? `${opts.name}:` : '' + `${JSON.stringify(opts)}`
}
