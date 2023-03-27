import { useInjectScrollbarInstRef } from "../components/Scrollbar";
import { throttle } from "../utils/utils";

import contactConfiguration from "@/api/Contact";

export function useUnlimitedLoad(handleAutoLoadMore: () => void) {
  let lastScrollTop = 0;
  const handleScroll = throttle((event) => {
    const scrollTop = (event?.target as any)?.scrollTop ?? 0;
    if (
      scrollTop &&
      lastScrollTop &&
      lastScrollTop - scrollTop > 0 &&
      scrollTop < 2000
    ) {
      handleAutoLoadMore();
    }
  });
  const scrollbarInstRef = useInjectScrollbarInstRef();
  const _handleScroll = (event: Event) => {
    handleScroll(event);
    lastScrollTop = (event.target as any).scrollTop;
  };
  onMounted(() => {
    scrollbarInstRef?.onScroll(_handleScroll);
  });
  onUnmounted(() => {
    scrollbarInstRef?.removeScrollListener(_handleScroll);
  });
}
export function useAutoScroll(messageList: Ref<Event[]>) {
  const scrollbarInstRef = useInjectScrollbarInstRef();
  const autoToBottom = ref(true);

  const bottomRef = ref<null | HTMLDivElement>(null);
  // const atTheBottom = useElementIntoScreen(bottomRef);

  useEventListener(
    "scroll",
    () => {
      autoToBottom.value = false;
    },
    { once: true }
  );
  watch(
    () => messageList.value.length,
    () => {
      console.log("autoToBottom.value", autoToBottom.value);
      if (autoToBottom.value) {
        setTimeout(() => {
          scrollbarInstRef?.scrollbarInst.value?.scrollTo(999999, 0);
        }, 0);
      }
    }
  );
  // watch(atTheBottom, () => {
  //   if (atTheBottom.value) autoToBottom.value = true;
  // });
  // return { bottomRef };
}

export function useJoinAndLeaveChannelHandle(
  eventId: Ref<string | undefined | null>
) {
  const message = useMessage();
  function handleJoinChannel() {
    if (!eventId.value) return;

    contactConfiguration.joinChannel(eventId.value);

    message.info("已提交加入群聊的请求");
  }
  function handleLeaveChannel() {
    if (!eventId.value) return;

    contactConfiguration.leaveChannel(eventId.value);

    message.info("已经提交了离开群聊的请求");
  }
  return { handleJoinChannel, handleLeaveChannel };
}
