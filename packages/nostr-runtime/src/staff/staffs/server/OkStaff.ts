import { createStaff } from '../../staff'

export default createStaff(line => {
  return line.defineEmit<
    'ok' | `ok:${string}`,
    [eventId: string, { ok: boolean; message: string; url: string }]
  >()
})
