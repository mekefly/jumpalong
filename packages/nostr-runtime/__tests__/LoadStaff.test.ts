import { createDate, dateToString } from './utils'

import { Filter } from 'nostr-tools'
import {
  FilterLoadMap,
  keepHalf,
  load,
  mergeRequestsForTheSameUrl,
  reserveSubList,
} from '../src/staff/staffs/common/LoadStaff'

test('reserveSubList', () => {
  let filters: Filter[] = [{ kinds: [1], until: 20 }]
  //当前时间2024.1.20 10:10:10
  let weakMap: FilterLoadMap = new WeakMap([
    [
      filters[0],
      {
        done: false,
        map: new Map([
          [
            'wss://xxx.org',
            {
              since: createDate('2024.1.20 10:10:10'),
              until: createDate('2024.1.20 10:10:10'),
              loadDone: false,
              newLoadDone: false,
            },
          ],

          [
            'wss://yyy.org',
            {
              since: createDate('2024.1.10 10:10:10'),
              until: createDate('2024.1.20 10:10:10'),
              loadDone: false,
              newLoadDone: false,
            },
          ],
          [
            'wss://zzz.org',
            {
              since: createDate('2024.1.5 10:10:10'),
              until: createDate('2024.1.20 10:10:10'),
              loadDone: false,
              newLoadDone: false,
            },
          ],
        ]),
      },
    ],
  ])
  let subList = reserveSubList(filters, weakMap, 10)

  expect(subList.map(item => dateToString(item[1].until as number)))
    .toMatchInlineSnapshot(`
    [
      "2024/1/5 10:10:10",
      "2024/1/10 10:10:10",
      "2024/1/20 10:10:10",
    ]
  `)
  expect(subList).toMatchInlineSnapshot(`
    [
      [
        "wss://zzz.org",
        {
          "kinds": [
            1,
          ],
          "limit": 10,
          "until": 1704420610,
        },
      ],
      [
        "wss://yyy.org",
        {
          "kinds": [
            1,
          ],
          "limit": 10,
          "until": 1704852610,
        },
      ],
      [
        "wss://xxx.org",
        {
          "kinds": [
            1,
          ],
          "limit": 10,
          "until": 1705716610,
        },
      ],
    ]
  `)
})

test('keepHalf', () => {
  expect(
    keepHalf([
      [
        'wss://zzz.org',
        {
          kinds: [1],
          limit: 10,
          until: 1704420610,
        },
      ],
      [
        'wss://yyy.org',
        {
          kinds: [1],
          limit: 10,
          until: 1704852610,
        },
      ],
      [
        'wss://xxx.org',
        {
          kinds: [1],
          limit: 10,
          until: 1705716610,
        },
      ],
    ])
  ).toMatchInlineSnapshot(`
    [
      [
        "wss://yyy.org",
        {
          "kinds": [
            1,
          ],
          "limit": 10,
          "until": 1704852610,
        },
      ],
      [
        "wss://xxx.org",
        {
          "kinds": [
            1,
          ],
          "limit": 10,
          "until": 1705716610,
        },
      ],
    ]
  `)
})

test('mergeRequestsForTheSameUrl', () => {
  expect(
    mergeRequestsForTheSameUrl([
      [
        'wss://yyy.org',
        {
          kinds: [1],
          limit: 10,
          until: 1704852610,
        },
      ],
      [
        'wss://xxx.org',
        {
          kinds: [1],
          limit: 10,
          until: 1705716610,
        },
      ],
      [
        'wss://xxx.org',
        {
          kinds: [0],
          limit: 10,
          until: 1705716610,
        },
      ],
    ])
  ).toMatchInlineSnapshot(`
    {
      "wss://xxx.org": [
        {
          "kinds": [
            1,
          ],
          "limit": 10,
          "until": 1705716610,
        },
        {
          "kinds": [
            0,
          ],
          "limit": 10,
          "until": 1705716610,
        },
      ],
      "wss://yyy.org": [
        {
          "kinds": [
            1,
          ],
          "limit": 10,
          "until": 1704852610,
        },
      ],
    }
  `)
})
