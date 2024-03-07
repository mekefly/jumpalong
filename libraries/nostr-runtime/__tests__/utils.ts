import '@jumpalong/logger'

import { cached } from '@jumpalong/shared'
import { EventLine, EventLineFactory } from '../src/eventLine'
import { createStaff } from '../src/staff/staff'
import { EventStaff, LoginStaff, type PoolStaff } from '../src/staff'
import { PriKeyNostrApiImpl } from '../src/nostrApi/PriKeyNostrApiImpl'
import { Prikey } from '../src/utils'
import { Event } from 'nostr-tools'
import { Mock } from 'vitest'

export function createTestEventTemplate() {
  let mod = new EventLineFactory()
  return mod
    .add(
      createStaff(({ mod, line }) => {
        return mod.defineEmit<'emit', [...rest: any[]]>().add(MockPoolStaff)
      })
    )
    .add(MockPoolStaff)
}
let id = 0
export const MockCreateId = createStaff('create-id', line =>
  line.defineFeat('createId', () => 'subId' + id++)
)
export const MockNoCreateAt = createStaff('now-create-at', ({ mod, line }) => {
  return mod.assignFeat({
    nowCreateAt: () => {
      return Math.floor(Date.now() / 1000)
    },
    mockNowCreateAt(number: number) {
      this.nowCreateAt = () => {
        return number
      }
    },
  })
})

export function createDate(str: string) {
  return Math.floor(new Date(str).getTime() / 1000)
}
export function dateToString(n: number) {
  let date = new Date(n * 1000)
  return `` + date.toLocaleString()
}
export const MockNostrApi = createStaff(LoginStaff, ({ mod, line }) => {
  let api = new PriKeyNostrApiImpl(
    Prikey.fromHex(
      '961396f90d32caf70099717d3dc60a4c67fa50ee35392bddbd3acfa736fd2198'
    )
  )
  api.signEvent = e => {
    let _e = e as any as Event
    ;(_e as any).sig = 'siged'
    return _e as any
  }
  line.setNostrApi(api)
  return mod.assignFeat({ mockApi: api })
})
export const MockEvent = createStaff(MockNostrApi, ({ mod, line }) => {
  let id = 0
  return mod.add(EventStaff).assignFeat({
    async mockEvent(event: Partial<Event>, subId: string, url: string) {
      //模拟中继返回内容
      const e1 = await line.createEventTemplate(event)
      e1.id = 'mockid:' + id++
      e1.sig = 'mocksiged:' + id++
      this.emitEvent(subId, e1 as Event, url)
    },
  })
})
export function createEmitMockFn<T extends {}>(l: EventLine<T>, type = 'emit') {
  let mockFn = vi.fn()
  l.on(type as any, mockFn)
  return mockFn
}
export function warpMockFn<T extends {}, R>(
  l: EventLine<T>,
  fn: () => R,
  type = 'emit'
): R extends Promise<any> ? Promise<Mock<any, any>> : Mock<any, any> {
  let mockfn = createEmitMockFn(l, type)
  let t = fn() as any
  if (t && t.then) {
    return t.then(() => {
      l.removeListener(type as any, mockfn)
      return mockfn
    })
  } else {
    l.removeListener(type as any, mockfn)
    return mockfn as any
  }
}

export const MockPoolStaff = createStaff('pool-staff', mod =>
  mod.assignFeat({
    relayPool: {
      getLine: cached(() => {
        return (mod.line as EventLine<{}>).createChild().add(MockEvent)
      }),
    },
  })
)
