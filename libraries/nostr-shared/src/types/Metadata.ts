export interface Metadata {
  name?: string
  about?: string
  picture?: string
}

export interface UserMetadata extends Metadata {
  nip05?: string

  display_name?: string
  displayName?: string

  username?: string
  banner?: string
  lud16?: string
}

/**
 * https://github.com/nostr-protocol/nips/blob/master/28.md
 */
export interface ChannelMetadata extends Metadata {
  relays?: string[]
}

export interface ContactMetadata extends Metadata {
  name: string
  relayUrl: string
  pubkey: string
}
