import { debounce } from "@/utils/utils";
import { WritableReadableList } from "../tag";
import { LatestEventStaffFeat } from "./createLatestEventStaff";
import { ReadWriteListStaffFeat } from "./createReadWriteListStaff";
import { createStaffFactory, StaffThisType } from "./Staff";

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
>()((): AddRelayGraspClues => {
  return {
    initialization() {
      //监听得到url的事件
      const debounceFunction = debounce(
        (readWriteList: WritableReadableList) => {
          //请注意这里的this是initialization的this = 主生产线，而不是子生产线line
          this.beltline.addRelayUrls(readWriteList.readUrl);

          //不会重复调用那些已经请求过的连接
          //从获取到的用户写列表获取更新的读写列表
          this.beltline.addRelayUrls(readWriteList.writeUrl);
        },
        1_000
      );
      // (debounceFunction);
      this.beltline.feat.onHasReadWriteList(debounceFunction);
    },
  };
});
