import { Metadata } from "./MetaData";

export type ContactConfigurationType = Record<string, ContactMetaData>;

export interface ContactMetaData extends Metadata {
  name: string;
  relayUrl: string;
  pubkey: string;
}
