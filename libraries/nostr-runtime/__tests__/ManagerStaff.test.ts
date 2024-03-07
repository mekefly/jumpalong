import {
  MockCreateId,
  MockEvent,
  MockPoolStaff,
  createDate,
  createTestEventTemplate,
  warpMockFn,
} from './utils'

import ManagerStaff from '../src/staff/staffs/manager/ManagerStaff'

test('addFilter', () => {
  let ml = createTestEventTemplate().add(MockCreateId).add(ManagerStaff).out()
  let mock1 = warpMockFn(
    ml,
    () => {
      ml.addFilter({ ids: ['1', '2'] })
    },
    'add-filters'
  )
  expect(mock1).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          [
            {
              "ids": [
                "1",
                "2",
              ],
            },
          ],
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
})

test('addUrls', () => {
  let ml = createTestEventTemplate().add(MockCreateId).add(ManagerStaff).out()
  let mock1 = warpMockFn(
    ml,
    () => {
      ml.addUrls(new Set(['wss://xxx.xxx']))
    },
    'add-urls'
  )
  expect(mock1).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          Set {
            "wss://xxx.xxx",
          },
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
})

test('autoSub', () => {
  let ml = createTestEventTemplate()
    .add(MockPoolStaff)
    .add(MockCreateId)
    .add(ManagerStaff)
    .out()
  let mock1 = warpMockFn(
    ml.relayPool.getLine(),
    () => {
      ml.addUrls(new Set(['wss://xxx.xxx']))
      ml.addFilter({ ids: ['1', '2'] })
    },
    'sub'
  )
  expect(mock1).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "wss://xxx.xxx",
          [
            {
              "ids": [
                "1",
                "2",
              ],
            },
          ],
          "subId1",
        ],
        [
          "wss://xxx.xxx",
          [
            {
              "ids": [
                "1",
                "2",
              ],
            },
          ],
          "subId2",
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

  //重复添加不会发送请求
  expect(
    warpMockFn(
      ml.relayPool.getLine(),
      () => {
        ml.addUrls(new Set(['wss://xxx.xxx']))
        ml.addFilter({ ids: ['1', '2'] })
      },
      'sub'
    )
  ).toMatchInlineSnapshot(`[MockFunction spy]`)
})

test('autoSub1', async () => {
  let ml = createTestEventTemplate()
    .add(MockPoolStaff)
    .add(MockCreateId)
    .add(ManagerStaff)
    .out()
  let mock1 = warpMockFn(
    ml.relayPool.getLine(),
    () => {
      ml.addFilter({ ids: ['1', '2'] })
      ml.addUrls(new Set(['wss://xxx.xxx']))
    },
    'sub'
  )
  expect(mock1).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "wss://xxx.xxx",
          [
            {
              "ids": [
                "1",
                "2",
              ],
            },
          ],
          "subId3",
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

  let mock = await warpMockFn(
    ml.relayPool.getLine(),
    async () => {
      await ml.relayPool
        .getLine()
        .add(MockEvent)
        .mockEvent(
          { created_at: createDate('2024.1.2 23:22:12') },
          'subId3',
          'wss://xxx.xxx'
        )
    },
    'event'
  )
  expect(mock).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "subId3",
          {
            "content": "",
            "created_at": 1704208932,
            "id": "mockid:0",
            "kind": 1,
            "sig": "mocksiged:1",
            "tags": [],
          },
          "wss://xxx.xxx",
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

  let mock2 = await warpMockFn(
    ml,
    async () => {
      await ml.relayPool
        .getLine()
        .add(MockEvent)
        .mockEvent(
          { created_at: createDate('2024.1.2 23:22:13') },
          'subId3',
          'wss://xxx.xxx'
        )
    },
    'event'
  )
  expect(mock2).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "subId3",
          {
            "content": "",
            "created_at": 1704208933,
            "id": "mockid:2",
            "kind": 1,
            "sig": "mocksiged:3",
            "tags": [],
          },
          "wss://xxx.xxx",
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
})

// test('addUrl', () => {
//   let m = vi.fn()
//   expect(
//     createTestEventTemplate()
//       .add(MockCreateId)
//       .add(ManagerStaff)
//       .out()
//       .on('emit', m)
//       // .chain('addFilter', { ids: ['1', '2'] })
//       .chain('addUrl', 'http://localhost').urlList
//   ).toMatchInlineSnapshot(`
//     Set {
//       "http://localhost",
//     }
//   `)
//   expect(m).toMatchInlineSnapshot(`
//     [MockFunction spy] {
//       "calls": [
//         [
//           "add-urls",
//           [
//             Set {
//               "http://localhost",
//             },
//           ],
//         ],
//       ],
//       "results": [
//         {
//           "type": "return",
//           "value": undefined,
//         },
//       ],
//     }
//   `)
// })

// test('addFilter + addUrl', () => {
//   let m = vi.fn()
//   createTestEventTemplate()
//     .add(MockCreateId)
//     .add(ManagerStaff)
//     .out()
//     .on('emit', m)
//     .chain('addUrl', 'http://localhost')
//     .chain('addFilter', { ids: ['1', '2'] })
//     .chain('addFilter', { ids: ['1', '3'] })
//   expect(m).toMatchInlineSnapshot(`
//     [MockFunction spy] {
//       "calls": [
//         [
//           "add-urls",
//           [
//             Set {
//               "http://localhost",
//             },
//           ],
//         ],
//         [
//           "add-filters",
//           [
//             [
//               {
//                 "ids": [
//                   "1",
//                   "2",
//                 ],
//               },
//             ],
//           ],
//         ],
//         [
//           "sub",
//           [
//             "http://localhost",
//             [
//               {
//                 "ids": [
//                   "1",
//                   "2",
//                 ],
//               },
//             ],
//             "fdw7me5n5j0",
//           ],
//         ],
//         [
//           "add-filters",
//           [
//             [
//               {
//                 "ids": [
//                   "1",
//                   "3",
//                 ],
//               },
//             ],
//           ],
//         ],
//         [
//           "sub",
//           [
//             "http://localhost",
//             [
//               {
//                 "ids": [
//                   "1",
//                   "3",
//                 ],
//               },
//             ],
//             "fdw7me5n5j1",
//           ],
//         ],
//       ],
//       "results": [
//         {
//           "type": "return",
//           "value": undefined,
//         },
//         {
//           "type": "return",
//           "value": undefined,
//         },
//         {
//           "type": "return",
//           "value": undefined,
//         },
//         {
//           "type": "return",
//           "value": undefined,
//         },
//         {
//           "type": "return",
//           "value": undefined,
//         },
//       ],
//     }
//   `)
// })
