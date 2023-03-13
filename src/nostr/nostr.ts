import { EventBeltline } from "./eventBeltline";
import { RelayEmiter } from "./RelayEmiter";
import { RelayPool } from "./RelayPool";

export function initializeCore() {
  const relayEmiter = new RelayEmiter();
  const relayPool = new RelayPool();
  const eventBeltline = new EventBeltline({
    preventCircularReferences: true,
    relayEmiter,
  });
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
    eventBeltline.pushEvent(event, subId);
  });

  return { relayEmiter, relayPool, eventBeltline };
}
export const { relayEmiter, relayPool, eventBeltline } = initializeCore();
