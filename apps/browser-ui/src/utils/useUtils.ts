import { type MaybeRef } from 'vue'
import { inject, provide } from 'vue'

type Options = {
  name: string
  noWarn?: boolean
}
export function createInjection<T extends any>(
  name: string | Options
): readonly [
  provide: (target: T) => T,
  inject: () => T | null,
  assertInject: () => T
]

export function createInjection<Argv extends any[], T extends any>(
  name: string | Options,
  fun?: (...argv: Argv) => T,
  createDefault?: () => T
): readonly [
  provide: (...argv: Argv) => T,
  inject: () => T | null,
  assertInject: () => T
]

export function createInjection(
  nameOrOptions: string | Options,
  fun?: (...argv: any[]) => any,
  createDefault?: () => any
): readonly [(...argv: any[]) => any, () => any | null, () => any] {
  let options =
    typeof nameOrOptions === 'string' ? { name: nameOrOptions } : nameOrOptions
  let name = options.name

  const key = Symbol.for(name as any)
  return [
    fun
      ? (...argv: any[]) => {
          const v = fun(...argv)
          provide(key, v)
          return v
        }
      : (v: any) => provide(key, v),

    createDefault
      ? () => inject(key, createDefault, true)
      : options?.noWarn
      ? () => inject(key, () => null, true)
      : () => inject(key),
    createDefault
      ? () => inject(key, createDefault, true)
      : () => {
          let x = inject(
            key,
            () => {
              throw new Error(`${name ?? 'inject'}没有注入`)
            },
            true
          )
          return x
        },
  ] as const
}

export function useLimitMovement(maxShifting: MaybeRef<number>) {
  const shifting = ref(0)

  const moveScale = computed(() => {
    const abs = Math.abs(shifting.value)

    if (abs >= unref(maxShifting)) {
      return 0
    }
    return (unref(maxShifting) - abs) / unref(maxShifting)
  })

  return {
    shifting,
    moveScale,
    add(n: number) {
      shifting.value += n * moveScale.value
    },
    remake() {
      shifting.value = 0
    },
  }
}

export function useUpdateFlag() {
  let flag = ref(false)

  let ck: any = null
  return {
    flag,
    refreshWithDep<T>(k: T) {
      if (ck === k) {
        return
      }
      ck = k

      flag.value = !flag.value
    },
    refresh() {
      flag.value = !flag.value
    },
  }
}
