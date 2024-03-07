import { useActivated } from '../utils/use'
import { createInjection } from '../utils/useUtils'

export const [provideActive, injectActive, assertInjectActive] =
  createInjection(
    'active',
    (_active: ComputedRef<boolean>) => {
      return _active
    },
    () => null
  )
export function provideActiveComponent(_active?: Ref<boolean>) {
  const currentActive = useActiveComponent(_active)
  provideActive(currentActive)
  return currentActive
}
export function useActiveComponent(_active?: Ref<boolean>) {
  let parentActive = injectActive()
  const onActive = useActivated()

  return computed(() => {
    return Boolean(
      (parentActive?.value ?? true) &&
        (_active?.value ?? true) &&
        (onActive.value ?? true)
    )
  })
}
