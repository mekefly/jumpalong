import { DefineSubEventStaff, EoseStaff, PoolStaff, createStaff } from '../..'

export default createStaff(
  EoseStaff,
  PoolStaff,
  DefineSubEventStaff,
  factory => {
    let line = factory.out()
    line.on(`eose`, (subId, url) => {
      line.emitWithOption('desub', [subId, url])
    })
    return factory
  }
)
