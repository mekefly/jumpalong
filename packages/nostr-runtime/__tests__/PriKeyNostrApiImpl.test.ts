import '@jumpalong/logger'

import { bytesToHex } from '@noble/hashes/utils'
import crypto from 'node:crypto'
import { generateSecretKey, getPublicKey, nip04 } from 'nostr-tools'
import { Prikey } from '../src/utils'
import { PriKeyNostrApiImpl } from '../src/nostrApi/PriKeyNostrApiImpl'
try {
  // @ts-ignore
  // eslint-disable-next-line no-undef
  globalThis.crypto = crypto
} catch (err) {
  /***/
}

test('desc', async () => {
  let sk1 = generateSecretKey()
  let sk2 = generateSecretKey()
  let pk1 = getPublicKey(sk1)
  let pk2 = getPublicKey(sk2)

  let ciphertext = await nip04.encrypt(bytesToHex(sk1), pk2, 'hello')

  expect(await nip04.decrypt(bytesToHex(sk2), pk1, ciphertext)).toEqual('hello')
})
test('desc', async () => {
  let sk1 = generateSecretKey()
  let pk1 = getPublicKey(sk1)

  let ciphertext = await nip04.encrypt(bytesToHex(sk1), pk1, 'hello')

  expect(await nip04.decrypt(bytesToHex(sk1), pk1, ciphertext)).toEqual('hello')
})

test('desc', async () => {
  let sk1 = Prikey.fromHex(
    '2b49500527c57a853854f660abe8f2d323fde96e83e7b06a17969afc4202e8e4'
  )
  let pk1 = sk1.getPubkey()

  let ciphertext = await nip04.encrypt(sk1, pk1.toHex(), 'hello')
  let ciphertext1 = await nip04.encrypt(sk1, pk1.toHex(), 'hello')
  expect(ciphertext === ciphertext1).toMatchInlineSnapshot(`false`)

  expect(await nip04.decrypt(sk1, pk1.toHex(), ciphertext1)).toEqual('hello')
  expect(await nip04.decrypt(sk1, pk1.toHex(), ciphertext)).toEqual('hello')
})
test('PriKeyNostrApiImpl', async () => {
  let sk1 = Prikey.fromHex(
    '2b49500527c57a853854f660abe8f2d323fde96e83e7b06a17969afc4202e8e4'
  )
  let pk1 = sk1.getPubkey()
  let api = new PriKeyNostrApiImpl(sk1)

  let ciphertext = await api.encrypt(pk1, 'hello')

  expect(await api.decrypt(pk1, ciphertext)).toMatchInlineSnapshot(`"hello"`)
})

// test('PriKeyNostrApiImpl', async () => {
//   let sk1 = Prikey.fromHex(
//     '2b49500527c57a853854f660abe8f2d323fde96e83e7b06a17969afc4202e8e4'
//   )
//   let pk1 = sk1.getPubkey()
//   let api = new PriKeyNostrApiImpl(sk1)

//   let ciphertext = await api.encrypt(pk1, 'hello')

//   expect(await api.decrypt(pk1, ciphertext)).toMatchInlineSnapshot(`"hello"`)
// })
