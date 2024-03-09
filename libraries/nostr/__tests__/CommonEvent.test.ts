import { CommonEvent } from '../src/eventMap/CommonEvent'

describe('CommonEvent', () => {
  test('base', () => {
    localStorage.clear()
    let m = new CommonEvent(1)
    m.add({
      kind: 1,
      tags: [],
      content: '1',
      created_at: 0,
      pubkey: 'p',
      id: 'i',
      sig: 's',
    })
    m.add({
      kind: 1,
      tags: [],
      content: '1',
      created_at: 0,
      pubkey: 'p',
      id: 'i1',
      sig: 's',
    })
    expect(localStorage.getItem('CE:1')).toMatchInlineSnapshot(
      `"{"i":"i","i1":"i1"}"`
    )
    expect(localStorage.getItem('i1')?.split('|')[1]).toMatchInlineSnapshot(
      `"{"kind":1,"tags":[],"content":"1","created_at":0,"pubkey":"p","id":"i1","sig":"s"}"`
    )
    expect(localStorage.getItem('i')?.split('|')[1]).toMatchInlineSnapshot(
      `"{"kind":1,"tags":[],"content":"1","created_at":0,"pubkey":"p","id":"i","sig":"s"}"`
    )
    localStorage.clear()
  })
  test('query', () => {
    localStorage.clear()
    let m = new CommonEvent(1)
    for (let i = 0; i < 99; i++) {
      m.add({
        kind: 1,
        tags: [],
        content: 'c' + i,
        created_at: 0,
        pubkey: 'p' + i,
        id: 'i' + i,
        sig: 's' + i,
      })
    }
    //没有99所有列表没有
    expect(m.query(new Set(['i9', 'i99', 'i23', 'i999'])))
      .toMatchInlineSnapshot(`
      [
        {
          "content": "c9",
          "created_at": 0,
          "id": "i9",
          "kind": 1,
          "pubkey": "p9",
          "sig": "s9",
          "tags": [],
        },
        {
          "content": "c23",
          "created_at": 0,
          "id": "i23",
          "kind": 1,
          "pubkey": "p23",
          "sig": "s23",
          "tags": [],
        },
      ]
    `)
  })
  test('isCommonEventKind', () => {
    expect(CommonEvent.isCommonEventKind(1)).toMatchInlineSnapshot(`true`)
  })
})
