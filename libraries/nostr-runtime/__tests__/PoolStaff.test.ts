import { objectFilter } from '@jumpalong/shared'
import { EventLineFactory, PoolStaff } from '../src'
import { createStaff } from '../src/staff/staff'

it('add pool', () => {
  let m1 = new EventLineFactory()
    .add(createStaff('web-socket-factory', l => l))
    .add(PoolStaff)
  expect(objectFilter(m1, 'deep', 'no:emitter')).toMatchInlineSnapshot(`
    {
      "core": {
        "allSubIds": Set {},
        "closeRelay": [Function],
        "createId": [Function],
        "createRelay": [Function],
        "emitEvent": [Function],
        "feat": [Circular],
        "getPool": [Function],
        "getRelay": [Function],
        "getRelayFromPool": [Function],
        "listen": [Function],
        "mod": [Circular],
        "pool": {},
        "publish": [Function],
        "publishes": [Function],
        "sub": [Function],
        "subs": [Function],
      },
      "id": 0,
      "parent": null,
      "staffNames": Set {
        "web-socket-factory",
        "pool-staff",
        "create-id",
      },
      "staffs": Set {
        [Function],
        [Function],
        [Function],
        [Function],
        [Function],
        [Function],
        [Function],
        [Function],
        [Function],
        [Function],
        [Function],
      },
    }
  `)
})

it('add pool', async () => {
  let m1 = new EventLineFactory()
    .add(
      createStaff(
        'web-socket-factory',
        l => (
          l.assignFeat({
            async webSocketFactory() {
              return {}
            },
          }),
          l
        )
      )
    )
    .add(PoolStaff)
    .out()
  expect(objectFilter(await m1.createRelay('xxx'), 'deep', 'no:line'))
    .toMatchInlineSnapshot(`
    {
      "isClose": false,
      "publishIds": Set {},
      "subIds": Set {},
      "timeout": undefined,
      "ws": {
        "onclose": [Function],
        "onerror": [Function],
        "onmessage": [Function],
      },
    }
  `)
})
