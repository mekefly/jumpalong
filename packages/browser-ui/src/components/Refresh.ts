import { t } from "@/i18n";
import { EventBeltline } from "@/nostr/eventBeltline";
import { RefreshLoadStaffFeat } from "@/nostr/staff/createRefreshLoadStaff";
import { createInjection } from "@/utils/use";
import { MaybeRef } from "@vueuse/core";
import EventEmitter from "events";
import { autoSetLoadBuffer } from "./LoadProgress";

export const [provideRefreshState, useRefreshState] = createInjection(() => {
  const eventEmiter = new EventEmitter();
  type Type = "refresh" | "load";
  const listenerList: any[] = [];
  onUnmounted(() => {
    eventEmiter.removeAllListeners();
  });
  return {
    on(type: Type, listener: () => void) {
      listenerList.push(listener);
      eventEmiter.on(type, listener);

      return () => this.removeListener(type, listener);
    },
    emit(type: Type) {
      eventEmiter.emit(type);
    },
    removeListener(type: Type, listener: () => void) {
      eventEmiter.removeListener(type, listener);
    },
  };
});
export function useLoad(
  beltline: ComputedRef<EventBeltline<RefreshLoadStaffFeat> | undefined | null>,
  active: MaybeRef<boolean | undefined>
) {
  const message = useMessage();

  //加载进度条
  autoSetLoadBuffer(beltline);
  //监听加载事件
  const refreshState = useRefreshState();

  refreshState?.on("load", () => {
    if (!unref(active)) {
      return;
    }

    load();
  });
  refreshState?.on("refresh", () => {
    if (!unref(active)) {
      return;
    }
    refresh();
  });
  function load() {
    beltline.value?.feat.load();
    message.info(t("loading"));
  }
  function refresh() {
    beltline.value?.feat.refresh();
    message.info(t("refreshing"));
  }
  return { load, refresh };
}
