import { useInjectScrollbarInstRef } from "../components/Scrollbar";

import { getFollowChannelConfiguration } from "@/nostr/FollowChannel";
import { Event } from "nostr-tools";

export function useAutoScroll(messageList: Ref<Event[]>) {
  const scrollbarInstRef = useInjectScrollbarInstRef();
  const autoToBottom = ref(true);

  const l = useEventListener(
    scrollbarInstRef?.containerRef,
    "scroll",
    () => {
      autoToBottom.value = false;
      l();
    },
    { once: true }
  );
  const w = watch(
    () => messageList.value?.length,
    () => {
      if (autoToBottom.value) {
        setTimeout(() => {
          scrollbarInstRef?.scrollbarInst.value?.scrollBy({
            top: 99999,
            behavior: "smooth",
          });
        }, 0);
      } else {
        w();
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

    getFollowChannelConfiguration().joinChannel(eventId.value);

    message.info("已提交加入群聊的请求");
  }
  function handleLeaveChannel() {
    if (!eventId.value) return;

    getFollowChannelConfiguration().leaveChannel(eventId.value);

    message.info("已经提交了离开群聊的请求");
  }
  return { handleJoinChannel, handleLeaveChannel };
}
