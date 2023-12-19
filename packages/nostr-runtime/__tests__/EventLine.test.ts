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
  expect(new EventLineFactory().assignFeat({ xx: 1 })).toMatchSnapshot()
})
test('defineFeat应该正常执行', () => {
  expectNoEmitter(new EventLineFactory().defineFeat('xx', 1).line)
    .toMatchInlineSnapshot(`
    {
      "feat": [Circular],
      "mod": {
        "core": [Circular],
        "staffNames": Set {},
        "staffs": Set {},
      },
      "xx": 1,
    }
  `)
})
test('assignFeat应该正常执行', () => {
  expectNoEmitter(new EventLineFactory().assignFeat({ xx: 1 }).line)
    .toMatchInlineSnapshot(`
    {
      "feat": [Circular],
      "mod": {
        "core": [Circular],
        "staffNames": Set {},
        "staffs": Set {},
      },
      "xx": 1,
    }
  `)
})
test('add应该正常执行', () => {
  expectNoEmitter(
    new EventLineFactory().add(xx => xx.assignFeat({ xx: 1 })).line
  ).toMatchInlineSnapshot(`
    {
      "feat": [Circular],
      "mod": {
        "core": [Circular],
        "staffNames": Set {},
        "staffs": Set {
          [Function],
        },
      },
      "xx": 1,
    }
  `)
})
test('add添加具名应该正常执行', () => {
  expect(
    objectFilter(
      new EventLineFactory().add(function xxxx(xx) {
        return xx.assignFeat({ xx: 1 })
      }).line
    )
  ).toMatchInlineSnapshot('{}')
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
  ).toMatchInlineSnapshot(`
    {
      "feat": [Circular],
      "mod": {
        "core": [Circular],
        "staffNames": Set {},
        "staffs": Set {
          [Function],
          [Function],
        },
      },
      "xx": 1,
      "yy": 1,
    }
  `)
})
