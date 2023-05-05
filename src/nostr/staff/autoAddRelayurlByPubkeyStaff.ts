import { useCache } from "@/utils/cache";
import { debounce, syncInterval } from "@/utils/utils";
import { createStaff, StaffThisType } from ".";
import { config } from "../nostr";
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
          const urlsLine = slefBeltline.createChild();
          const mergeRequestLine = urlsLine
            .createChild()
            .addStaff(createTimeoutUnSubStaff()) // 超时关闭
            .addStaff(createEoseUnSubStaff()) // 自动关闭订阅
            .addStaff(createDoNotRepeatStaff()); //不重复;

          //10002是用户建议的relay读写列表
          const kind10002 = mergeRequestLine
            .createChild()
            .addStaff(createLatestEventStaff()) //创建最新事件
            .addStaff(ReplaceableEventMapStaff(10002, pubkey)) // 本地缓存
            .addStaff(createReadWriteListStaff()) // 创建读写配置列表
            .addStaff(createWithEvent())

            //合并请求
            .onAddFilters((filters) => {
              mergeRequestLine.addFilters(filters);
            })
            .addFilter({
              kinds: [10002],
              authors: [pubkey],
            })
            .addExtends(mergeRequestLine);

          kind10002.feat.onHasReadWriteList((readWrite) => {
            urlsLine.addRelayUrls(readWrite.writeUrl);
          });

          //查找kind2url
          const kind2line = mergeRequestLine
            .createChild()
            .addStaff({
              push(e) {
                urlsLine.addRelayUrl(e.content);
              },
            })

            //合并请求
            .onAddFilters((filters) => {
              mergeRequestLine.addFilters(filters);
            })
            .addFilter({ kinds: [2], authors: [pubkey] })
            .addExtends(mergeRequestLine);

          //间隔同步
          syncInterval(
            `createAddRelayUrlGraspClues:${pubkey}`,
            () => {
              mergeRequestLine.addRelayUrls(urlsLine.getRelayUrls());

              const debounceOnAddRelayUrls = debounce((urls: Set<string>) => {
                mergeRequestLine.addRelayUrls(urls);
              }, 1000);
              urlsLine.onAddRelayUrlsAfter(debounceOnAddRelayUrls);
            },
            config.syncInterval6
          );

          const req = async () => {
            if (kind10002.feat.withEvent()) return;

            mergeRequestLine.addExtends(slefBeltline.getRoot());
            if (kind10002.feat.withEvent()) return;

            if (opts?.urls) {
              mergeRequestLine.addRelayUrls(opts.urls);
              if (await kind10002.feat.timeoutWithEvent()) return;
            }

            mergeRequestLine.addReadUrl();

            if (await kind10002.feat.timeoutWithEvent()) return;

            //随缘算法
            kind10002
              .addStaff(createAutomaticRandomRequestStaff())
              //请求到一条消息就关闭
              .addStaff(createAutomaticRandomRequestWithEventAutoClose());
          };
          req();

          return urlsLine;
        },
        { useLocalStorage: false }
      );

      slefBeltline.addRelayUrls(line.getRelayUrls());
      const debounceOnAddRelayUrls = debounce((urls: Set<string>) => {
        slefBeltline.addRelayUrls(urls);
      }, 1000);
      line.onAddRelayUrlsAfter(debounceOnAddRelayUrls);

      //更新读写列表
    },
  });
}
