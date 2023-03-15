import { createOneEventStaff, createStaff, StaffThisType } from ".";
import { rootEventBeltline } from "../nostr";
import { deserializeTagR } from "../tag";
import autoAddRelayurlByPubkeyStaff from "./autoAddRelayurlByPubkeyStaff";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import createLocalStorageStaff from "./storage/createLocalStorageStaff";

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
  logger.for("autoAddRelayurlByEventIdStaff").debug("eventId", eventId);

  return createStaff({
    initialization() {
      let stop = false;
      const slef = this;
      const line = rootEventBeltline
        .createChild({
          describe: "获取id通过id",
        })
        .addFilter({ ids: [eventId], limit: 1 })
        .addStaff(createEoseUnSubStaff())
        .addStaff(createLocalStorageStaff(1))
        .addStaff(createOneEventStaff());

      line.feat.onHasEventOnce((e) => {
        if (stop) return;
        //tag推荐url
        const urls = deserializeTagR(e.tags);
        slef.beltline.addRelayUrls(urls);

        //用户配置列表推荐读取url
        slef.beltline.addStaff(autoAddRelayurlByPubkeyStaff(e.pubkey));

        stop = true;
      });

      if (stop) return;
      line.addReadUrl(); //当前连接搜索事件
    },
  });
}
