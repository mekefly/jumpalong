import '@jumpalong/logger'
import {} from './utils'
import { EventLineFactory } from '../src/eventLine'
import { CreateChildHookStaff } from '../src/staff'

test('CreateChildHookStaff', () => {
  let line = new EventLineFactory().out()

  let vf1 = vi.fn()

  line.add(CreateChildHookStaff).onCreateChildDep(vf1)

  expect(vf1.mock.calls.length).toMatchInlineSnapshot(`1`)
  line.createChild().createChild()
  expect(vf1.mock.calls.length).toMatchInlineSnapshot(`1`)
})
