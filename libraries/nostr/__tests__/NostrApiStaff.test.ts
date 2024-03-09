import { EventLineFactory } from '../src/eventLine'
import { NostrApiStaff } from '../src/staff'
import { createTestEventTemplate } from './utils'

test('NostrApiStaff', () => {
  expect(createTestEventTemplate().add(NostrApiStaff)).toMatchInlineSnapshot(`
    EventLineFactory {
      "core": EventLineEmitter {
        "emitter": LineEmitter {
          "_returnEmitter": null,
          "events": {},
          "isRunMap": Map {},
        },
        "feat": [Circular],
        "getNostrApi": [Function],
        "mod": [Circular],
        "nostrApi": NotLoginNostrApiImpl {
          "getNostrApi": [Function],
        },
        "setNostrApi": [Function],
      },
      "id": 0,
      "parent": null,
      "staffNames": Set {
        "nostr-api",
      },
      "staffs": Set {
        [Function],
        [Function],
      },
    }
  `)
})
