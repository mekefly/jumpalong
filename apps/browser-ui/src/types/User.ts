import { Metadata } from "./MetaData";

export interface UserMetaData extends Metadata {
  nip05?: string;
  display_name?: string;
  displayName?: string;
  username?: string;
  banner?: string;
  lud16?: string;
}
