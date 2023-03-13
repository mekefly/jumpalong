import { createStaff, StaffThisType } from ".";
import root from "../eventBeltline";
import createAutomaticRandomRequestStaff from "./automaticRandomRequestStaff";
import createAddRelayUrlGraspClues from "./createAddRelayUrlGraspClues";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import { createLatestEventStaff } from "./createLatestEventStaff";
import createReadWriteListStaff from "./createReadWriteListStaff";

export type AddRelayurlByPubkeyStaff = {
  initialization(this: StaffThisType<{}>): void;
};

/**
 * 自动添加用户配置的url到生产线，通过用户公钥
 * @param pubkey
 * @returns
 */
export default function autoAddRelayurlByPubkeyStaff(
  pubkey: string,
  opt?: {}
): AddRelayurlByPubkeyStaff {
  return createStaff({
    initialization() {
      console.log("autoAddRelayurlByPubkeyStaff:initialization");

      const slefBeltline = this.beltline;
      const kind10002line = slefBeltline
        .createChild({
          addExtendsFromParent: false,
          addExtendsFormRoot: true,
        })
        //10002是用户建议的relay读写列表
        .addFilter({
          kinds: [10002],
          authors: [pubkey],
        })
        .addStaff(createLatestEventStaff())
        .addStaff(createEoseUnSubStaff())
        .addStaff(createReadWriteListStaff())
        .addStaff(createAddRelayUrlGraspClues())
        .addExtends(root);

      kind10002line.feat.onHasReadWriteList((readWrite) => {
        slefBeltline.addRelayUrls(readWrite.writeUrl);
      });

      setTimeout(() => {
        //缓存返回true，认为是有效的缓存，在一段时间内只允许请求一次

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
      }, 100);
    },
  });
}
