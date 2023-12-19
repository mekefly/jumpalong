import ReplaceableEventMap from "@/nostr/eventMap/LocalMap";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { Event } from "nostr-tools";

export function useRecommendEvent() {
  const { error, success, info } = useMessage();

  return function recommendEvent(event: Event) {
    rootEventBeltline.publish(event, relayConfigurator.getWriteList(), {
      onOK({ url, ok }) {
        if (ok) {
          success(`已成功推送到${url}`);
        } else {
          error(`推送到'${url}'失败`);
        }
      },
    });
    info("已经发送推荐用户请求");
  };
}

export function useRecommendUser() {
  const { error, success, info } = useMessage();
  const recommendEvent = useRecommendEvent();

  return function recommendUser(pubkey: string) {
    const e = ReplaceableEventMap.kind10002.get(pubkey);
    if (e) {
      recommendEvent(e);
    } else {
      error("目前还没有此用户的信息");
    }
  };
}

export function useRecommendUserMetadata() {
  const { error, success, info } = useMessage();
  const recommendEvent = useRecommendEvent();

  return function recommendUserMetadata(pubkey: string) {
    const e = ReplaceableEventMap.kind0.get(pubkey);
    if (e) {
      recommendEvent(e);
    } else {
      error("目前还没有此用户的元数据");
    }
  };
}
