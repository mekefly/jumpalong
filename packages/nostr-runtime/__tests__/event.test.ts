import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { validateEvent } from '../src/utils'

import { getPublicKey } from 'nostr-tools'

test('validateEvent', () => {
  expect(
    validateEvent({
      kind: 1,
      tags: [],
      content: '33',
      created_at: 1704507269,
      pubkey:
        '0326cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07',
    })
  ).toMatchInlineSnapshot(`false`)
})
test('getPublicKey(privKey)', () => {
  expect(
    getPublicKey(
      hexToBytes(
        '961396f90d32caf70099717d3dc60a4c67fa50ee35392bddbd3acfa736fd2198'
      )
    )
  ).toMatchInlineSnapshot(
    `"26cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07"`
  )
})
