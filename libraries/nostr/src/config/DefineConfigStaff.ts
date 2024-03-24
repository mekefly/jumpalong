import {
  AssignFeat,
  createStaff,
  EventLine,
  EventLineConfig,
  EventLineMod,
} from '@jumpalong/core'
import { ReactiveStaff } from '../staffExport'

export default createStaff(
  () => [ReactiveStaff],
  ({ mod, line }) => {
    return mod
      .assignFeat({
        config: line.reactive({}),
      })
      .assignFn({
        defineConfig<C, ThisConfig extends EventLineConfig>(
          this: EventLine<ThisConfig>,
          config: C
        ): EventLine<
          AssignFeat<{
            config: C
          }> &
            ThisConfig
        > {
          Object.assign(this.config, config)
          return this as any
        },
        assignConfig<
          C extends ThisConfig['feat'] extends { config: infer C } ? C : {},
          ThisConfig extends EventLineConfig
        >(this: EventLine<ThisConfig>, config: Partial<C>) {
          Object.assign(this.config, config)
        },
      })
  }
)
