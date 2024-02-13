import { PubkeyTag } from "../nostr/tag";
import { UserMetaData } from "../types/User";

export type ContactMetaData = UserMetaData &
  PubkeyTag & {
    name?: string;
    relay?: string;
    pubkey: string;
  };
