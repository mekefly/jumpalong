import { debounce, syncInterval } from "@/utils/utils";
import { config } from "../nostr";
import { type WritableReadableList } from "../tag";
import { type LatestEventStaffFeat } from "./createLatestEventStaff";
import { type ReadWriteListStaffFeat } from "./createReadWriteListStaff";
import { createStaffFactory, type StaffThisType } from "./Staff";

type AddRelayGraspClues = {
  initialization(
    this: StaffThisType<ReadWriteListStaffFeat & LatestEventStaffFeat>
  ): void;
};

/**
 * 添加线索更新
 */
export default createStaffFactory<
  ReadWriteListStaffFeat & LatestEventStaffFeat
>()((opts?: { write?: boolean; read?: boolean }): AddRelayGraspClues => {
  return {
    initialization() {
      //监听得到url的事件
      syncInterval(
        this.beltline.getFilters(),
        () => {
          const debounceFunction = debounce(
            (readWriteList: WritableReadableList) => {
              //请注意这里的this是initialization的this = 主生产线，而不是子生产线line
              (opts?.read ?? true) &&
                this.beltline.addRelayUrls(readWriteList.readUrl);

              //不会重复调用那些已经请求过的连接
              //从获取到的用户写列表获取更新的读写列表
              (opts?.write ?? true) &&
                this.beltline.addRelayUrls(readWriteList.writeUrl);
            },
            config.pullRelayConfig.debounce
          );
          // (debounceFunction);
          this.beltline.feat.onHasReadWriteList(debounceFunction);
        },
        config.pullRelayConfig.interval
      );
    },
  };
});
