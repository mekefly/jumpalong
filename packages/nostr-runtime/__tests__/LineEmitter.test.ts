import { LineEmitter } from '../LineEmitter'

test('LineEmitter on emit', () => {
  let mock = vi.fn(() => {})
  let emitter = new LineEmitter()
  emitter.on('test', mock)
  emitter.emit('test')
  expect(mock).toHaveBeenCalled()
})
test('LineEmitter once', () => {
  let mock = vi.fn(() => {})
  let emitter = new LineEmitter()
  emitter.once('test', mock)
  emitter.emit('test')
  emitter.emit('test')
  expect(mock).toBeCalledTimes(1)
})

test('LineEmitter on return', () => {
  let mock = vi.fn(() => {
    return 2
  })
  let returnMock = vi.fn(v => {})
  let emitter = new LineEmitter()
  emitter.on('test', mock)
  emitter.returnEmitter.on('test', returnMock)
  emitter.emit('test')
  expect(mock).toBeCalledTimes(1)
  expect(returnMock).toBeCalledTimes(1)
  expect(returnMock).toBeCalledWith(2)
})
test('LineEmitter once return', () => {
  let mock = vi.fn(() => {
    return 2
  })
  let returnMock = vi.fn(v => {})
  let emitter = new LineEmitter()
  emitter.once('test', mock)
  emitter.returnEmitter.on('test', returnMock)
  emitter.emit('test')
  expect(mock).toBeCalledTimes(1)
  expect(returnMock).toBeCalledTimes(1)
  expect(returnMock).toBeCalledWith(2)
})
