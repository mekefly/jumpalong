import { createStaff } from '@jumpalong/core'
export default createStaff('reactive-staff', ({ mod, line }) => {
  return mod.assignFn({
    reactive<T>(value: T): T & {
      __isReactive: boolean
    } {
      ;(value as any).__isReactive = false
      return value as any
    },
    ref<T>(value: T): { value: T } {
      return this.reactive({ value: value })
    },
  })
})
