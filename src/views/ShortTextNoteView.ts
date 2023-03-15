import { getEventLineById } from "@/api/event";
import { neventEncodeByEvent, toDeCodeNevent } from "@/utils/nostr";
import { Event } from "nostr-tools";

const pushEvent = ref<Event | null>(null);
export function useEvent() {
  const route = useRoute();
  const value = computed(() => route.params["eventId"] as string);

  const neventOpt = computed(() => {
    return toDeCodeNevent(value.value);
  });
  const eventId = computed(() => {
    console.debug("neventOpt", neventOpt.value);

    return neventOpt.value?.id;
  });

  return computed(() => {
    if (!eventId.value) return null;

    if (pushEvent.value?.id === eventId.value) {
      return pushEvent.value;
    }

    const line = getEventLineById(eventId.value);
    return line?.feat.useEvent();
  });
}

export function usePushShortTextNote() {
  const router = useRouter();
  return (event: Event) => {
    pushEvent.value = event;
    router.push({
      name: "short-text-note",
      params: { eventId: neventEncodeByEvent(event) },
    });
  };
}
