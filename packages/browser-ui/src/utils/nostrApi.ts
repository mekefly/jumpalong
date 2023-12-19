import { nostrApi } from "@/nostr/nostr";
import { getNostrApiMode, NostrApiMode } from "@/nostr/nostrApi/NostrApiMode";
import { PriKeyNostApiImpl } from "@/nostr/nostrApi/PriKeyNostApiImpl";
import { nip19, UnsignedEvent } from "nostr-tools";
import { pushToLogin } from "./login";

export async function signEvent(
  event: UnsignedEvent,
  opt?: { intercept: boolean }
) {
  try {
    return await nostrApi.signEvent(event);
  } catch (error) {
    if (getNostrApiMode() === NostrApiMode.NotLogin) {
      if (opt?.intercept) {
        pushToLogin();
      }
    }

    throw error;
  }
}
export async function getPrikeyOrNull() {
  if (getNostrApiMode() === NostrApiMode.PrivateKey) {
    try {
      return nip19.nsecEncode((nostrApi as PriKeyNostApiImpl).getPrikey());
    } catch (error) {}
  }
  return null;
}
export async function getPubkeyOrNull(opt?: { intercept: boolean }) {
  try {
    return await nostrApi.getPublicKey();
  } catch (error) {
    opt?.intercept && pushToLogin();
    return null;
  }
}
