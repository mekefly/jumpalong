// import { createEventTemplate } from "./utils/nostr";
import { type ApiListType } from './apiNameList'
import { nowSecondTimestamp } from '@jumpalong/shared'
import type { WindowNostr, WindowNip04, NostrApi } from '.'
import { Pubkey } from '..'

export function testWindowNostr(
  _withNameApi: ApiListType,
  nostr: Partial<WindowNostr> | undefined
) {
  if (!nostr) return

  _withNameApi.push('nostr')

  if (!nostr.getPublicKey) {
    return
  }

  try {
    testWindowNostrSignEvent(_withNameApi, nostr)
  } catch (error) {}
  try {
    nostr.getPublicKey().then(pubkey => {
      _withNameApi.push('getPublicKey')

      testWindowNip04(nostr.nip04, _withNameApi, pubkey)
    })
  } catch (error) {}

  if (nostr.getRelays) {
    try {
      nostr.getRelays().then(() => {
        _withNameApi.push('getRelays')
      })
    } catch (error) {}
  }
}
export function testWindowNostrSignEvent(
  _withNameApi: ApiListType,
  nostr: Partial<WindowNostr>
) {
  if (nostr.signEvent) {
    try {
      nostr
        .signEvent({
          kind: 1,
          tags: [],
          content: 'test content',
          created_at: nowSecondTimestamp(),
        })
        .then(() => {
          _withNameApi.push('signEvent')
        })
    } catch (error) {}
  }
}
async function testWindowNip04(
  nip04: Partial<WindowNip04> | undefined,
  _withNameApi: ApiListType,
  pubkey: string
) {
  if (!nip04) return
  try {
    _withNameApi.push('nip04')

    //加密
    if (!nip04.encrypt) {
      return
    }
    const testText = 'test'
    const plaintext = await nip04.encrypt(pubkey, testText)
    _withNameApi.push('nip04.encrypt')

    //解秘
    if (!nip04.decrypt) {
      return
    }
    const text = await nip04.decrypt(pubkey, plaintext)

    if (text !== testText) {
      return
    }
    _withNameApi.push('nip04.decrypt')
  } catch (error) {}
}

export function testNostrApi(_withNameApi: ApiListType, nostr: NostrApi) {
  if (!nostr) return

  _withNameApi.push('nostr')

  if (!nostr.getPublicKey) {
    return
  }

  try {
    nostr.getPublicKey().then(pubkey => {
      _withNameApi.push('getPublicKey')

      testNip04(nostr, _withNameApi, pubkey)
      testNostrApiSignEvent(_withNameApi, nostr)
    })
  } catch (error) {}

  if (nostr.getRelays) {
    try {
      nostr.getRelays().then(
        () => {
          _withNameApi.push('getRelays')
        },
        () => {}
      )
    } catch (error) {}
  }
}
export function testNostrApiSignEvent(
  _withNameApi: ApiListType,
  nostr: Partial<NostrApi>
) {
  if (nostr.signEvent) {
    try {
      nostr
        .signEvent({
          kind: 1,
          tags: [],
          content: 'test content',
          created_at: nowSecondTimestamp(),
        })
        .then(() => {
          _withNameApi.push('signEvent')
        })
    } catch (error) {}
  }
}
export async function testNip04(
  nip04: Partial<NostrApi> | undefined,
  _withNameApi: ApiListType,
  pubkey: Pubkey
) {
  if (!nip04) return
  try {
    _withNameApi.push('nip04')

    //加密
    if (!nip04.encrypt) {
      return
    }
    const testText = 'test'
    const plaintext = await nip04.encrypt(pubkey, testText)
    _withNameApi.push('nip04.encrypt')

    console.log('plaintext', plaintext)
    //解秘
    if (!nip04.decrypt) {
      return
    }
    const text = await nip04.decrypt(pubkey, plaintext)
    console.log('test', text)

    if (text !== testText) {
      return
    }
    _withNameApi.push('nip04.decrypt')
  } catch (error) {
    logger.error(error)
  }
}
