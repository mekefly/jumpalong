import { createInjection } from "@/utils/use";
import { Event } from "nostr-tools";

export const [provideZaps, useZaps] = createInjection(() => {
  const show = ref(false);
  const pubkey = ref<null | string>(null);
  const eventId = ref<null | string>(null);
  return {
    show,
    pubkey,
    eventId,
    rewardByEvent(event: Event) {
      this.reward(event.pubkey, event.id);
    },
    reward(_pubkey: string, _eventId?: string) {
      show.value = true;
      pubkey.value = _pubkey;
      eventId.value = _eventId ?? null;
    },
  };
});
