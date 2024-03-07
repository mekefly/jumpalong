import replace from '@rollup/plugin-replace'
import { replaceProto } from '../src/utils/vue'

test('replaceProperty', () => {
  class X {}
  class Y extends X {}
  class Z {
    x: number
    constructor() {
      this.x = 1
    }
  }
  // expect(Y.prototype).toMatchInlineSnapshot(`Y {}`)
  // expect(
  //   replaceProto(Y.prototype, Object.prototype, Z.prototype)
  // ).toMatchInlineSnapshot()
  //   (Object.prototype.__proto__ = Object.create(null))
  // expect(
  //   Object.prototype.__proto__).toMatchInlineSnapshot()
})
