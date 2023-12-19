import { DefineSubEventStaff, createStaff } from '../..'

export default createStaff(
  DefineSubEventStaff,
  (factory, timeout = 20 * 1000 * 60) => {
    let line = factory.out()
    line.on('sub', (url, event, subId) => {
      setTimeout(() => {
        line.emitWithOption('desub', [subId, url])
      }, timeout)
    })
    return factory
  }
)
