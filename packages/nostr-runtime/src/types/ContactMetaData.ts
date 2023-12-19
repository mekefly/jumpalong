import { PubkeyTag } from '../event/tag'
import { UserMetaData } from './User'

export type ContactMetaData = UserMetaData &
  PubkeyTag & {
    name?: string
    relay?: string
    pubkey: string
  }
