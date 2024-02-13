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

export function useEventLine<
  REST extends Array<(mod: EventLineFactory<{}>) => EventLineFactory<{}>> = []
>(
  ...rest: REST
): EventLine<
  MixinEventLineConfig<REST> extends EventLineConfig
    ? MixinEventLineConfig<REST>
    : {}
>
export function useEventLine<
  Config extends EventLineConfig = {},
  REST extends Array<
    (line: EventLineFactory<any>) => EventLineFactory<any>
  > = []
>(...rest: any[]) {
  return assertInjectEventLineMod()
    .out()
    .add(...rest)
}
export function usePubkey() {
  let line = useEventLine(LoginStaff)
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
