import { createStaff, StaffThisType } from ".";
import createAutomaticRandomRequestStaff from "./automaticRandomRequestStaff";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import { createLatestEventStaff } from "./createLatestEventStaff";
import createReadWriteListStaff from "./createReadWriteListStaff";
import createAddRelayUrlGraspClues from "./pullRelayConfig";
import createLocalStorageStaff from "./storage/createLocalStorageStaff";

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
        .addStaff(createLocalStorageStaff(1)) // 本地缓存
        .addStaff(createLatestEventStaff()) //创建最新事件
        .addStaff(createEoseUnSubStaff()) // 自动关闭订阅
        .addStaff(createReadWriteListStaff()) // 创建读写配置列表
        .addStaff(createAddRelayUrlGraspClues()); // 根据读写列表获得用户最新的读写列表

      kind10002line.feat.onHasReadWriteList((readWrite) => {
        slefBeltline.addRelayUrls(readWrite.writeUrl);
      });

      //请求到至少一次metadata
      if (kind10002line.feat.isHas()) {
        return;
      }
      kind10002line.addReadUrl();
      //如果两秒后还没获取到需要的数据，就会自动扫描中继
      const kind10002line1 = kind10002line.addStaff(
        createAutomaticRandomRequestStaff()
      );

      //请求到至少一次metadata
      kind10002line1.feat.onHasLatestEventOnce(() => {
        kind10002line1.feat.stopAutomaticRandomRequestStaff();
      });

      opt?.extends && this.beltline.addExtends(kind10002line);
    },
  });
}
