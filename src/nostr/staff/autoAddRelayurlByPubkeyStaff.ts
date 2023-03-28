import { syncInterval } from "@/utils/utils";
import { createStaff, StaffThisType } from ".";
import { config } from "../nostr";
import createAutomaticRandomRequestStaff, {
  createAutomaticRandomRequestWithEventAutoClose,
} from "./automaticRandomRequestStaff";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import { createLatestEventStaff } from "./createLatestEventStaff";
import createReadWriteListStaff from "./createReadWriteListStaff";
import createTimeoutUnSubStaff from "./createTimeoutUnSubStaff";
import createWithEvent from "./createWithEvent";
import createAddRelayUrlGraspClues from "./pullRelayConfig";
import ReplaceableEventMapStaff from "./ReplaceableEventMapStaff";

export type AddRelayurlByPubkeyStaff = {
  initialization(this: StaffThisType<{}>): void;
};

const relayConfigPrefix = "relayConfig:";

/**
 * 自动添加用户配置的url到生产线，通过用户公钥
 * @param pubkey
 * @returns
 */
export default function autoAddRelayurlByPubkeyStaff(
  pubkey: string,
  opt?: {
    extends?: boolean;
  }
): AddRelayurlByPubkeyStaff {
  return createStaff({
    initialization() {
      const slefBeltline = this.beltline;
      const kind10002line = slefBeltline
        .createChild()
        //10002是用户建议的relay读写列表
        .addFilter({
          kinds: [10002],
          authors: [pubkey],
        })

        .addStaff(createTimeoutUnSubStaff()) // 超时关闭
        .addStaff(createEoseUnSubStaff()) // 自动关闭订阅

        .addStaff(createLatestEventStaff()) //创建最新事件
        .addStaff(ReplaceableEventMapStaff(10002, pubkey)) // 本地缓存
        .addStaff(createReadWriteListStaff()) // 创建读写配置列表
        .addStaff(createWithEvent());

      //间隔同步
      syncInterval(
        `createAddRelayUrlGraspClues:${pubkey}`,
        () => {
          kind10002line.addStaff(createAddRelayUrlGraspClues()); // 根据读写列表获得用户最新的读写列表
        },
        config.syncInterval6
      );

      kind10002line.feat.onHasReadWriteList((readWrite) => {
        slefBeltline.addRelayUrls(readWrite.writeUrl);
      });

      if (kind10002line.feat.withEvent()) {
        return;
      }

      kind10002line.addReadUrl();

      //三秒后没有数据，就使用随机请求来查找数据
      setTimeout(() => {
        if (kind10002line.feat.withEvent()) {
          return;
        }

        kind10002line
          .addStaff(createAutomaticRandomRequestStaff())
          //请求到一条消息就关闭
          .addStaff(createAutomaticRandomRequestWithEventAutoClose());
      }, 3000);

      opt?.extends && this.beltline.addExtends(kind10002line);
    },
  });
}
