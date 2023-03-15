import { getEventLineById } from "@/api/event";
import { toDeCodeNevent } from "@/utils/nostr";
import { Event } from "nostr-tools";

const pushEvent = ref<Event | null>(null);
export function useEvent() {
  const route = useRoute();
  const neventObj = computed(() => {
    return toDeCodeNevent(route.params["eventId"] as string);
  });
  const eventId = computed(() => {
    return neventObj.value?.id;
  });

  return computed(() => {
    console.log("useEvent", pushEvent.value?.id, eventId.value);
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
      params: { eventId: event.id },
    });
  };
}
