import { createStaff, StaffThisType } from ".";

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
      const slef = this;
      // const line = getEventLineById(eventId);
      // line.feat.onHasEventOnce((e) => {
      //   console.log("onHasEventOnce");

      //   //tag推荐url
      //   const urls = deserializeTagR(e.tags);
      //   slef.beltline.addRelayUrls(urls);

      //   //用户配置列表推荐读取url
      //   slef.beltline.addStaff(autoAddRelayurlByPubkeyStaff(e.pubkey));
      // });
    },
  });
}
