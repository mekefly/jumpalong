import {
  EventLine,
  EventLineConfig,
  EventLineFactory,
  LoginStaff,
  MixinEventLineConfig,
  PoolStaff,
  Pubkey,
  RelayConfiguratorSynchronizerStaff,
  PauseStaff,
  RelayConfiguratorSynchronizerAddUrlsStaff,
  StaffFlag,
  MergeStaffConfig,
  GlobalUrlsStaff,
  LoginUtilsStaff,
} from '@jumpalong/nostr-runtime'
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
    return new EventLineFactory().add(
      ReactiveStaff,
      PoolStaff,
      //中继同步器
      RelayConfiguratorSynchronizerStaff,
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

export function useEventLine<REST extends StaffFlag[] = []>(
  ...rest: REST
): EventLine<MergeStaffConfig<REST>>
export function useEventLine<
  Config extends EventLineConfig = {},
  REST extends Array<
    (line: EventLineFactory<any>) => EventLineFactory<any>
  > = []
>(...rest: any[]) {
  return assertInjectEventLineMod()
    .out()
    .add(...(rest as [any]))
}
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
