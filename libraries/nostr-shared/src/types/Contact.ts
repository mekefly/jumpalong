import { Metadata } from './Metadata'

export type ContactConfigurationType = Record<string, ContactMetaData>

export interface ContactMetaData extends Metadata {
  name: string
  relayUrl: string
  pubkey: string
}
