import { Event } from "nostr-tools";
import { EventBeltline } from "./eventBeltline";
import { injectNostrApi } from "./nostr";
import { RelayEmiter } from "./RelayEmiter";

export function initializeTesttime(options: any) {
  const relayEmiter = new RelayEmiter();
  injectNostrApi({ relayEmiter });
  const relayPool = {} as any;
  injectNostrApi({ relayPool });

  const rootEventBeltline = new EventBeltline({
    preventCircularReferences: true,
    relayEmiter,
    ...options,
  });
  injectNostrApi({ rootEventBeltline });

  relayEmiter.onEvent(({ subId, event }) => {
    rootEventBeltline.pushEvent(event, subId);
  });

  function testOption() {
    const opt = {
      req: [],
      closeReq: [],
      publish: [],
      close: [],
    };
    ["req", "closeReq", "publish", "close"].forEach((type) => {
      relayEmiter.onRequest(type as any, (v) => {
        (opt as any)[type].push(v);
      });
    });

    return { ...opt };
  }

  function createEvent(e: Partial<Event>): Event {
    return Object.assign(
      {
        id: "",
        content: "",
        created_at: 20,
        kind: 3,
        pubkey: "",
        sig: "",
        tags: [],
      },
      e
    );
  }

  return {
    createEvent,
    relayEmiter,
    relayPool,
    rootEventBeltline,
    testOption,
  };
}
export { injectNostrApi as set };
