import { t } from "@/i18n";
import { nostrApi } from "@/nostr/nostr";
import { NotFoundNostrApiError } from "@/nostr/nostrApi/error";
import { getNostrApiMode, NostrApiMode } from "@/nostr/nostrApi/NostrApiMode";
import { useCache } from "./cache";
import { pushToLogin } from "./login";
import { getPrikeyOrNull } from "./nostrApi";

export function usePubkey(opt?: { intercept: boolean }) {
  return useCache(
    "usePubkey",
    () => {
      const pubkey = ref<string | undefined>(undefined);
      const dialogApi = useDialog();
      async function getPubkey() {
        try {
          pubkey.value = await nostrApi.getPublicKey();
        } catch (error) {
          const mode = getNostrApiMode();
          if (
            error instanceof NotFoundNostrApiError &&
            mode === NostrApiMode.WindowNostr
          ) {
            dialogApi.error({
              title: t("error"),
              content:
                "您当前使用插件授权登录,但是并没有找到此api,你需要检查登录插件是否安装",
              positiveText: t("yes"),
              onPositiveClick: () => {},
            });
          } else if (mode !== NostrApiMode.NotLogin) {
            dialogApi.error({
              title: t("error"),
              content: String(error),
              positiveText: t("yes"),
              onPositiveClick: () => {},
            });
          }

          opt?.intercept && pushToLogin();
        }
      }
      getPubkey();
      return pubkey;
    },
    {
      duration: 10 * 1000,
      useLocalStorage: false,
    }
  );
}
export function usePrikey() {
  const prikey = ref<string | null>(null);
  getPrikeyOrNull().then((item) => {
    prikey.value = item;
  });
  return prikey;
}
