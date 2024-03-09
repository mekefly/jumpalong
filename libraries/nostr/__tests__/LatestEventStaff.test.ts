import {
  MockCreateId,
  MockEvent,
  MockPoolStaff,
  createDate,
  createTestEventTemplate,
  warpMockFn,
} from './utils'

import LatestEventStaff from '../src/staff/staffs/eventStaff/LatestEventStaff'
import AddFilterStaff from '../src/staff/staffs/manager/AddFilterStaff'

test('', async () => {
  let ml = createTestEventTemplate()
    .add(MockPoolStaff)
    .add(MockCreateId)
    .add(AddFilterStaff)
    .add(LatestEventStaff)
    .out()

  expect(
    warpMockFn(
      ml.relayPool.getLine(),
      () => {
        ml.addFilters([{ kinds: [1] }])
        ml.addUrl('wss://xxx.xxx')
      },
      'sub'
    )
  ).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          "wss://xxx.xxx",
          [
            {
              "kinds": [
                1,
              ],
            },
          ],
          "subId0",
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
  expect(
    await warpMockFn(ml, async () => {
      await ml.relayPool
        .getLine()
        .add(MockEvent)
        .mockEvent(
          { kind: 1, created_at: createDate('2024.1.2 22:23:00') },
          'subId0',
          'wss://xxx.xxx'
        ),
        'event'
    })
  ).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          {
            "onReturn": [Function],
            "types": [
              "event",
              "event:subId0",
            ],
          },
          "subId0",
          {
            "content": "",
            "created_at": 1704205380,
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
  expect(ml.getLatestEvent()).toMatchInlineSnapshot(`
    {
      "content": "",
      "created_at": 1704205380,
      "id": "mockid:0",
      "kind": 1,
      "sig": "mocksiged:1",
      "tags": [],
    }
  `)

  await ml.relayPool
    .getLine()
    .add(MockEvent)
    .mockEvent(
      { kind: 1, created_at: createDate('2024.1.2 22:23:01') },
      'subId0',
      'wss://xxx.xxx'
    ),
    'event'

  expect(ml.getLatestEvent()).toMatchInlineSnapshot(`
    {
      "content": "",
      "created_at": 1704205381,
      "id": "mockid:2",
      "kind": 1,
      "sig": "mocksiged:3",
      "tags": [],
    }
  `)
})
