import '@jumpalong/logger'
import { objectFilter } from '@jumpalong/shared'
import { EventLineFactory } from '../src/eventLine'

test('type', () => {
  let xxx = new EventLineFactory()
    .defineEmit<'yyyy', []>()
    .add(xx => {
      let xxxx = xx.out()

      return xx.defineEmit<'xx', ['33']>()
    })
    // .add(xx => {
    //   return xx.defineEmit<'22', ['33']>()
    // })
    // .add(xx => {
    //   return xx.defineEmit<'44', ['33']>()
    // })
    .out()
  xxx
})
const noEmitter: typeof objectFilter = (o, ...rest) =>
  objectFilter(o, 'deep', 'no:emitter', ...(rest as any))
const expectNoEmitter: typeof expect = ((o: any, ...rest: any) =>
  expect(noEmitter(o), rest as any)) as any

test('assignFeat', () => {
  expect(new EventLineFactory().assignFeat({ xx: 1 }).out()).toMatchObject({
    xx: 1,
  })
})
test('defineFeat应该正常执行', () => {
  expectNoEmitter(
    new EventLineFactory().defineFeat('xx', 1).line
  ).toMatchObject({
    xx: 1,
  })
})
test('assignFeat应该正常执行', () => {
  expectNoEmitter(
    new EventLineFactory().assignFeat({ xx: 1 }).line
  ).toMatchObject({
    xx: 1,
  })
})
test('add应该正常执行', () => {
  expectNoEmitter(
    new EventLineFactory().add(xx => xx.assignFeat({ xx: 1 })).line
  ).toMatchObject({
    xx: 1,
  })
})
test('add添加具名应该正常执行', () => {
  expect(
    new EventLineFactory().add(function xxxx(xx) {
      return xx.assignFeat({ xx: 1 })
    }).line
  ).toMatchObject({ xx: 1 })
})
test('add同名特性不应该重复添加', () => {
  expectNoEmitter(
    new EventLineFactory()
      .add(function xxxx(xx) {
        return xx.assignFeat({ xx: 1 })
      })
      .add(function xxxx(xx) {
        return xx.assignFeat({ yy: 1 })
      }).line
  ).toMatchObject({
    xx: 1,
    yy: 1,
  })
})

describe('createChild', () => {
  test('base', () => {
    let parent = new EventLineFactory().add(mod => mod.assignFeat({ xx: 3 }))
    let child = parent.createChild().add(line => line.assignFeat({ yy: 22 }))
    expect(parent.line).toMatchObject({
      xx: 3,
    })
    expect(child.line).toMatchObject({
      xx: 3,
      yy: 22,
    })
  })
  test('createChild:feat', () => {
    let id = 0
    let p = new EventLineFactory()
      .assignFeat({
        id1: id++,
        getId1() {
          return this.id1
        },
      })

      .add(m => m.defineEmit<'xx', [number]>())
    let c = p.createChild().assignFeat({ id1: id++ })

    expect(p.line.id1).toMatchInlineSnapshot(`0`)
    expect(c.line.id1).toMatchInlineSnapshot(`1`)

    expect(p.line.getId1()).toMatchInlineSnapshot(`0`)
    expect(c.line.getId1()).toMatchInlineSnapshot(`1`)

    //获取到parent id1
    let c2 = p.createChild()
    expect(c2.line.getId1()).toMatchInlineSnapshot(`0`)
  })
  test('createChild,emits', () => {
    let id = 0
    let p = new EventLineFactory().add(m => m.defineEmit<'xx', [number]>())
    let c = p.createChild()
    let l1 = vi.fn()

    //检查on emit
    p.line.on('xx', l1)
    p.line.emit('xx', id++)
    expect(l1.mock.calls).toMatchInlineSnapshot(`
      [
        [
          0,
        ],
      ]
    `)

    //对比无extends
    c.line.emit('xx', id++)

    expect(l1.mock.calls).toMatchInlineSnapshot(`
      [
        [
          0,
        ],
      ]
    `)

    c.line.emit('xx', id++)

    expect(l1.mock.calls).toMatchInlineSnapshot(`
      [
        [
          0,
        ],
      ]
    `)
  })
  test('extends', () => {
    let s = vi.fn(mod => mod.assignFeat({ xx: 3 }))
    let parent = new EventLineFactory().add(s)
    let child = parent.createChild().add(s)
    expect(s.mock.calls.length).toMatchInlineSnapshot(`1`)
  })
})
