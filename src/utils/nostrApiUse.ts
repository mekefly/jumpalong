import { t } from "@/i18n";
import { nostrApi } from "@/nostr/nostr";
import {
  getNostrApiMode,
  NostrApiMode,
  NotFoundError,
  PriKeyNostApiImpl,
} from "@/nostr/NostrApi";
import router from "@/router";
import { nip19, UnsignedEvent } from "nostr-tools";

export function usePubkey(opt?: { intercept: boolean }) {
  const pubkey = ref<string | undefined>(undefined);
  const dialogApi = useDialog();
  async function getPubkey() {
    try {
      pubkey.value = await nostrApi.getPublicKey();
    } catch (error) {
      if (error instanceof NotFoundError) {
        dialogApi.error({
          title: t("error"),
          content:
            "您当前使用插件授权登录,但是并没有找到此api,你需要检查登录插件是否安装",
          positiveText: t("yes"),
          onPositiveClick: () => {},
        });
      }

      dialogApi.error({
        title: t("error"),
        content: String(error),
        positiveText: t("yes"),
        onPositiveClick: () => {},
      });
      opt?.intercept && pushToLogin();
    }
  }
  getPubkey();
  return pubkey;
}
export async function getPubkeyOrNull(opt?: { intercept: boolean }) {
  try {
    return await nostrApi.getPublicKey();
  } catch (error) {
    opt?.intercept && pushToLogin();
    return null;
  }
}
export function usePrikey() {
  const prikey = ref<string | null>(null);
  getPrikeyOrNull().then((item) => {
    prikey.value = item;
  });
  return prikey;
}
export async function getPrikeyOrNull() {
  if (getNostrApiMode() === NostrApiMode.PrivateKey) {
    try {
      return nip19.nsecEncode((nostrApi as PriKeyNostApiImpl).getPrikey());
    } catch (error) {}
  }
  return null;
}
export async function signEvent(
  event: UnsignedEvent,
  opt?: { intercept: boolean }
) {
  try {
    return nostrApi.signEvent(event);
  } catch (error) {
    if (opt?.intercept) {
      pushToLogin();
    }
    throw error;
  }
}
export function pushToLogin(
  redirected: string = router.currentRoute.value.fullPath
) {
  router.push({ name: "login", query: { redirected } });
}
