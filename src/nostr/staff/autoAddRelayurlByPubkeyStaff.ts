import { useCache } from "@/utils/cache";
import { syncInterval } from "@/utils/utils";
import { createStaff, StaffThisType } from ".";
import { config, rootEventBeltline } from "../nostr";
import createAutomaticRandomRequestStaff, {
  createAutomaticRandomRequestWithEventAutoClose,
} from "./automaticRandomRequestStaff";
import { createDoNotRepeatStaff } from "./createDoNotRepeatStaff";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import { createLatestEventStaff } from "./createLatestEventStaff";
import createReadWriteListStaff from "./createReadWriteListStaff";
import createTimeoutUnSubStaff from "./createTimeoutUnSubStaff";
import createWithEvent from "./createWithEvent";
import ReplaceableEventMapStaff from "./ReplaceableEventMapStaff";

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
  opts?: {
    extends?: boolean;
    urls?: Set<string>;
  }
): AddRelayurlByPubkeyStaff {
  return createStaff({
    initialization() {
      const slefBeltline = this.beltline;
      const line = useCache(
        `autoAddRelayurlByPubkey:${pubkey}`,
        () => {
          const line = slefBeltline.createChild();
          const autoAddReqLine = line
            .createChild()
            .addStaff(createTimeoutUnSubStaff()) // 超时关闭
            .addStaff(createEoseUnSubStaff()) // 自动关闭订阅
            .addStaff(createDoNotRepeatStaff()); //不重复;

          const kind10002 = autoAddReqLine
            .createChild()
            //10002是用户建议的relay读写列表
            .addFilter({
              kinds: [10002],
              authors: [pubkey],
            })

            .addStaff(createLatestEventStaff()) //创建最新事件
            .addStaff(ReplaceableEventMapStaff(10002, pubkey)) // 本地缓存
            .addStaff(createReadWriteListStaff()) // 创建读写配置列表
            .addStaff(createWithEvent())
            .onAddFilters((filters) => {
              autoAddReqLine.addFilters(filters);
            });

          kind10002.feat.onHasReadWriteList((readWrite) => {
            line.addRelayUrls(readWrite.writeUrl);
          });

          //间隔同步
          syncInterval(
            `createAddRelayUrlGraspClues:${pubkey}`,
            () => {
              autoAddReqLine.addRelayUrls(line.getRelayUrls());
              line.onAddRelayUrlsAfter((urls) => {
                autoAddReqLine.addRelayUrls(urls);
              });
            },
            config.syncInterval6
          );

          const kind2line = autoAddReqLine
            .createChild()
            .addFilter({ kinds: [2], authors: [pubkey] })

            .onAddFilters((filters) => {
              autoAddReqLine.addFilters(filters);
            })
            .addStaff({
              push(e) {
                line.addRelayUrl(e.content);
              },
            });

          const req = async () => {
            if (kind10002.feat.withEvent()) return;

            autoAddReqLine.addExtends(rootEventBeltline);
            if (kind10002.feat.withEvent()) return;

            if (opts?.urls) {
              autoAddReqLine.addRelayUrls(opts.urls);
              if (await kind10002.feat.timeoutWithEvent()) return;
            }

            autoAddReqLine.addReadUrl();
            if (await kind10002.feat.timeoutWithEvent()) return;

            //随缘算法
            kind10002
              .addStaff(createAutomaticRandomRequestStaff())
              //请求到一条消息就关闭
              .addStaff(createAutomaticRandomRequestWithEventAutoClose());
          };
          req();

          return line;
        },
        { useLocalStorage: false }
      );
      line.onAddRelayUrlsAfter((urls) => {
        slefBeltline.addRelayUrls(urls);
      });

      //更新读写列表
    },
  });
}
