import { EventBeltline } from "./eventBeltline";
import { injectNostrApi } from "./nostr";
import { RelayConfigurator } from "./relayConfigurator";
import { RelayEmiter } from "./RelayEmiter";
import { RelayPool } from "./RelayPool";

export function initializeRuntime() {
  const relayEmiter = new RelayEmiter();
  injectNostrApi({ relayEmiter });
  console.log("initializeRuntime");

  const relayPool = new RelayPool(relayEmiter, { self: reactive({}) });

  injectNostrApi({ relayPool });

  const rootEventBeltline = new EventBeltline({
    preventCircularReferences: true,
    relayEmiter,
  });

  injectNostrApi({ rootEventBeltline });

  // .addStaff(createLocalStorageStaff())
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

  relayEmiter.onEvent(({ subId, event }) => {
    rootEventBeltline.pushEvent(event, subId);
  });

  /**
   * 中继配置器
   */
  const relayConfigurator: RelayConfigurator = reactive(
    new RelayConfigurator()
  ) as any;
  rootEventBeltline.relayConfigurator = relayConfigurator;

  relayConfigurator.sync();
  injectNostrApi({ relayConfigurator });

  return { relayEmiter, relayPool, rootEventBeltline, relayConfigurator };
}
