import {
  EventApiStaff,
  EventByIdApiStaff,
  neventEncodeByEvent,
  toDeCodeNevent,
} from '@/nostr-runtime'
import { useNostrContainerGet } from '../components/NostrContainerProvade'
import { useEventLine } from '../components/ProvideEventLine'
// import { neventEncodeByEvent, toDeCodeNevent } from "../utils/nostr";
import { Event } from 'nostr-tools'

const pushEvent = ref<Event | null>(null)
export function useEvent() {
  const route = useRoute()
  const eventApi = useEventLine(EventByIdApiStaff)
  const value = computed(() => route.params['value'] as string)

  const neventOpt = computed(() => {
    return toDeCodeNevent(value.value)
  })
  const eventId = computed(() => {
    return neventOpt.value?.id
  })

  return computed(() => {
    if (!eventId.value) return null

    if (pushEvent.value?.id === eventId.value) {
      return pushEvent.value
    }

    const line = eventApi.getEventById(eventId.value, {
      urls: new Set(neventOpt.value?.relays),
    })
    return line.getLatestEvent()
  })
}

export function usePushShortTextNote() {
  const router = useRouter()
  return (event: Event | string) => {
    if (typeof event === 'string') {
      router.push({
        name: 'short-text-note',
        params: { value: event },
      })
      return
    }
    // const urls = getSourceUrls(event.id)
    pushEvent.value = event
    router.push({
      name: 'short-text-note',
      params: { value: neventEncodeByEvent(event) },
    })
  }
}
