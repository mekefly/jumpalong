import { useInjectScrollbarInstRef } from "../components/Scrollbar";

import { useNostrContainer } from "@/components/NostrContainerProvade";
import { TYPES } from "@/nostr/nostr";
import { Event } from "nostr-tools";

export function useAutoScroll(messageList: Ref<Event[]>) {
  const scrollbarInstRef = useInjectScrollbarInstRef();
  const autoToBottom = ref(true);

  const stopAutoToScrollBottom = () => {
    autoToBottom.value = false;
  };
  for (const item of ["scroll", "touchmove"] as const) {
    useEventListener(
      scrollbarInstRef?.containerRef,
      item,
      stopAutoToScrollBottom,
      {
        once: true,
      }
    );
  }

  const stopWatch = watch(
    () => messageList.value?.length,
    () => {
      if (autoToBottom.value) {
        scrollbarInstRef?.scrollbarInst.value?.scrollBy({
          top: 99999,
          behavior: "smooth",
        });
      } else {
        stopWatch();
      }
    }
  );
}

export function useJoinAndLeaveChannelHandle(
  eventId: Ref<string | undefined | null>
) {
  const nostrContainer = useNostrContainer();
  const message = useMessage();

  function getFollowChannel() {
    return nostrContainer.get(TYPES.FollowChannelSynchronizer);
  }
  function handleJoinChannel() {
    if (!eventId.value) return;

    getFollowChannel().joinChannel(eventId.value);

    message.info("已提交加入群聊的请求");
  }
  function handleLeaveChannel() {
    if (!eventId.value) return;

    getFollowChannel().leaveChannel(eventId.value);

    message.info("已经提交了离开群聊的请求");
  }
  return { handleJoinChannel, handleLeaveChannel };
}
