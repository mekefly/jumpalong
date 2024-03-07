import { createStaff } from '../../..'
import CreateChildEmitStaff from './CreateChildEmitStaff'

export default createStaff(CreateChildEmitStaff, ({ mod, line }) => {
  line.on('create-child', (parent, child) => {})
  return mod
})
