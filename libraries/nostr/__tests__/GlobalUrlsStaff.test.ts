import '@jumpalong/logger'
import { DefaultUrlStaff, GlobalUrlsStaff } from '../src/staff'
import {
  MockCreateId,
  MockEvent,
  MockNoCreateAt,
  createDate,
  createTestEventTemplate,
} from './utils'

describe('GlobalUrlsStaff', () => {
  test('GlobalUrlsStaff', async () => {
    let vifn1 = vi.fn()
    let vifn2 = vi.fn()

    let p0 = createTestEventTemplate().add(DefaultUrlStaff)
    p0.line.setDefaultUrls(new Set(['wss://url.test', 'wss://url1.test']))

    let p = p0.add(MockCreateId).add(MockNoCreateAt).add(GlobalUrlsStaff)
    let poolLine = p.line.relayPool.getLine().mod.add(MockEvent).out()
    p.line.mockNowCreateAt(createDate('2022.3.4 22:00:00'))

    poolLine.on('emit', vifn2)
    p.line.on('emit', vifn1)

    localStorage.clear()
    expect(localStorage).toMatchInlineSnapshot(`
      Storage {
        "_store": {},
      }
    `)
    let cl = p.line.fetchGlobalUrls()
    expect(cl?.urlList).toMatchInlineSnapshot(`
      Set {
        "wss://url.test",
        "wss://url1.test",
      }
    `)

    expect(localStorage).toMatchInlineSnapshot(`
      Storage {
        "_store": {},
      }
    `)
    expect(vifn1.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(vifn2.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "sub",
          [
            "wss://url.test",
            [
              {
                "kinds": [
                  10002,
                ],
                "limit": 200,
              },
            ],
            "fdw7me5n5j0",
          ],
        ],
        [
          "sub",
          [
            "wss://url1.test",
            [
              {
                "kinds": [
                  10002,
                ],
                "limit": 200,
              },
            ],
            "fdw7me5n5j1",
          ],
        ],
      ]
    `)
    expect(p.out().globalUrlList).toMatchInlineSnapshot(`
      Set {
        "wss://url.test",
        "wss://url1.test",
      }
    `)

    //mock Event
    await poolLine.mockEvent(
      {
        kind: 10002,
        tags: [
          ['r', 'wss://url3.test', 'read'],
          ['r', 'wss://url4.test', 'write'],
        ],
        created_at: createDate('2022.3.4 22:00:01'),
      },
      'sub1',
      'wss://url.test'
    )

    expect(cl?.urlList).toMatchInlineSnapshot(`
      Set {
        "wss://url.test",
        "wss://url1.test",
        "wss://url4.test",
        "wss://url3.test",
      }
    `)

    expect(p.out().globalUrlList).toMatchInlineSnapshot(`
      Set {
        "wss://url.test",
        "wss://url1.test",
        "wss://url4.test",
        "wss://url3.test",
      }
    `)

    expect(vifn1.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "added-the-global-url-list",
          [
            Set {
              "wss://url4.test",
              "wss://url3.test",
            },
            Set {
              "wss://url.test",
              "wss://url1.test",
              "wss://url4.test",
              "wss://url3.test",
            },
          ],
        ],
      ]
    `)
    expect(vifn2.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "sub",
          [
            "wss://url.test",
            [
              {
                "kinds": [
                  10002,
                ],
                "limit": 200,
              },
            ],
            "fdw7me5n5j0",
          ],
        ],
        [
          "sub",
          [
            "wss://url1.test",
            [
              {
                "kinds": [
                  10002,
                ],
                "limit": 200,
              },
            ],
            "fdw7me5n5j1",
          ],
        ],
        [
          "event",
          [
            "sub1",
            {
              "content": "",
              "created_at": 1646402401,
              "id": "mockid:0",
              "kind": 10002,
              "sig": "mocksiged:1",
              "tags": [
                [
                  "r",
                  "wss://url3.test",
                  "read",
                ],
                [
                  "r",
                  "wss://url4.test",
                  "write",
                ],
              ],
            },
            "wss://url.test",
          ],
        ],
        [
          "sub",
          [
            "wss://url4.test",
            [
              {
                "kinds": [
                  10002,
                ],
                "limit": 200,
              },
            ],
            "fdw7me5n5j2",
          ],
        ],
        [
          "sub",
          [
            "wss://url3.test",
            [
              {
                "kinds": [
                  10002,
                ],
                "limit": 200,
              },
            ],
            "fdw7me5n5j3",
          ],
        ],
      ]
    `)
  })
})
