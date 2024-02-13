import { createStaff } from '../..'

export default createStaff('now-create-at', ({ mod, line }) => {
  return mod.assignFeat({
    nowCreateAt() {
      return Math.floor(Date.now() / 1000)
    },
  })
})
