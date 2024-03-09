import { createStaff } from '@jumpalong/core'

export default createStaff(line => {
  return line.defineEmit<'notice', [message: string, url: string]>()
})
