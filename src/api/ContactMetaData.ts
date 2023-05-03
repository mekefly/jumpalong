import { PubkeyTag } from "@/nostr/tag";
import { UserMetaData } from "./user";

export type ContactMetaData = UserMetaData &
  PubkeyTag & {
    name?: string;
    relay?: string;
    pubkey: string;
  };
