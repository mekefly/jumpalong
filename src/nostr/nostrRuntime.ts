import { EventBeltline } from "./eventBeltline";

import { injectNostrApi } from "./nostr";

import { RelayEmiter } from "./RelayEmiter";

import { RelayPool } from "./RelayPool";

import { PRIVATE_KEY } from "@/api/login";
import { injectWindowNostr } from "./injectWindowNostr";
import { getNostrApiMode, NostrApiMode, PriKeyNostApiImpl } from "./NostrApi";
import { RelayConfigurator } from "./relayConfigurator";

export function initializeRuntime() {
  const mode = getNostrApiMode();

  switch (mode) {
    case NostrApiMode.WindowNostr:
      injectWindowNostr();
      break;

    case NostrApiMode.PrivateKey:
      const prikey = localStorage.getItem(PRIVATE_KEY);
      injectNostrApi({ nostrApi: new PriKeyNostApiImpl(prikey ?? undefined) });
      break;

    default:
      break;
  }

  const relayEmiter = new RelayEmiter();
  injectNostrApi({ relayEmiter });

  const relayPool = new RelayPool(relayEmiter, { self: reactive({}) });

  injectNostrApi({ relayPool });

  const rootEventBeltline = new EventBeltline({
    preventCircularReferences: true,
    relayEmiter,
  });

  injectNostrApi({ rootEventBeltline });

  relayEmiter.onEvent(({ subId, event, url }) => {
    rootEventBeltline.pushEvent(event, { subId });
  });

  // /**
  //  * 中继配置器
  //  */
  const relayConfigurator: RelayConfigurator = reactive(
    new RelayConfigurator()
  ) as any;
  rootEventBeltline.relayConfigurator = relayConfigurator;

  injectNostrApi({ relayConfigurator });

  setTimeout(() => {
    relayConfigurator.sync();
  });

  return { relayEmiter, relayPool, rootEventBeltline, relayConfigurator };
}
