import { createInjection } from "@/utils/use";
import { Event } from "nostr-tools";

export const [providePapawFocus, usePapawFocusState] = createInjection(
  (event: Ref<Event | null | undefined>) => {
    return { focusEvent: event };
  }
);
