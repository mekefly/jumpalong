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
export const createGetReadWriteListStaff = createStaffFactory<
  ReadWriteListStaffFeat & LatestEventStaffFeat
>()(() => {
  let isRunning = false;
  return {
    feat: {
      getReadWriteList(): WritableReadableList | undefined {
        if (isRunning) return (this as any).readWriteList;
        this.beltline.feat.onHasReadWriteList((readWriteList) => {
          (this as any).readWriteList = readWriteList;
        });
        return (this as any).readWriteList;
      },
    },
  };
});
