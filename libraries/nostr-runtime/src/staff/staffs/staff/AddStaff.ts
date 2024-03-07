import { createStaff } from '../..'

export default createStaff(line => {
  return line.assignFeat({
    addStaff: line.add.bind(line)
  })
})
