import { createStaff } from '../..'

export default createStaff('now-create-at', mod =>
  mod.assignFn({
    nowCreateAt() {
      return Math.floor(Date.now() / 1000)
    },
  })
)
