import { injectNostrApi } from "@/nostr/nostr";
import {
  getNostrApiMode,
  NostrApiMode,
  PriKeyNostApiImpl,
  setNostrApiMode,
} from "@/nostr/NostrApi";
import { ReplaceableEventSyncAbstract } from "@/nostr/ReplaceableEventSyncAbstract";
import SynchronizerAbstract from "@/nostr/Synchronizer/SynchronizerAbstract";
import { generatePrivateKey, getPublicKey } from "nostr-tools";

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
  loginPrikey(prikey);

  const pubkey = getPublicKey(prikey);
  localStorage.setItem("newUserFlag", pubkey);

  return prikey;
}
export function logout() {
  localStorage.removeItem(PRIVATE_KEY);
  setNostrApiMode(NostrApiMode.NotLogin);

  ReplaceableEventSyncAbstract.clearAll();
  SynchronizerAbstract.clearAll();
  setTimeout(() => {
    location.reload();
  }, 0);
}

export function testAndVerifyNewUser() {
  const newUserFlagPubkey = localStorage.getItem("newUserFlag");
  const currentPrikey = localStorage.getItem("prikey");
  const currentPubkey = currentPrikey && getPublicKey(currentPrikey);

  if (
    getNostrApiMode() === NostrApiMode.PrivateKey &&
    newUserFlagPubkey &&
    newUserFlagPubkey === currentPubkey
  ) {
    return true;
  } else {
    return false;
  }
}
export function clearNewUserFlag() {
  localStorage.removeItem("newUserFlag");
}
