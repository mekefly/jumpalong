import { createInjection } from "@/utils/use";
import { Event } from "nostr-tools";

export const [providePapawFocus, usePapawFocusState] = createInjection(
  (event: Ref<Event | null | undefined>) => {
    const parents = computed(
      () =>
        new Set(
          (
            event.value?.tags.filter(
              (tag) =>
                tag[0] === "e" && tag[1] && (!tag[3] || tag[3] === "reply")
            ) ?? []
          ).map((tag) => tag[1])
        )
    );

    return { focusEvent: event, parents };
  }
);
