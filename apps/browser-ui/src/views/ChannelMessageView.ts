import { Synchronizer } from '@/nostr-runtime'
import { useEventLine } from '../components/ProvideEventLine'
import { useInjectScrollbarInstRef } from '../components/Scrollbar'
import { Event } from 'nostr-tools'

export function useAutoScroll(messageList: Ref<Event[]>) {
  const scrollbarInstRef = useInjectScrollbarInstRef()
  const autoToBottom = ref(true)

  const stopAutoToScrollBottom = () => {
    autoToBottom.value = false
  }
  for (const item of ['scroll', 'touchmove'] as const) {
    useEventListener(
      scrollbarInstRef?.containerRef,
      item,
      stopAutoToScrollBottom,
      {
        once: true,
      }
    )
  }

  const stopWatch = watch(
    () => messageList.value?.length,
    () => {
      if (autoToBottom.value) {
        scrollbarInstRef?.scrollbarInst.value?.scrollBy({
          top: 99999,
          behavior: 'smooth',
        })
      } else {
        stopWatch()
      }
    }
  )
}

export function useJoinAndLeaveChannelHandle(
  eventId: Ref<string | undefined | null>
) {
  const message = useMessage()
  let line = useEventLine(Synchronizer.ListSynchronizerManager.Staff)
  let channelList =
    line.listSynchronizerManager.getInitStandardListSynchronizer(
      Synchronizer.ListEnum.PublicChats
    )

  function handleJoinChannel() {
    if (!eventId.value) return

    channelList.add({ type: 'e', value: { id: eventId.value } })

    message.info('已提交加入群聊的请求')
  }
  function handleLeaveChannel() {
    if (!eventId.value) return

    channelList.delete({ type: 'e', value: { id: eventId.value } })

    message.info('已经提交了离开群聊的请求')
  }
  return { handleJoinChannel, handleLeaveChannel }
}
