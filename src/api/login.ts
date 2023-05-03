import { injectNostrApi, TYPES } from "@/nostr/nostr";
import {
  getNostrApiMode,
  NostrApiMode,
  PriKeyNostApiImpl,
  setNostrApiMode,
} from "@/nostr/nostrApi/NostrApi";
import { ReplaceableEventSyncAbstract } from "@/nostr/ReplaceableEventSyncAbstract";
import SynchronizerAbstract from "@/nostr/Synchronizer/SynchronizerAbstract";
import { createPrikey } from "@/utils/nostr";
import { Container, inject, injectable } from "inversify";
import { getPublicKey } from "nostr-tools";

export const PRIVATE_KEY = "prikey";
@injectable()
export class LoginApi {
  constructor(
    @inject(TYPES.NostrContainer)
    private container: Container
  ) {}

  loginPrikey(key: string) {
    localStorage.setItem(PRIVATE_KEY, key);
    setNostrApiMode(NostrApiMode.PrivateKey);
    const nostrApi = new PriKeyNostApiImpl(key);
    this.container.rebind(TYPES.NostrApi).toDynamicValue(() => nostrApi);
    injectNostrApi({ nostrApi });
  }

  registerPrikey(prikey: string = createPrikey()) {
    this.loginPrikey(prikey);

    const pubkey = getPublicKey(prikey);
    localStorage.setItem("newUserFlag", pubkey);

    return prikey;
  }

  logout() {
    localStorage.removeItem(PRIVATE_KEY);
    setNostrApiMode(NostrApiMode.NotLogin);

    ReplaceableEventSyncAbstract.clearAll();
    SynchronizerAbstract.clearAll();
    setTimeout(() => {
      location.reload();
    }, 0);
  }

  testAndVerifyNewUser() {
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

  clearNewUserFlag() {
    localStorage.removeItem("newUserFlag");
  }
}
