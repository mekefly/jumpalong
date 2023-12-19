import { EventLineFactory } from '@jumpalong/nostr-runtime'
import { searchInsertOnObjectList } from '@jumpalong/shared'
import { InsertObjectListStaffConfigType, createStaff } from '../..'

let staff = createStaff('insertObjectList', ({ mod, line }) => {
  return mod.assignFeat({
    insertObjectList<E extends object>(
      objList: E[],
      value: E,
      getValue: (item: E) => number
    ) {
      let index = searchInsertOnObjectList(objList, value, getValue)
      objList.splice(index, 0, value)
    },
  }) as any as EventLineFactory<InsertObjectListStaffConfigType>
})
export default staff
