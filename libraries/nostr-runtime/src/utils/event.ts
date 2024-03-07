import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { schnorr } from '@noble/curves/secp256k1'
import {
  Event,
  EventTemplate,
  UnsignedEvent,
  VerifiedEvent,
  getEventHash,
  nip19,
  verifiedSymbol,
} from 'nostr-tools'
import { Prikey, getPubkey } from './user'
import { Metadata } from '../types/Metadata'
import { deserializeTagR, getOnlyTag } from '..'

export type Bytes = Uint8Array
export type Hex = Bytes | string
export type PrivKey = Hex | bigint

export { bytesToHex, hexToBytes }
export function sign(event: UnsignedEvent, prikey: Prikey | Hex) {
  return schnorr.sign(getEventHash(event), prikey)
}
export function finalizeEvent(t: EventTemplate, prikey: Prikey): VerifiedEvent {
  const event = t as VerifiedEvent
  event.pubkey = getPubkey(prikey).toString()
  event.id = getEventHash(event)
  event.sig = bytesToHex(sign(event as UnsignedEvent, prikey))
  event[verifiedSymbol] = true
  return event
}
const isRecord = (obj: unknown): obj is Record<string, unknown> =>
  obj instanceof Object
export function validateEvent<T>(event: T): event is T & UnsignedEvent {
  if (!isRecord(event)) return false
  if (typeof event.kind !== 'number') return false
  if (typeof event.content !== 'string') return false
  if (typeof event.created_at !== 'number') return false
  if (typeof event.pubkey !== 'string') return false
  if (!event.pubkey.match(/^[a-f0-9]{64}$/)) return false

  if (!Array.isArray(event.tags)) return false
  for (let i = 0; i < event.tags.length; i++) {
    let tag = event.tags[i]
    if (!Array.isArray(tag)) return false
    for (let j = 0; j < tag.length; j++) {
      if (typeof tag[j] === 'object') return false
    }
  }

  return true
}
export function verifyEvent(event: Event): event is VerifiedEvent {
  if (typeof event[verifiedSymbol] === 'boolean') return event[verifiedSymbol]

  const hash = getEventHash(event)
  if (hash !== event.id) {
    event[verifiedSymbol] = false
    return false
  }

  try {
    const valid = schnorr.verify(event.sig, hash, event.pubkey)
    event[verifiedSymbol] = valid
    return valid
  } catch (err) {
    event[verifiedSymbol] = false
    return false
  }
}
export function parseMetadata<M extends Metadata>(e: Event): M {
  console.log('e.content', e)
  console.log('e.content', e.content)

  try {
    return JSON.parse(e.content)
  } catch (error) {
    return {} as any
  }
}
export function createAddress(event: Event) {
  const identifierTag = getOnlyTag('d', event.tags)

  if (!(identifierTag && identifierTag[1])) {
    return
  }
  const urls = deserializeTagR(event.tags)
  // const sourceUrls = getSourceUrls(event.id)
  return nip19.naddrEncode({
    identifier: identifierTag[1],
    pubkey: event.pubkey,
    kind: event.kind,
    relays: [...urls],
  })
}
