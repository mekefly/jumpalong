import '@jumpalong/logger'
import { Event } from 'nostr-tools'
import { PriKeyNostrApiImpl } from '../src/nostrApi/PriKeyNostrApiImpl'
import {
  GlobalUrlsStaff,
  LoginStaff,
  PoolStaff,
  RelayConfiguratorSynchronizerStaff,
} from '../src/staff'
import { Prikey } from '../src/utils'
import {
  MockCreateId,
  MockEvent,
  MockNoCreateAt,
  MockNostrApi,
  createDate,
  createTestEventTemplate,
} from './utils'
import { timeout } from '@jumpalong/shared'

describe('RelayConfiguratorSynchronizer', () => {
  test('save', async () => {
    let parentOnF = vi.fn()
    let RelayConfiguratorSynchronizerOnF = vi.fn()
    let RelayStaffOnF = vi.fn()

    vi.useFakeTimers({ now: 1704516003000 })

    let parentL = createTestEventTemplate()
      .add(MockCreateId)
      .add(RelayConfiguratorSynchronizerStaff)
      .add(LoginStaff)
      .out()
    parentL.on('emit', parentOnF)
    parentL.relayConfigurator
      .getLine()
      .on('emit' as any, RelayConfiguratorSynchronizerOnF)

    parentL.relayPool.getLine().on('emit', RelayStaffOnF)
    expect(parentL.mod.id).toMatchInlineSnapshot(`0`)
    expect(parentL.relayConfigurator.getLine().mod.id).toMatchInlineSnapshot(
      `1`
    )
    expect(parentL.relayPool.getLine().mod.id).toMatchInlineSnapshot(`2`)

    let api = new PriKeyNostrApiImpl(
      Prikey.fromHex(
        '961396f90d32caf70099717d3dc60a4c67fa50ee35392bddbd3acfa736fd2198'
      )
    )
    api.signEvent = e => {
      let _e = e as any as Event
      _e.sig = 'siged'
      return _e as any
    }
    parentL.setNostrApi(api)
    const relayConfigurator = parentL.relayConfigurator

    parentL.relayConfigurator.addRead('wss://nostr.com')
    parentL.relayConfigurator.addWrite('wss://nostr1.com')
    expect(parentOnF.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(RelayConfiguratorSynchronizerOnF.mock.calls).toMatchInlineSnapshot(
      `[]`
    )
    expect(relayConfigurator.data).toMatchInlineSnapshot(`
      {
        "config": {
          "wss://nostr.com": {
            "read": true,
          },
          "wss://nostr1.com": {
            "write": true,
          },
        },
        "read": Set {
          "wss://nostr.com",
        },
        "write": Set {
          "wss://nostr1.com",
        },
      }
    `)
    await parentL.relayConfigurator.save()

    expect(localStorage).toMatchInlineSnapshot(`
      Storage {
        "_store": {
          "RelayConfigurator:": "{"kind":10002,"tags":[["r","wss://nostr.com","read"],["r","wss://nostr1.com","write"]],"content":"","created_at":1704516003,"pubkey":"26cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07","id":"c7eae6012432c7b8525a1c0ded5828a3eec3194cfbeb72c6ff0aa6fab122cc44","sig":"siged"}",
          "__key_list:RelayConfigurator": "["RelayConfigurator:"]",
          "__nostr_api_mode": "0",
        },
      }
    `)

    expect(parentOnF.mock.calls.length).toMatchInlineSnapshot(`0`)
    expect(
      RelayConfiguratorSynchronizerOnF.mock.calls.length
    ).toMatchInlineSnapshot(`0`)
    expect(RelayStaffOnF.mock.calls.length).toMatchInlineSnapshot(`1`)

    expect(RelayConfiguratorSynchronizerOnF.mock.calls).toMatchInlineSnapshot(
      `[]`
    )
    expect(RelayStaffOnF.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "publish",
          [
            "wss://nostr1.com",
            {
              "content": "",
              "created_at": 1704516003,
              "id": "c7eae6012432c7b8525a1c0ded5828a3eec3194cfbeb72c6ff0aa6fab122cc44",
              "kind": 10002,
              "pubkey": "26cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07",
              "sig": "siged",
              "tags": [
                [
                  "r",
                  "wss://nostr.com",
                  "read",
                ],
                [
                  "r",
                  "wss://nostr1.com",
                  "write",
                ],
              ],
            },
          ],
        ],
      ]
    `)
    expect(parentOnF.mock.calls).toMatchInlineSnapshot(`[]`)
  })

  test('sync', async () => {
    expect(vi.isFakeTimers()).toMatchInlineSnapshot(`true`)
    vi.useRealTimers()
    expect(vi.isFakeTimers()).toMatchInlineSnapshot(`false`)

    let dates = [
      createDate('2024.1.6 20:18'),
      createDate('2024.1.6 20:20'),
      createDate('2024.1.6 20:21'),
    ]

    let parentOnF = vi.fn()
    let RelayConfiguratorSynchronizerOnF = vi.fn()
    let RelayStaffOnF = vi.fn()

    let l = createTestEventTemplate().add(GlobalUrlsStaff)
    l.line.globalUrlList = new Set()
    let parentL = l
      .add(MockNoCreateAt)
      .add(MockCreateId)
      .add(MockNostrApi)
      .add(RelayConfiguratorSynchronizerStaff)
      .add(LoginStaff)
      .out()
    parentL.mockNowCreateAt(dates[0])

    parentL.on('emit', parentOnF)
    parentL.relayConfigurator
      .getLine()
      .on('emit', RelayConfiguratorSynchronizerOnF)
    parentL.relayPool.getLine().on('emit', RelayStaffOnF)
    let poolLine = parentL.relayPool.getLine().add(MockEvent)

    expect(parentL.mod.id).toMatchInlineSnapshot(`3`)
    expect(parentL.relayConfigurator.getLine().mod.id).toMatchInlineSnapshot(
      `4`
    )
    expect(parentL.relayPool.getLine().mod.id).toMatchInlineSnapshot(`5`)

    const relayConfigurator = parentL.relayConfigurator

    parentL.relayConfigurator.addRead('wss://nostr.com')
    parentL.relayConfigurator.addWrite('wss://nostr1.com')

    expect(parentOnF.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(RelayConfiguratorSynchronizerOnF.mock.calls).toMatchInlineSnapshot(
      `[]`
    )
    expect(RelayStaffOnF.mock.calls).toMatchInlineSnapshot(`[]`)
    expect(relayConfigurator.data).toMatchInlineSnapshot(`
      {
        "config": {
          "wss://nostr.com": {
            "read": true,
          },
          "wss://nostr1.com": {
            "write": true,
          },
        },
        "read": Set {
          "wss://nostr.com",
        },
        "write": Set {
          "wss://nostr1.com",
        },
      }
    `)
    await parentL.relayConfigurator.sync()

    expect(localStorage).toMatchInlineSnapshot(`
      Storage {
        "_store": {
          "RelayConfigurator:": "{"kind":10002,"tags":[["r","wss://nostr.com","read"],["r","wss://nostr1.com","write"]],"content":"","created_at":1704516003,"pubkey":"26cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07","id":"c7eae6012432c7b8525a1c0ded5828a3eec3194cfbeb72c6ff0aa6fab122cc44","sig":"siged"}",
          "__key_list:RelayConfigurator": "["RelayConfigurator:"]",
          "__nostr_api_mode": "0",
        },
      }
    `)

    //事件数
    expect(parentOnF.mock.calls.length).toMatchInlineSnapshot(`0`)
    expect(
      RelayConfiguratorSynchronizerOnF.mock.calls.length
    ).toMatchInlineSnapshot(`0`)
    expect(RelayStaffOnF.mock.calls.length).toMatchInlineSnapshot(`2`)
    //详细事件信息
    expect(RelayConfiguratorSynchronizerOnF.mock.calls).toMatchInlineSnapshot(
      `[]`
    )
    expect(RelayStaffOnF.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "sub",
          [
            "wss://nostr1.com",
            [
              {
                "authors": [
                  "26cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07",
                ],
                "kinds": [
                  10002,
                ],
              },
            ],
            "fdw7me5n5j0",
          ],
        ],
        [
          "sub",
          [
            "wss://nostr.com",
            [
              {
                "authors": [
                  "26cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07",
                ],
                "kinds": [
                  10002,
                ],
              },
            ],
            "fdw7me5n5j1",
          ],
        ],
      ]
    `)
    expect(parentOnF.mock.calls).toMatchInlineSnapshot(`[]`)

    //现在到达了第2个时间点
    parentL.mockNowCreateAt(dates[2])

    poolLine.mockEvent(
      {
        content: '',
        created_at: dates[1], //返回的内容在第1个时间点
        kind: 10002,
        tags: [['r', 'wss://nostr3.com']],
      },
      'fdw7me5n5j1',
      'wss://nostr.com'
    )

    await Promise.resolve()
    await timeout(100)

    //查看模拟事件后有什么变化
    expect(localStorage).toMatchInlineSnapshot(`
      Storage {
        "_store": {
          "RelayConfigurator:": "{"kind":10002,"tags":[["r","wss://nostr3.com"]],"content":"","created_at":1704543600,"id":"mockid:0","sig":"mocksiged:1"}",
          "__key_list:RelayConfigurator": "["RelayConfigurator:"]",
          "__nostr_api_mode": "0",
        },
      }
    `)
    expect(relayConfigurator.data).toMatchInlineSnapshot(`
      {
        "config": {
          "wss://nostr3.com": {
            "read": true,
            "write": true,
          },
        },
        "read": Set {
          "wss://nostr3.com",
        },
        "write": Set {
          "wss://nostr3.com",
        },
      }
    `)
    expect(parentOnF.mock.calls.length).toMatchInlineSnapshot(`0`)
    expect(
      RelayConfiguratorSynchronizerOnF.mock.calls.length
    ).toMatchInlineSnapshot(`0`)
    expect(RelayStaffOnF.mock.calls.length).toMatchInlineSnapshot(`3`)

    //详细事件信息
    expect(RelayConfiguratorSynchronizerOnF.mock.calls).toMatchInlineSnapshot(
      `[]`
    )
    expect(RelayStaffOnF.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "sub",
          [
            "wss://nostr1.com",
            [
              {
                "authors": [
                  "26cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07",
                ],
                "kinds": [
                  10002,
                ],
              },
            ],
            "fdw7me5n5j0",
          ],
        ],
        [
          "sub",
          [
            "wss://nostr.com",
            [
              {
                "authors": [
                  "26cc170cc527aae6ee460a91f2bcd43d731bae6678312d073a71e7533946ca07",
                ],
                "kinds": [
                  10002,
                ],
              },
            ],
            "fdw7me5n5j1",
          ],
        ],
        [
          "event",
          [
            "fdw7me5n5j1",
            {
              "content": "",
              "created_at": 1704543600,
              "id": "mockid:0",
              "kind": 10002,
              "sig": "mocksiged:1",
              "tags": [
                [
                  "r",
                  "wss://nostr3.com",
                ],
              ],
            },
            "wss://nostr.com",
          ],
        ],
      ]
    `)
    expect(parentOnF.mock.calls).toMatchInlineSnapshot(`[]`)

    expect(vi.isFakeTimers()).toMatchInlineSnapshot(`false`)
  })
})
