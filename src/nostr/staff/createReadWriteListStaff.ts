import {
  deserializeTagRToReadWriteList,
  type WritableReadableList,
} from "../tag";
import { type LatestEventStaffFeat } from "./createLatestEventStaff";
import { createStaffFactory, FeatType } from "./Staff";
type ReadWriteListStaff = { feat: ReadWriteListStaffFeat };
export type ReadWriteListStaffFeat = {
  onHasReadWriteList(
    this: FeatType<LatestEventStaffFeat>,
    callback: (
      writableReadableList: WritableReadableList,
      subId?: string
    ) => void
  ): void;
};

export default createStaffFactory<LatestEventStaffFeat>()(
  (): ReadWriteListStaff => {
    return {
      feat: {
        onHasReadWriteList(
          callback: (
            writableReadableList: WritableReadableList,
            subId?: string
          ) => void
        ) {
          this.beltline.feat.onHasLatestEvent((e, subId) => {
            const readWriteList = deserializeTagRToReadWriteList(e.tags);
            callback(readWriteList, subId);
          });
        },
      },
    };
  }
);
