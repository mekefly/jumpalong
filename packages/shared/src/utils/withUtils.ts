import { useCache } from '../cache'
/**
 * 同步间隔
 * @param key 标记
 * @param fun 函数
 * @param interval 间隔
 * @returns
 */
export function syncInterval(
  key: any,
  fun: () => void,
  interval: number = 1000 * 60
) {
  if (interval === 0) {
    fun()
    return
  }
  useCache(
    JSON.stringify(key),
    () => {
      fun()
      return true
    },
    {
      duration: interval
    }
  )
}
