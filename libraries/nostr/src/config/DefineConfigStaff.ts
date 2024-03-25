import {
  AssignFeat,
  createStaff,
  EventLine,
  EventLineConfig,
} from '@jumpalong/core'
import { ReactiveStaff } from '../staffExport'
import { PathMap } from '@jumpalong/shared'

const key = 'app-config'
export default createStaff(
  () => [ReactiveStaff],
  ({ mod, line }) => {
    let localConfig: Record<string, any> | undefined = undefined
    try {
      let str = localStorage.getItem(key)
      if (str) {
        localConfig = JSON.parse(str)
      }
    } catch (error) {}

    function setConfig(a: Record<string, any>) {
      localStorage.setItem(key, JSON.stringify(a))
    }
    const config = line.reactive((localConfig as {}) ?? {})

    type GetConfigTypeByLineConfig<ThisConfig extends EventLineConfig> =
      ThisConfig['feat'] extends {
        config: infer C
      }
        ? C
        : {}

    return mod
      .assignFeat({
        config,
        setting: line.reactive(new PathMap<SettingOptions>()),
      })
      .assignFn({
        getConfig: function <
          Config extends GetConfigTypeByLineConfig<ThisConfig>,
          ThisConfig extends EventLineConfig
        >(this: EventLine<ThisConfig>): Config {
          return this.config
        },
        defineConfig: function <
          Value,
          ConfigName extends string,
          ThisConfig extends EventLineConfig
        >(
          this: EventLine<ThisConfig>,
          configName: ConfigName,
          defaultConfigValue: Value,
          opts?: SettingOptions
        ): DefineConfigReturnType<ConfigName, Value, ThisConfig> {
          this.defineSetting(configName, opts)
          if (defaultConfigValue === undefined) return this as any

          // 如果 this.config 中已经存在指定 configName 的配置项
          // opts && this.setting.set(configName, { configName, ...opts })
          if (this.config[configName] === undefined) {
            // 将默认配置值赋值给 this.config 中指定 configName 的配置项
            this.config[configName] = defaultConfigValue

            // 调用 setItem 方法更新配置项
            setConfig(this.config)
            return this as any
          }

          // 返回当前实例
          return this as any
        },
        defineSetting<
          ConfigName extends string,
          ThisConfig extends EventLineConfig
        >(
          this: EventLine<ThisConfig>,
          configName: ConfigName,
          opts?: SettingOptions
        ): EventLine<ThisConfig> {
          // 合并配置参数
          const setting = { configName, ...opts }

          // 如果存在 opts 且 setting.path 不为空
          if (opts && setting.path) {
            // 将 setting 保存到 this.setting 中指定路径下
            ;(this.setting as PathMap<SettingOptions>).setValue(
              setting.path,
              setting
            )
          }

          return this
        },
        assignConfig: function <
          C extends ThisConfig['feat'] extends { config: infer C } ? C : {},
          ThisConfig extends EventLineConfig
        >(this: EventLine<ThisConfig>, config: Partial<C>) {
          console.log('config', config)

          Object.assign(this.config, config)
          console.log('this.config', this.config)

          setConfig(this.config)
        },
      })
  }
)

type DefineConfigReturnType<
  ConfigName extends string,
  Value,
  ThisConfig extends EventLineConfig
> = EventLine<
  AssignFeat<{
    config: {
      [key in ConfigName]: Value
    }
  }> &
    ThisConfig
>

export type SettingOptions = {
  //默认为根目录
  path?: string
  //默认根据configValue的类型自动判断
  configName?: string
  //默认根据configName自动生成
  i18n?: string
  displayType?: //文本输入框
  | 'string'
    //数字编辑框
    | 'number'
    // 范围拖动条
    | 'range'
    // 布耳按钮
    | 'boolean'
    //线
    | 'line'
    //不可编辑的一段文字
    | 'text'
    // 跳转连接
    | 'router-push'
    | 'dialog'
    | 'setting-path'
  description?: string

  //当displayType为range|number时，可以指定范围,输出超出范围将自动修正
  range?: [min: number, max: number]
  //当displayType为range|number时，可以指定步长
  step?: number
  //排序，默认按字母排序
  order?: number
  settingPath?: string
  text?: string
  url?: string
  routerPush?:
    | string
    | {
        name?: string
        path?: string
        params?: Record<string, any>
        query?: Record<string, any>
      }
  dialogOptions?: {
    title?: string
    type?: 'warning' | 'info' | 'success' | 'error'
    content?: string
    positiveText?: string
    negativeText?: string
    onPositiveClick?: () => void
    onNegativeClick?: () => void
  }
}
