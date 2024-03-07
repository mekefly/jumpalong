import { createStaff } from '../..'

export default createStaff('insertObjectList', ({ mod, line }) => {
  return mod.assignFeat({
    insertObjectList<E extends object>(
      objList: E[],
      value: E,
      getValue: (item: E) => number
    ) {
      objList.push(value)
    },
  })
})
