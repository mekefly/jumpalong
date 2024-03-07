import { objectFilter } from '@jumpalong/shared'
import { PriKeyNostrApiImpl } from '../src/nostrApi/PriKeyNostrApiImpl'
import { LoginStaff, createStaff } from '../src/staff'
import { Prikey, verifyEvent } from '../src/utils'
import { createTestEventTemplate } from './utils'

describe('LoginStaff', () => {
  test('base', () => {
    expect(createTestEventTemplate().add(LoginStaff)).toMatchInlineSnapshot(`
      EventLineFactory {
        "core": EventLineEmitter {
          "createEvent": [Function],
          "createEventTemplate": [Function],
          "emitter": LineEmitter {
            "_returnEmitter": null,
            "events": {},
            "isRunMap": Map {},
          },
          "feat": [Circular],
          "getNostrApi": [Function],
          "getPrikeyOrNull": [Function],
          "getPubkey": [Function],
          "getPubkeyOrNull": [Function],
          "logout": [Function],
          "mod": [Circular],
          "nostrApi": NotLoginNostrApiImpl {
            "_pubkey": null,
            "getNostrApi": [Function],
          },
          "nowCreateAt": [Function],
          "setNostrApi": [Function],
          "testAndVerifyNewUser": [Function],
        },
        "id": 0,
        "parent": null,
        "staffNames": Set {
          "login",
          "nostr-api",
        },
        "staffs": Set {
          [Function],
          [Function],
          [Function],
          [Function],
        },
      }
    `)
  })
  test('', async () => {
    let l = createTestEventTemplate().add(LoginStaff).out()
    l.setNostrApi(
      new PriKeyNostrApiImpl(
        Prikey.fromHex(
          '961396f90d32caf70099717d3dc60a4c67fa50ee35392bddbd3acfa736fd2198'
        )
      )
    )
    let event = await l.createEvent({ content: '33', created_at: 1704508914 })
    expect(verifyEvent(event)).toMatchInlineSnapshot(`true`)
    expect(objectFilter(event, 'no:sig')).toMatchInlineSnapshot(`
      {
        "content": "33",
        "created_at": 1704508914,
        "id": "b8e2ea1232faa214deb95335128764fe64e5ee57d947586c231b8ad074b9fa1a",
        "kind": 1,
        "pubkey": "26cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07",
        "tags": [],
      }
    `)
  })
})
