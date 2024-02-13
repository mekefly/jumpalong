import { createStaff } from '../../..'
import CreateChildStaff from './CreateChildEmitStaff'

export default createStaff(CreateChildStaff, ({ mod, line }) => {
  mod.line.on('create-child', (parent, child) => {
    child
  })
  return mod
})
