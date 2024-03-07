import { searchInsertOnObjectList } from "@/utils/utils";
import { createStaff } from "../Staff1";

export default createStaff((line) => {
  line.setToPush((line, event, eventList) => {
    const searchInsert = searchInsertOnObjectList(
      eventList,
      event.created_at,
      (item) => item.created_at
    );
    eventList.splice(searchInsert, 0, event);
  });
});
