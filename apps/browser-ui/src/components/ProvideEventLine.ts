// import {
//   EventLineMod,
//   GlobalUrlsStaff,
//   LoginUtilsStaff,
//   Pubkey,
// } from '@/nostr-runtime'
import { ReactiveStaff } from '@/utils/vue'
import {
  EventLine,
  EventLineMod,
  MergeStaffConfig,
  PauseStaff,
  StaffFlag,
} from '@jumpalong/core'
import {
  DefineConfigStaff,
  DefineConfigStaffConfigType,
  GlobalUrlsStaff,
  LoginStaff,
  LoginUtilsStaff,
  Pool,
  RelayConfiguratorSynchronizer,
} from '../nostr-runtime'
import { Pubkey } from '@jumpalong/nostr-shared'
import { createInjection } from '../utils/useUtils'
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
      //响应化需要的部分
      ReactiveStaff,
      //中继池
      Pool.Staff,
      //中继同步器
      RelayConfiguratorSynchronizer.Staff,
      //登录
      LoginStaff,
      //暂停器
      PauseStaff,
      DefineConfigStaff
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
export type AddType = ReturnType<typeof assertInjectEventLineMod>['line']['add']
export const useEventLine: AddType = function (...rest: any) {
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
export const useConfig = <ArrayFlag extends StaffFlag[] = []>(
  ...staffs: ArrayFlag
): EventLine<
  DefineConfigStaffConfigType & MergeStaffConfig<ArrayFlag>
>['config'] => {
  const line = useEventLine(...staffs)
  return line.getConfig() as any
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
