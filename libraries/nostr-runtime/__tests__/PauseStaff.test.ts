import { warpMockFn } from './utils'

import { EventLineFactory } from '../src/eventLine'
import { PauseStaff } from '../src/staff'

test('PauseStaff', () => {
  let parentL = new EventLineFactory().add(PauseStaff).out()
  let childL = parentL.createChild()

  // expect(
  //   warpMockFn(parentL, () => {
  //     childL = parentL.createChild()
  //   }).mock.calls.length
  // ).toMatchInlineSnapshot(`1`)
  expect(
    warpMockFn(parentL, () => {
      parentL.parse()
    }).mock.calls.length
  ).toMatchInlineSnapshot(`1`)

  expect(
    warpMockFn(childL, () => {
      parentL.parse()
    }).mock.calls.length
  ).toMatchInlineSnapshot(`0`)
})
