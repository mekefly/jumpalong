/**
 * https://github.com/nostr-protocol/nips/blob/master/28.md
 */

import { Metadata } from "./MetaData";

export interface ChannelMetadata extends Metadata {
  relayUrls?: string[];
  display_name?: string;
  displayName?: string;
  username?: string;
  banner?: string;
}
