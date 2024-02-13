import { kinds } from 'nostr-tools'
import { ParameterizedReplaceableEventMap } from '../src/eventMap/ParameterizedReplaceableEventMap'

describe('ParameterizedReplaceableEventMap', () => {
  test('base', () => {
    localStorage.clear()
    let x = new ParameterizedReplaceableEventMap(30002)
    x.add({
      kind: 30002,
      tags: [['d', 'ttt']],
      content: '',
      created_at: 0,
      pubkey: 'p1',
      id: 'xxx1',
      sig: '',
    })
    expect(
      x.getByA({
        kind: 30002,
        identifier: 'ttt',
        pubkey: 'p1',
      })
    ).toMatchInlineSnapshot(`
      {
        "content": "",
        "created_at": 0,
        "id": "xxx1",
        "kind": 30002,
        "pubkey": "p1",
        "sig": "",
        "tags": [
          [
            "d",
            "ttt",
          ],
        ],
      }
    `)
    localStorage.clear()
  })
  test('query', () => {
    localStorage.clear()
    let m = new ParameterizedReplaceableEventMap(30002)
    let as: string[] = []
    m.add({
      kind: 30002,
      tags: [['d', 'ttt']],
      content: '',
      created_at: 0,
      pubkey: 'p1',
      id: 'xxx1',
      sig: '',
    })
    as.push(`${30002}:${'p1'}:${'ttt'}`)
    for (let i = 0; i < 10; i++) {
      let pubkey = 'p-' + (i % 2)
      let d = 'd-' + (i % 3)
      m.add({
        kind: 30002,
        tags: [['d', d]],
        content: '',
        created_at: 0,
        pubkey,
        id: 'id-' + i,
        sig: '',
      })

      as.push(`${30002}:${pubkey}:${d}`)
    }
    expect(m.query([30002], ['p1'], ['ttt'])).toMatchInlineSnapshot(`
      [
        {
          "content": "",
          "created_at": 0,
          "id": "xxx1",
          "kind": 30002,
          "pubkey": "p1",
          "sig": "",
          "tags": [
            [
              "d",
              "ttt",
            ],
          ],
        },
      ]
    `)
    expect(m.query([30002], ['p-0'], ['d-1'])).toMatchInlineSnapshot(`
      [
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
      ]
    `)

    expect(as).toMatchInlineSnapshot(`
      [
        "30002:p1:ttt",
        "30002:p-0:d-0",
        "30002:p-1:d-1",
        "30002:p-0:d-2",
        "30002:p-1:d-0",
        "30002:p-0:d-1",
        "30002:p-1:d-2",
        "30002:p-0:d-0",
        "30002:p-1:d-1",
        "30002:p-0:d-2",
        "30002:p-1:d-0",
      ]
    `)
    expect(m.query([30002], ['p-0', 'p-1'], ['d-1', 'd-2', 'd-22']))
      .toMatchInlineSnapshot(`
      [
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
      ]
    `)
  })
})
