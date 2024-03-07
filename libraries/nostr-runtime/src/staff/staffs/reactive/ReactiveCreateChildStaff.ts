import { createStaff } from '../../staff'
import ReactiveStaff from './ReactiveStaff'

export default createStaff(ReactiveStaff, ({ mod, line }) => {
  return line.reactive(mod.createChild())
})
