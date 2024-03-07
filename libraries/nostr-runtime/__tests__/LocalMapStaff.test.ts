import '@jumpalong/logger'
import { warpMockFn } from './utils'
import LocalMapStaff, {
  includeExclude,
} from '../src/staff/staffs/common/LocalMapStaff'
import { EventLineFactory } from '../src/eventLine/EventLine'
import { ParameterizedReplaceableEventMap } from '../src/eventMap/ParameterizedReplaceableEventMap'
import { ReplaceableEventMap } from '../src/eventMap/ReplaceableEventMap'

describe('LocalMapStaff', () => {
  test('includeExclude', () => {
    expect(includeExclude(0)).toMatchInlineSnapshot(`true`)
    expect(includeExclude(0, { exclude: [0] })).toMatchInlineSnapshot(`false`)

    expect(includeExclude(0, { include: [0] })).toMatchInlineSnapshot(`true`)
    expect(includeExclude(1, { include: [0] })).toMatchInlineSnapshot(`false`)
    expect(
      includeExclude(0, { exclude: [0], include: [0] })
    ).toMatchInlineSnapshot(`false`)
    expect(
      includeExclude(1, { exclude: [0], include: [1] })
    ).toMatchInlineSnapshot(`true`)
  })
  test('LocalMapStaff:getInitCommonEvent', () => {
    localStorage.clear()
    let l = new EventLineFactory().add(LocalMapStaff).out()
    expect(l.localMap).toMatchInlineSnapshot(`{}`)
    expect(l.getInitCommonEvent(1)).toMatchInlineSnapshot(`
      CommonEvent {
        "KEY": "CE:1",
        "cacheOption": {
          "cacheError": true,
          "duration": 86400000,
          "requestMerge": true,
          "useLocalStorage": true,
          "useMemoryCache": true,
        },
        "map": {},
      }
    `)
    expect(l.localMap).toMatchInlineSnapshot(`
      {
        "1": CommonEvent {
          "KEY": "CE:1",
          "cacheOption": {
            "cacheError": true,
            "duration": 86400000,
            "requestMerge": true,
            "useLocalStorage": true,
            "useMemoryCache": true,
          },
          "map": {},
        },
      }
    `)
  })

  test('LocalMapStaff:getInitParameterizedReplaceableEventMap', () => {
    localStorage.clear()
    let l = new EventLineFactory().add(LocalMapStaff).out()
    expect(l.localMap).toMatchInlineSnapshot(`{}`)
    expect(
      l.getInitParameterizedReplaceableEventMap(30002) instanceof
        ParameterizedReplaceableEventMap
    ).toMatchInlineSnapshot(`true`)
    expect(Object.keys(l.localMap)).toMatchInlineSnapshot(`
      [
        "30002",
      ]
    `)
  })
  test('LocalMapStaff:getInitParameterizedReplaceableEventMap', () => {
    localStorage.clear()
    let l = new EventLineFactory().add(LocalMapStaff).out()
    expect(l.localMap).toMatchInlineSnapshot(`{}`)
    expect(
      l.getInitReplaceableEventMap(10002) instanceof ReplaceableEventMap
    ).toBe(true)
    expect(Object.keys(l.localMap)).toMatchInlineSnapshot(`
      [
        "10002",
      ]
    `)
  })

  test('LocalMapStaff:getInitParameterizedReplaceableEventMap', () => {
    localStorage.clear()
    let l = new EventLineFactory().add(LocalMapStaff).out()

    let m = warpMockFn(l, () => {
      l.loadEvents([
        {
          kind: 1,
          tags: [],
          content: 'c',
          created_at: 0,
          pubkey: 'p',
          id: 'i',
          sig: 's',
        },
      ])
    })
    expect(m).toMatchInlineSnapshot(`
      [MockFunction spy] {
        "calls": [
          [
            {
              "onReturn": [Function],
              "types": [
                "event",
                "event:local",
              ],
            },
            "local",
            {
              "content": "c",
              "created_at": 0,
              "id": "i",
              "kind": 1,
              "pubkey": "p",
              "sig": "s",
              "tags": [],
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
  })
  test('loadCommonEvent', () => {
    let l = new EventLineFactory().add(LocalMapStaff).out()

    let m = warpMockFn(l, () => {
      let map = l.getInitCommonEvent(1003)
      map.add({
        content: 'c',
        created_at: 0,
        id: 'i' + 1,
        kind: 1003,
        pubkey: 'p',
        sig: 's',
        tags: [],
      })
      map.add({
        content: 'c',
        created_at: 0,
        id: 'i' + 2,
        kind: 1003,
        pubkey: 'p',
        sig: 's',
        tags: [],
      })
      map.add({
        content: 'c',
        created_at: 0,
        id: 'i' + 3,
        kind: 1003,
        pubkey: 'p',
        sig: 's',
        tags: [],
      })
      l.loadCommonEvent(map, ['i1', 'i3'])
    })
    expect(m).toMatchInlineSnapshot(`
      [MockFunction spy] {
        "calls": [
          [
            {
              "onReturn": [Function],
              "types": [
                "event",
                "event:local",
              ],
            },
            "local",
            {
              "content": "c",
              "created_at": 0,
              "id": "i1",
              "kind": 1003,
              "pubkey": "p",
              "sig": "s",
              "tags": [],
            },
            "local",
          ],
          [
            {
              "onReturn": [Function],
              "types": [
                "event",
                "event:local",
              ],
            },
            "local",
            {
              "content": "c",
              "created_at": 0,
              "id": "i3",
              "kind": 1003,
              "pubkey": "p",
              "sig": "s",
              "tags": [],
            },
            "local",
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
  test('loadParameterizedReplaceableEvent', () => {
    let l = new EventLineFactory().add(LocalMapStaff).out()
    let m = warpMockFn(l, () => {
      let map = l.getInitParameterizedReplaceableEventMap(30002)
      for (let i = 0; i < 10; i++) {
        map.add({
          kind: 30002,
          tags: [['d', 'd-' + (i % 3)]],
          content: '',
          created_at: 0,
          pubkey: 'p-' + (i % 2),
          id: 'id-' + i,
          sig: '',
        })
      }
      l.loadParameterizedReplaceableEvent(map, 30002, ['p-0'], ['d-1'])
      l.loadParameterizedReplaceableEvent(
        map,
        30002,
        ['p-0', 'p-1'],
        ['d-1', 'd-2', 'd-22']
      )
    })

    expect(m).toMatchInlineSnapshot(`
      [MockFunction spy] {
        "calls": [
          [
            {
              "onReturn": [Function],
              "types": [
                "event",
                "event:local",
              ],
            },
            "local",
            {
              "content": "",
              "created_at": 0,
              "id": "id-4",
              "kind": 30002,
              "pubkey": "p-0",
              "sig": "",
              "tags": [
                [
                  "d",
                  "d-1",
                ],
              ],
            },
            "local",
          ],
          [
            {
              "onReturn": [Function],
              "types": [
                "event",
                "event:local",
              ],
            },
            "local",
            {
              "content": "",
              "created_at": 0,
              "id": "id-4",
              "kind": 30002,
              "pubkey": "p-0",
              "sig": "",
              "tags": [
                [
                  "d",
                  "d-1",
                ],
              ],
            },
            "local",
          ],
          [
            {
              "onReturn": [Function],
              "types": [
                "event",
                "event:local",
              ],
            },
            "local",
            {
              "content": "",
              "created_at": 0,
              "id": "id-2",
              "kind": 30002,
              "pubkey": "p-0",
              "sig": "",
              "tags": [
                [
                  "d",
                  "d-2",
                ],
              ],
            },
            "local",
          ],
          [
            {
              "onReturn": [Function],
              "types": [
                "event",
                "event:local",
              ],
            },
            "local",
            {
              "content": "",
              "created_at": 0,
              "id": "id-1",
              "kind": 30002,
              "pubkey": "p-1",
              "sig": "",
              "tags": [
                [
                  "d",
                  "d-1",
                ],
              ],
            },
            "local",
          ],
          [
            {
              "onReturn": [Function],
              "types": [
                "event",
                "event:local",
              ],
            },
            "local",
            {
              "content": "",
              "created_at": 0,
              "id": "id-5",
              "kind": 30002,
              "pubkey": "p-1",
              "sig": "",
              "tags": [
                [
                  "d",
                  "d-2",
                ],
              ],
            },
            "local",
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
          {
            "type": "return",
            "value": undefined,
          },
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
