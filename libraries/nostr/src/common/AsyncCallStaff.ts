import { createStaff } from '@jumpalong/core'

export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    asyncCall<R, E, T>(
      this: T,
      f: (this: T) => R,
      resolve?: (v: R) => void,
      reject?: (e: E) => void
    ) {
      ;(f.call(this) as any)?.then(resolve, reject)
    },
    chainCall<E, R, T>(
      this: T,
      f: (this: T) => R,
      resolve?: (v: R) => void,
      reject?: (e: E) => void
    ): T {
      ;(this as any).asyncCall(f, resolve, reject)
      return this
    },
  })
})
