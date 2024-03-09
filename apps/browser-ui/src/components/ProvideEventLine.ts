import {
  EventLineMod,
  GlobalUrlsStaff,
  LoginStaff,
  LoginUtilsStaff,
  PauseStaff,
  PoolStaff,
  Pubkey,
  RelayConfiguratorSynchronizerAddUrlsStaff,
} from '@/nostr-runtime'
import { createInjection } from '../utils/useUtils'
import { ReactiveStaff } from '../utils/vue'
import { useActiveComponent } from './ProvideActive'

export const [
  provideEventLineMod,
  injectEventLineMod,
  assertInjectEventLineMod,
] = createInjection(
  {
    name: 'event-line',
    noWarn: true,
  },
  (...rest: any[]) => {
    return new EventLineMod().add(
      ReactiveStaff,
      PoolStaff,
      //中继同步器
      // RelayConfiguratorSynchronizer.Staff,
      RelayConfiguratorSynchronizerAddUrlsStaff,
      //登录
      LoginStaff,
      //暂停器
      PauseStaff
    )
  }
)

export function provideEventLineScoped(name?: string) {
  let mod = injectEventLineMod()
  let scopedMod
  if (mod) {
    scopedMod = mod.createChild({ name })
  } else {
    scopedMod = provideEventLineMod()
  }
  let l = scopedMod.out()
  let active = useActiveComponent()

  watch(
    active,
    () => {
      logger.debug(`${name}:active:`, active.value)
      if (active.value) {
        l.continue()
      } else {
        l.parse()
      }
    },
    {
      immediate: true,
    }
  )

  return scopedMod
}

// export function useEventLine<REST extends StaffFlag[] = []>(
//   ...rest: REST
// ): EventLine<MergeStaffConfig<REST>>
export const useEventLine: ReturnType<
  typeof assertInjectEventLineMod
>['line']['add'] = function (...rest: any) {
  return (
    assertInjectEventLineMod()
      .out()
      //@jumpalong
      .add(...rest)
  )
}

// assertInjectEventLineMod()
//   .out()
//   //@jumpalong
//   .add<REST>(...rest)
export function usePubkey() {
  let line = useEventLine(LoginUtilsStaff)
  let pubkey = asyncComputed(() => {
    return line.getPubkeyOrNull()
  })
  return pubkey
}
export function useIsMe(pubkey: Ref<Pubkey | null | undefined>) {
  const currentPubkey = usePubkey()
  return computed(
    () =>
      pubkey.value &&
      currentPubkey.value &&
      pubkey.value.toHex() === currentPubkey.value.toHex()
  )
}
export function useIsLogin() {
  let line = useEventLine(LoginUtilsStaff)
  return asyncComputed(async () => {
    return await line.isLogin()
  })
}
export function useGlobalUrl() {
  let line = useEventLine(GlobalUrlsStaff)
  return asyncComputed(async () => {
    return await line.autoGetGlobalUrls()
  })
}
