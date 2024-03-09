import { createStaff, EventLine } from '..'

export default createStaff(({ mod, line }) => {
  return mod.defineEmit<'create', [line: EventLine<{}>]>()
})
