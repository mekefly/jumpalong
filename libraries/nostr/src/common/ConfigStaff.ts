import { createStaff } from '@jumpalong/core'
import { withDefault } from '@jumpalong/shared'
import { ReactiveStaff } from '..'

export type ConfigType = {
  getOtherUrlsRequestLimitSize: number
  eventCacheDuration: number
  localStorage: {
    kind10002: number
    duration: number
  }
  pullRelayConfig: {
    // interval: (1000 * 60 * 60 * 24)
    interval: number
    debounce: number
  }
  relayEmiterQueueInterval: number
  // priority: {
  //   [key in keyof RelayEmiterRequestEventMap]: number;
  // } & {
  //   [key in keyof RelayEmiterResponseEventMap]: number;
  // };
  enablePapawTree: boolean
  enablePapawTreeLazyMode: boolean
  stopHideLongArticles: boolean
  lazyDelayForPapaw: number //0 等于忽略
  syncInterval: number
  syncInterval1: number
  syncInterval2: number
  syncInterval3: number
  syncInterval4: number
  syncInterval5: number
  syncInterval6: number
  syncInterval7: number
  syncInterval8: number
  syncInterval9: number
  autoPing: boolean
}

const createDefaultConfig = () => {
  const v: ConfigType = {
    getOtherUrlsRequestLimitSize: 50,
    localStorage: { kind10002: 500, duration: 1000 * 60 * 60 * 24 * 7 },
    eventCacheDuration: 1000 * 60 * 20,
    pullRelayConfig: {
      interval: 1000 * 60 * 60 * 24, // 24 hour
      debounce: 1000,
    },
    relayEmiterQueueInterval: 5,
    stopHideLongArticles: false,
    enablePapawTree: false,
    enablePapawTreeLazyMode: true,
    lazyDelayForPapaw: 0,
    // priority: {
    //   close: 11,
    //   closeReq: 12,
    //   publish: 10,
    //   req: 8,
    //   eose: 18,
    //   event: 7,
    //   notice: 0,
    //   ok: 15,
    // },
    syncInterval: 1000 * 60,
    syncInterval1: 1000 * 60 * 5,
    syncInterval2: 1000 * 60 * 15,
    syncInterval3: 1000 * 60 * 45,
    syncInterval4: 1000 * 60 * 60, // 1hour
    syncInterval5: 1000 * 60 * 60 * 3,
    syncInterval6: 1000 * 60 * 60 * 8,
    syncInterval7: 1000 * 60 * 60 * 24,
    syncInterval8: 1000 * 60 * 60 * 24 * 3,
    syncInterval9: 1000 * 60 * 60 * 24 * 7,
    autoPing: true,
  }
  return v
}
export default createStaff(
  () => [ReactiveStaff],
  ({ mod, line }) => {
    let defaultConfig = createDefaultConfig()
    let a: ConfigType | undefined = undefined
    try {
      a = JSON.parse(localStorage.getItem('app-config') ?? '')
    } catch (error) {}
    function setItem(a: ConfigType) {
      localStorage.setItem('app-config', JSON.stringify(a))
    }
    if (a) {
      //设置默认
      withDefault(a, defaultConfig)
    } else {
      a = defaultConfig
      setItem(a)
    }
    a = line.reactive(a)

    return mod.assignFeat({
      get config(): ConfigType {
        return a
      },

      setConfig(config: Partial<ConfigType>) {
        Object.assign(this.config, config)
        setItem(this.config)
      },
      getConfig() {
        return this.config
      },
    })
  }
)
