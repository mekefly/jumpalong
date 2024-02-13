// import { DefineSubEventStaff } from "../src/staff/staffs"
import { createStaff } from '../src/staff'
import DefineSubEventStaff from '../src/staff/staffs/sub/DefineSubEventStaff'
import { MockCreateId, createTestEventTemplate } from './utils'

describe('DefineSubEventStaff', () => {
  let id = 0
  test('sub', () => {
    let m = vi.fn()
    let xx = vi.fn()
    createTestEventTemplate()
      //注入id生成器
      .add(MockCreateId)
      //要测试的staff
      .add(DefineSubEventStaff)
      .out()
      .on('emit', m)
      .chaining('sub', 'test.url', [{ authors: ['dd'] }])
      .chaining('sub', 'test2.url', [{ authors: ['dd'] }])

    // .chain('subs', new Set(['test3.url', 'test4.url']), [{ authors: ['dd'] }])
    expect(m).toMatchInlineSnapshot(`
      [MockFunction spy] {
        "calls": [
          [
            "sub",
            [
              "test.url",
              [
                {
                  "authors": [
                    "dd",
                  ],
                },
              ],
              "fdw7me5n5j0",
            ],
          ],
          [
            "sub",
            [
              "test2.url",
              [
                {
                  "authors": [
                    "dd",
                  ],
                },
              ],
              "fdw7me5n5j1",
            ],
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
        ],
      }
    `)
  })

  test('subs', () => {
    let m = vi.fn()
    let xx = vi.fn()
    createTestEventTemplate()
      //注入id生成器
      .add(
        createStaff('create-id', line =>
          line.defineFeat('createId', () => 'fdw7me5n5j' + id++)
        )
      )
      //要测试的staff
      .add(DefineSubEventStaff)
      .out()
      .on('emit', m)
      .chaining('subs', new Set(['test.url', 'test2.url']), [
        { authors: ['dd'] },
      ])

    // .chain('subs', new Set(['test3.url', 'test4.url']), [{ authors: ['dd'] }])
    expect(m).toMatchInlineSnapshot(`
      [MockFunction spy] {
        "calls": [
          [
            "sub",
            [
              "test.url",
              [
                {
                  "authors": [
                    "dd",
                  ],
                },
              ],
              "fdw7me5n5j0",
            ],
          ],
          [
            "sub",
            [
              "test2.url",
              [
                {
                  "authors": [
                    "dd",
                  ],
                },
              ],
              "fdw7me5n5j1",
            ],
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": undefined,
          },
          {
            "type": "return",
            "value": undefined,
          },
        ],
      }
    `)
  })
})
