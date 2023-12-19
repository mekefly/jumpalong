import { EventLineFactory } from '@jumpalong/nostr-runtime'
import { InsertObjectListStaffConfigType, createStaff } from '../..'
import { reverseSearchInsertOnObjectList } from '@jumpalong/shared'

let staff = createStaff('insertObjectList', ({ mod, line }) => {
  return mod.assignFeat({
    insertObjectList<E extends object>(
      objList: E[],
      value: E,
      getValue: (item: E) => number
    ) {
      let index = reverseSearchInsertOnObjectList(objList, value, getValue)
      objList.splice(index, 0, value)
    },
  }) as any as EventLineFactory<InsertObjectListStaffConfigType>
})
export default staff
