import { objectFilter } from '@jumpalong/shared'
import { WebSocketFactoryStaff, createStaff } from '../src/staff'
import { EventLineFactory } from '../src/eventLine'

describe('webSocket', () => {
  it('addWebSocket', () => {
    expect(
      objectFilter(
        new EventLineFactory().add(WebSocketFactoryStaff),
        'deep',
        'no:emitter'
      )
    ).toMatchInlineSnapshot(`
      {
        "core": {
          "feat": [Circular],
          "mod": [Circular],
          "webSocketFactory": [Function],
        },
        "id": 0,
        "parent": null,
        "staffNames": Set {
          "web-socket-factory",
        },
        "staffs": Set {
          [Function],
        },
      }
    `)

    expect(
      new EventLineFactory().add(WebSocketFactoryStaff).out()[
        'webSocketFactory'
      ]
    ).toMatchInlineSnapshot('[Function]')

    let m1 = new EventLineFactory()
      .add(createStaff('web-socket-factory', l => l))
      .add(WebSocketFactoryStaff)
    //inject
    expect(objectFilter(m1, 'deep', 'no:emitter')).toMatchInlineSnapshot(`
      {
        "core": {
          "feat": [Circular],
          "mod": [Circular],
        },
        "id": 2,
        "parent": null,
        "staffNames": Set {
          "web-socket-factory",
        },
        "staffs": Set {
          [Function],
        },
      }
    `)

    expect(m1.out()['webSocketFactory']).toMatchInlineSnapshot('undefined')
    //检查是否被成功替换了
  })
})
