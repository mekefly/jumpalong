import { createStaff } from '@jumpalong/core'

type url = string
export default createStaff(line => {
  return line.defineEmit<`relay-closed:${url}`>()
})
