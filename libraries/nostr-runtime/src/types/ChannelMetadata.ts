/**
 * https://github.com/nostr-protocol/nips/blob/master/28.md
 */

import { Metadata } from './Metadata'

export interface ChannelMetadata extends Metadata {
  relayUrls?: string[]
}
