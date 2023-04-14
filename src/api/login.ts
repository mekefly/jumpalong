import { injectNostrApi } from "@/nostr/nostr";
import {
  NostrApiMode,
  PriKeyNostApiImpl,
  setNostrApiMode,
} from "@/nostr/NostrApi";
import { ReplaceableEventSyncAbstract } from "@/nostr/ReplaceableEventSyncAbstract";
import { generatePrivateKey } from "nostr-tools";

export const PRIVATE_KEY = "prikey";

export function createPrikey() {
  return generatePrivateKey();
}
export function loginPrikey(key: string) {
  localStorage.setItem(PRIVATE_KEY, key);
  setNostrApiMode(NostrApiMode.PrivateKey);
  injectNostrApi({ nostrApi: new PriKeyNostApiImpl(key) });
}
export function registerPrikey(prikey: string = createPrikey()) {
  localStorage.setItem("newUserFlag", prikey);
  loginPrikey(prikey);

  return prikey;
}
export function logout() {
  localStorage.removeItem(PRIVATE_KEY);
  setNostrApiMode(NostrApiMode.NotLogin);

  ReplaceableEventSyncAbstract.clearAll();
  location.reload();
}

export function testAndVerifyNewUser() {
  const prikey = localStorage.getItem("newUserFlag");
  const currentPrikey = localStorage.getItem("prikey");
  if (prikey && prikey === currentPrikey) {
    return true;
  } else {
    return false;
  }
}
