import { createInjection } from "@/utils/use";
import { Event } from "nostr-tools";

export const [provideCollect, useCollect] = createInjection(() => {
  const show = ref(false);
  const event = ref(null as null | Event);
  return {
    show,
    event,
    collect(_event: Event) {
      show.value = true;
      event.value = _event;
    },
    uncollect(event: Event) {},
  };
});
