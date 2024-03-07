import type { AssignFeat, Emit, EventLine } from '../../../eventLine/EventLine'
import { CreateChildHookStaff, type PauseStaffConfigType } from '..'
import { createStaff } from '../../staff'
import CreateHookStaff from './extends/CreateHookStaff'

export default createStaff(
  () => [CreateChildHookStaff],
  ({ mod, line }) => {
    return mod
      .defineEmit<
        'pause',
        [l: EventLine<Emit<'continue', [name?: string]>>, name?: string]
      >()
      .defineEmit<'continue', [name?: string]>()
      .assignOwnFeat(() => ({
        parseState: true,
      }))
      .assignFeat({
        emitParse(target?: EventLine<{}>, name?: string) {
          console.log('emitParse', (target ?? this).mod.id)

          this.emit(
            { type: 'pause', noPause: true },
            (target ?? this) as any,
            name
          )
        },
        parse(name?: string) {
          this.parseState = true
          this.emitParse(undefined, name)
        },
        emitContinue(name?: string) {
          this.emit({ type: 'continue', noPause: true }, name)
        },
        continue(name?: string) {
          this.parseState = false
          this.emitContinue(name)
        },
        async awaitToRun(): Promise<void> {
          //查看parent有没有暂停的如果暂停了就等待
          if (this.parent?.awaitToRun) {
            await this.parent.awaitToRun()
          }
          //查看当前自己有没有进入暂停状态，如果暂停就等待
          if (this.parseState) {
            return new Promise<void>((resolve, reject) => {
              this.on('continue', () => resolve(), { once: true })
            })
          }
        },
      })
      .inLine(l =>
        l.onCreateChildDep<typeof l>(c => {
          // logger.debug('暂停监听', c.mod.id)
          console.log('暂停坚挺器', c.mod.id, c.parent?.mod.id)

          c.parent?.on('pause', (...rest) => {
            c.emitParse(...rest)
          })
        })
      )
  }
)
