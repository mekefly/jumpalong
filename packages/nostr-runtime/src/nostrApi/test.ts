import { type Nip04 } from "@/types/Nip04";
import { type NostrApi } from "@/types/NostrApi";
import { createEventTemplate } from "@/utils/nostr";
import { type ApiListType } from "./apiNameList";

export function testNostr(
  _withNameApi: ApiListType,
  nostr: Partial<NostrApi> | undefined
) {
  if (!nostr) return;

  _withNameApi.push("nostr");

  if (!nostr.getPublicKey) {
    return;
  }

  try {
    nostr.getPublicKey().then((pubkey) => {
      _withNameApi.push("getPublicKey");

      testNip04(nostr.nip04, _withNameApi, pubkey);
      testSignEvent(pubkey, _withNameApi, nostr);
    });
  } catch (error) {}

  if (nostr.getRelays) {
    try {
      nostr.getRelays().then(() => {
        _withNameApi.push("getRelays");
      });
    } catch (error) {}
  }
}
export function testSignEvent(
  pubkey: string,
  _withNameApi: ApiListType,
  nostr: Partial<NostrApi>
) {
  if (nostr.signEvent) {
    try {
      nostr
        .signEvent(
          createEventTemplate({
            kind: 1,
            content: "33",
            pubkey,
          })
        )
        .then(() => {
          _withNameApi.push("signEvent");
        });
    } catch (error) {}
  }
}
async function testNip04(
  nip04: Partial<Nip04> | undefined,
  _withNameApi: ApiListType,
  pubkey: string
) {
  if (!nip04) return;
  try {
    _withNameApi.push("nip04");

    //加密
    if (!nip04.encrypt) {
      return;
    }
    const testText = "test";
    const plaintext = await nip04.encrypt(pubkey, testText);
    _withNameApi.push("nip04.encrypt");

    //解秘
    if (!nip04.decrypt) {
      return;
    }
    const text = await nip04.decrypt(pubkey, plaintext);

    if (text !== testText) {
      return;
    }
    _withNameApi.push("nip04.decrypt");
  } catch (error) {}
}
