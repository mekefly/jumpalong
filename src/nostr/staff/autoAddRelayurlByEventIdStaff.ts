import { syncInterval } from "@/utils/utils";
import { createOneEventStaff, createStaff, StaffThisType } from ".";
import { rootEventBeltline } from "../nostr";
import { deserializeTagR } from "../tag";
import autoAddRelayurlByPubkeyStaff from "./autoAddRelayurlByPubkeyStaff";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import createTimeoutUnSubStaff from "./createTimeoutUnSubStaff";
import createWithEvent from "./createWithEvent";
import getCacheStaff from "./storage/getCacheStaff";

export type AddRelayurlByEventIdStaff = {
  initialization(this: StaffThisType<{}>): void;
};

/**
 * 自动添加url到生产线通过事件id
 * @param eventId
 * @returns
 */
export default function autoAddRelayurlByEventIdStaff(
  eventId: string
): AddRelayurlByEventIdStaff {
  return createStaff({
    initialization() {
      let stop = false;
      const slef = this;
      const line = rootEventBeltline
        .createChild({
          describe: "获取id通过id",
        })
        .addFilter({ ids: [eventId], limit: 1 })
        .addStaff(createOneEventStaff())
        .addStaff(createWithEvent())
        .addFilter({ ids: [eventId], limit: 1 })
        .addStaff(createEoseUnSubStaff())
        .addStaff(createTimeoutUnSubStaff());

      line.feat.onHasEventOnce((e) => {
        if (stop) return;
        //tag推荐url
        const urls = deserializeTagR(e.tags);
        slef.beltline.addRelayUrls(urls);

        //用户配置列表推荐读取url
        slef.beltline.addStaff(autoAddRelayurlByPubkeyStaff(e.pubkey));

        stop = true;
      });

      line.addStaff(getCacheStaff(eventId));
      if (line.feat.withEvent()) return;
      line.addExtends(rootEventBeltline);
      if (line.feat.withEvent()) return;

      const req = () => {
        if (line.feat.withEvent()) return;

        line.addReadUrl();
      };

      syncInterval(`getEventLineById:${eventId}`, () => {
        req();
      });
    },
  });
}
