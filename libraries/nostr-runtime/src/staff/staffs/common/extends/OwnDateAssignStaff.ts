import { createStaff } from '../../../staff'
import CreateChildEmitStaff from './CreateChildEmitStaff'

export default createStaff(CreateChildEmitStaff, ({ mod, line }) => {
  return mod
})
