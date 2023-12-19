import { getPubkeyOrNull, signEvent } from '@/utils/nostrApiUse'
import * as secp256k1 from '@noble/secp256k1'
import { Event, getEventHash, nip19, UnsignedEvent } from 'nostr-tools'
import { getSourceUrls } from './staff/createEventSourceTracers'
import { deserializeTagR, getOnlyTag } from './tag'

export function validateEvent(event: Event): boolean {
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
export function verifySignature(event: Event & { sig: string }): boolean {
  return secp256k1.schnorr.verifySync(
    event.sig,
    getEventHash(event),
    event.pubkey
  )
}

export function createEventTemplate(options: Partial<Event>) {
  return Object.assign(
    {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: '',
    },
    options
  )
}
export async function createEvent(options: Partial<Event>): Promise<Event> {
  const pubkey = await getPubkeyOrNull({ intercept: true })

  let event: UnsignedEvent & Partial<Event> = Object.assign(
    {
      kind: 1,
      pubkey: pubkey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: '',
    },
    options
  )

  event.id = getEventHash(event)

  event = await signEvent(JSON.parse(JSON.stringify(event)), {
    intercept: true,
  })

  return event as Event
}

export function createAddress(event: Event) {
  const identifierTag = getOnlyTag('d', event.tags)

  if (!(identifierTag && identifierTag[1])) {
    return
  }
  const urls = deserializeTagR(event.tags)
  const sourceUrls = getSourceUrls(event.id)
  return nip19.naddrEncode({
    identifier: identifierTag[1],
    pubkey: event.pubkey,
    kind: event.kind,
    relays: [...urls, ...(sourceUrls ?? [])],
  })
}
