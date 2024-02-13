import '@jumpalong/logger'
import { LineEmitter } from '../src/eventLine/LineEmitter'

test('LineEmitter on emit', async () => {
  let mock = vi.fn(() => {})
  let emitter = new LineEmitter()
  emitter.on('test', mock)
  await emitter.emit('test')
  expect(mock.mock.calls.length).toMatchInlineSnapshot(`1`)
})

test('LineEmitter on emit', async () => {
  let mock = vi.fn()
  let mock1 = vi.fn()
  let emitter = new LineEmitter()
  emitter.on('test', mock)
  emitter.on('test', mock1)
  await emitter.emit('test')
  expect(mock.mock.calls.length).toMatchInlineSnapshot(`1`)
  expect(mock1.mock.calls.length).toMatchInlineSnapshot(`1`)
})

test('LineEmitter once', async () => {
  let mock = vi.fn(() => {})
  let emitter = new LineEmitter()
  emitter.on('test', mock)
  await emitter.emit('test')
  await emitter.emit('test')
  expect(mock.mock.calls.length).toMatchInlineSnapshot(`2`)
})
test('LineEmitter once', async () => {
  let mock = vi.fn(() => {})
  let emitter = new LineEmitter()
  emitter.once('test', mock)
  await emitter.emit('test')
  await emitter.emit('test')
  expect(mock.mock.calls.length).toMatchInlineSnapshot(`1`)
})

test('LineEmitter emit once', async () => {
  let mock = vi.fn(() => {})
  let emitter = new LineEmitter()
  emitter.once('test', mock)
  await emitter.emitOnce('test')
  await emitter.emitOnce('test')
  await emitter.emitOnce('test')
  await emitter.emitOnce('test')
  expect(mock.mock.calls.length).toMatchInlineSnapshot(`1`)
})

test('LineEmitter on return', async () => {
  let mock = vi.fn(() => {
    return 2
  })
  let mock1 = vi.fn(() => {
    return 3
  })

  let onReturn = vi.fn()

  let emitter = new LineEmitter()
  emitter.on('test', mock)
  emitter.on('test', mock1)
  await emitter.emit({ type: 'test', onReturn })

  expect(mock.mock.calls.length).toMatchInlineSnapshot(`1`)
  expect(mock1.mock.calls.length).toMatchInlineSnapshot(`1`)
  expect(onReturn.mock.calls.length).toMatchInlineSnapshot(`2`)
})

test('LineEmitter once return', async () => {
  let mock = vi.fn(() => {
    return 2
  })
  let mock1 = vi.fn(() => {
    return 3
  })

  let onReturn = vi.fn()

  let emitter = new LineEmitter()
  emitter.on('test', mock)
  emitter.on('test', mock1)
  await emitter.emit({ type: 'test', onReturn, onReturnOnce: true })

  expect(mock.mock.calls.length).toMatchInlineSnapshot(`1`)
  expect(mock1.mock.calls.length).toMatchInlineSnapshot(`1`)
  expect(onReturn.mock.calls.length).toMatchInlineSnapshot(`1`)
})

test('stop', async () => {
  let mock = vi.fn(() => {
    return 2
  })
  let mock1 = vi.fn(() => {
    return 3
  })

  let onReturn = vi.fn((v: any, { stop }: { stop: () => void }) => {
    stop()
  })

  let emitter = new LineEmitter()
  emitter.on('test', mock)
  emitter.on('test', mock1)

  await emitter.emit({ type: 'test', onReturn })

  expect(mock).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [],
      ],
      "results": [
        {
          "type": "return",
          "value": 2,
        },
      ],
    }
  `)
  expect(onReturn).toMatchInlineSnapshot(`
    [MockFunction spy] {
      "calls": [
        [
          2,
          {
            "stop": [Function],
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
test('暂停-继续', async () => {
  let f = vi.fn()
  let emitter = new LineEmitter()
  emitter.on('xx', f)
  emitter.parse()
  let x = []

  let e = emitter.emit('xx').then(() => {
    x.push(1)
    expect(f.mock.calls.length).toMatchInlineSnapshot(`1`)
  })
  x.push(2)
  expect(f.mock.calls.length).toMatchInlineSnapshot(`0`)
  emitter.continue()

  await e
  expect(x).toMatchInlineSnapshot(`
    [
      2,
      1,
    ]
  `)
})
