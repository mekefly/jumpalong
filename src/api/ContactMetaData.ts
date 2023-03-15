import { PubkeyTag } from "@/nostr/tag";
import { UserMetaData } from "./user";

export interface ContactMetaData extends UserMetaData, PubkeyTag {
  name?: string;
  relay?: string;
  pubkey: string;
}
