import { createEmitMockFn, createTestEventTemplate, warpMockFn } from './utils'
import DoNotRepeatStaff from '../src/staff/staffs/eventStaff/DoNotRepeatStaff'

test('DoNotRepeatStaff', () => {
  let mainLine = createTestEventTemplate().add(DoNotRepeatStaff).out()
  // 第一次
  expect(
    warpMockFn(
      mainLine,
      () => {
        mainLine.emitEvent('xx', { id: 'xxx' } as any)
      },
      'event'
    )
  ).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "xx",
          {
            "id": "xxx",
          },
          "local",
        ],
      ],
      "results": [
        {
          "type": "return",
          "value": undefined,
        },
      ],
    }
  `)
  //相同event
  expect(
    warpMockFn(
      mainLine,
      () => {
        mainLine.emitEvent('xx', { id: 'xxx' } as any)
      },
      'event'
    )
  ).toMatchInlineSnapshot(`[MockFunction spy]`)
})
