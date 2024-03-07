import { EventMap } from '../src/eventMap/EventMap'

describe('EventMap', () => {
  test('base', () => {
    localStorage.clear()
    let map = new EventMap('test')
    expect(localStorage).toMatchInlineSnapshot(`
      Storage {
        "_store": {},
      }
    `)
    map.set('key1', {
      content: 'content',
      kind: 0,
      tags: [],
      created_at: 0,
      pubkey: 'pubkey:1',
      id: 'id:1',
      sig: 'sig:1',
    })
    expect(localStorage.getItem('__cache_key_list_')).toMatchInlineSnapshot(
      `"["id:1"]"`
    )
    expect(localStorage.getItem('test')).toMatchInlineSnapshot(
      `"{"key1":"id:1"}"`
    )
    expect(localStorage.getItem('id:1')?.split('|')[1]).toMatchInlineSnapshot(
      `"{"content":"content","kind":0,"tags":[],"created_at":0,"pubkey":"pubkey:1","id":"id:1","sig":"sig:1"}"`
    )
    expect(map.get('key1')).toMatchInlineSnapshot(`
      {
        "content": "content",
        "created_at": 0,
        "id": "id:1",
        "kind": 0,
        "pubkey": "pubkey:1",
        "sig": "sig:1",
        "tags": [],
      }
    `)
    localStorage.clear()
  })
  test('delete', () => {
    localStorage.clear()
    let map = new EventMap('test')
    map.set('key1', {
      content: 'content',
      kind: 0,
      tags: [],
      created_at: 0,
      pubkey: 'pubkey:1',
      id: 'id:1',
      sig: 'sig:1',
    })
    map.delete('key1')
    expect(localStorage.getItem('test')).toMatchInlineSnapshot(`"{}"`)
  })
})
