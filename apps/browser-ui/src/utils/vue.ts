import { ArgumentsType } from 'vitest'
import { watch } from 'vue'
import { debounce } from './utils'
import {
  ReactiveStaff as runtime_ReactiveStaff,
  createStaff,
} from '../nostr-runtime'

export const debounceWatch: typeof watch &
  ((
    r1: ArgumentsType<typeof watch>[0],
    r2: ArgumentsType<typeof watch>[1],
    opt: { delay: number } & ArgumentsType<typeof watch>[2]
  ) => ReturnType<typeof watch>) = ((r1: any, r2: any, opt: any) =>
  watch(r1, debounce(r2, opt.delay), opt)) as any

export function reactiveNewClass(Class: new () => any) {}
export function replaceProto(
  target: any,
  searchProto: any,
  replaceValueProto: any
) {
  if (target.__proto__ === replaceValueProto) {
    return target.__proto__
  } else if (target.__proto__ === searchProto) {
    searchProto.__proto__ = replaceValueProto
    return Object.prototype
  } else if (target.__proto__ === null || target.__proto__ === undefined) {
    searchProto.__proto__ = replaceValueProto
    return null
  } else {
    return replaceProto(target.__proto__, searchProto, replaceValueProto)
  }
}
class ReactiveInject {
  constructor() {
    return reactive(this)
  }
}

export const ReactiveStaff: typeof runtime_ReactiveStaff = createStaff(
  'reactive-staff',
  ({ mod, line }) => {
    return mod.assignFeat({
      reactive<T>(t: T): T & {
        __isReactive: boolean
      } {
        Object.assign(t as any, { __isReactive: true })
        Object.defineProperty(t, '__isReactive', {
          value: true,
          enumerable: false,
        })
        return reactive(t as any) as any
      },
      ref<T>(t: T): { value: T } {
        return ref(t) as any
      },
    })
  }
)
