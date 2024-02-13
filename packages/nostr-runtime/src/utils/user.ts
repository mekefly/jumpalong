import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { schnorr } from '@noble/curves/secp256k1'
import { Hex } from './event'
import { nip19 } from 'nostr-tools'
import { decodeToPrikey } from './nostr'
export function generatePrivateKey() {
  return bytesToHex(generateSecretKey())
}
export function getPubkey(privKey: Prikey) {
  return new Pubkey(schnorr.getPublicKey(privKey))
}
export function getPubkeyBytes(privKey: Hex) {
  return schnorr.getPublicKey(privKey)
}
export { generateSecretKey }

export class Key extends Uint8Array {
  static fromHex(hex: string) {
    return new Key(hexToBytes(hex))
  }
  static fromUint8Array(uint8: Uint8Array) {
    return new Key(uint8)
  }
  constructor(hex: string | Uint8Array) {
    super(typeof hex === 'string' ? hexToBytes(hex) : hex)
  }

  // cache
  private _hex: null | string = null
  toHex() {
    return this._hex || (this._hex = bytesToHex(this))
  }
  toString(): string {
    return this.toHex()
  }
}
export class Prikey extends Key {
  static create(): Prikey {
    return new Prikey(generateSecretKey())
  }
  static fromHex(hex: string) {
    return new Prikey(hexToBytes(hex))
  }
  static fromString(anyPrikey: string): null | Prikey {
    return decodeToPrikey(anyPrikey)
  }
  static fromUint8Array(uint8: Uint8Array) {
    return new Prikey(uint8)
  }
  private _pubkey: Pubkey | null = null
  getPubkey() {
    return this._pubkey || (this._pubkey = Pubkey.fromHex(getPublicKey(this)))
  }
  getNsec() {
    return nip19.nsecEncode(this)
  }
}
export class Pubkey extends Key {
  static fromPrikey(prikey: Prikey) {
    return prikey.getPubkey()
  }
  static fromHex(hex: string) {
    return new Pubkey(hexToBytes(hex))
  }
  static fromUint8Array(uint8: Uint8Array) {
    return new Pubkey(uint8)
  }
  static fromMaybeHex(hex: string | Pubkey) {
    if (typeof hex === 'string') {
      return Pubkey.fromHex(hex)
    } else {
      return hex
    }
  }
  relays: string[] = []
  getNpub() {
    return nip19.npubEncode(this.toHex())
  }
  toNpub() {
    return this.getNpub()
  }
  toNprofile(relays?: string[]) {
    nip19.nprofileEncode({
      pubkey: this.toHex(),
      relays: relays && this.relays,
    })
  }
}
