import { EventBeltline } from "./eventBeltline";

import { injectNostrApi } from "./nostr";

import { RelayEmiter } from "./RelayEmiter";

import { RelayPool } from "./RelayPool";

import { RelayConfigurator } from "./relayConfigurator";

export function initializeRuntime() {
  const relayEmiter = new RelayEmiter();
  injectNostrApi({ relayEmiter });

  const relayPool = new RelayPool(relayEmiter, { self: reactive({}) });

  injectNostrApi({ relayPool });

  const rootEventBeltline = new EventBeltline({
    preventCircularReferences: true,
    relayEmiter,
  });

  injectNostrApi({ rootEventBeltline });

  // .addStaf(createLocalStorageStaff())
  // .addStaff(
  //   UseStorageStaff(
  //     [
  //       {
  //         kinds: [1, 42],
  //       },
  //     ],
  //     300
  //   )
  // )
  // .addStaff(
  //   UseStorageStaff(
  //     [
  //       {
  //         kinds: [0, 40, 41],
  //       },
  //     ],
  //     500
  //   )
  // );

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
