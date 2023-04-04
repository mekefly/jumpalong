import { getEventLineById } from "@/api/event";
import { getSourceUrls } from "@/nostr/staff/createEventSourceTracers";
import { neventEncodeByEvent, toDeCodeNevent } from "@/utils/nostr";
import { Event } from "nostr-tools";

const pushEvent = ref<Event | null>(null);
export function useEvent() {
  const route = useRoute();
  const value = computed(() => route.params["value"] as string);

  const neventOpt = computed(() => {
    return toDeCodeNevent(value.value);
  });
  const eventId = computed(() => {
    return neventOpt.value?.id;
  });

  return computed(() => {
    if (!eventId.value) return null;

    if (pushEvent.value?.id === eventId.value) {
      return pushEvent.value;
    }

    const line = getEventLineById(eventId.value, {
      urls: new Set(neventOpt.value?.relays),
    });
    return line?.feat.useEvent();
  });
}

export function usePushShortTextNote() {
  const router = useRouter();
  return (event: Event | string) => {
    if (typeof event === "string") {
      router.push({
        name: "short-text-note",
        params: { value: event },
      });
      return;
    }
    const urls = getSourceUrls(event.id);
    pushEvent.value = event;
    router.push({
      name: "short-text-note",
      params: { value: neventEncodeByEvent(event, urls) },
    });
  };
}
