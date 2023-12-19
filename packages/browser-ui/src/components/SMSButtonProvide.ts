import { createInjection } from "@/utils/use";
import { DropdownOption } from "naive-ui";
import { Event } from "nostr-tools";

export type InsertDropdownOptionOpt = {
  insertKey: string;
  key: string;
  handle: Handle;
  label: string;
};
export type Handle = (event: Event) => void;
export const [provideSMSButtonState, useSMSButton] = createInjection(() => {
  const insertDropdownOptionOptList = ref<InsertDropdownOptionOpt[]>([]);

  return {
    insertDropdownOptionOptList,
    insertDropdownOption(opt: InsertDropdownOptionOpt) {
      insertDropdownOptionOptList.value.push(opt);
    },
    runInsertDropdown(
      dropdownOptionList: DropdownOption[],
      handelMap: Record<string, Handle>
    ) {
      for (const opt of insertDropdownOptionOptList.value) {
        //addMap
        handelMap[opt.key] = opt.handle;
        //addDropdownOpt
        const index = dropdownOptionList.findIndex(
          (value) => value.key === opt.insertKey
        );
        const dropdownOption: DropdownOption = {
          label: opt.label,
          key: opt.key,
        };
        if (index >= 0) {
          dropdownOptionList.splice(index, 0, dropdownOption);
        } else {
          dropdownOptionList.push(dropdownOption);
        }
      }
    },
  };
});
