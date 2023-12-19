import { objectFilter } from '@jumpalong/shared'
import { test, expect } from 'vitest'
import { createStaff } from '../src/staff/staff'
import { EventLineFactory } from '../src/eventLine'

test('创建Staff应返回一个函数', () => {
  expect(createStaff(line => line.defineEmit<'3'>())).toMatchInlineSnapshot(
    '[Function]'
  )
})
test('具有名字', () => {
  expect(
    objectFilter(
      createStaff('id-xx', line => line.defineEmit<'3'>()),
      'id',
      'dependents'
    )
  ).toMatchInlineSnapshot(`
    {
      "dependents": [],
      "id": "id-xx",
    }
  `)
})

test('具有依赖', () => {
  let xx = createStaff(l => l)
  expect(
    objectFilter(
      createStaff(xx, 'id-xx', line => line.defineEmit<'3'>()),
      'id',
      'dependents'
    )
  ).toMatchInlineSnapshot(`
    {
      "dependents": [
        [Function],
      ],
      "id": "id-xx",
    }
  `)
})

test('staff:依赖自动注入', () => {
  //staff1
  let s1 = createStaff(l => {
    return l.assignFeat({ s1: true })
  })

  //staff2
  let s2 = createStaff(s1, l => l.assignFeat({ s2: true }))

  expect(s2).toMatchInlineSnapshot('[Function]')
  expect(s2(new EventLineFactory())).toMatchInlineSnapshot(`
    EventLineFactory {
      "core": EventLineEmitter {
        "emitter": LineEmitter {
          "_returnEmitter": null,
          "events": {},
          "isRunMap": Map {},
        },
        "feat": [Circular],
        "mod": [Circular],
        "s2": true,
      },
      "staffNames": Set {},
      "staffs": Set {},
    }
  `)
})
test('staff:依赖重复注入', () => {
  //staff1
  let n = 0
  let s1 = createStaff(l => {
    //只会执行一次
    expect(n++).toMatchSnapshot()
    return l.assignFeat({ s1: true })
  })

  //staff2
  let s2 = createStaff(s1, s1, l => l.assignFeat({ s2: true }))

  expect(s2).toMatchInlineSnapshot('[Function]')
  expect(s2(new EventLineFactory())).toMatchInlineSnapshot(`
    EventLineFactory {
      "core": EventLineEmitter {
        "emitter": LineEmitter {
          "_returnEmitter": null,
          "events": {},
          "isRunMap": Map {},
        },
        "feat": [Circular],
        "mod": [Circular],
        "s2": true,
      },
      "staffNames": Set {},
      "staffs": Set {},
    }
  `)
})

test('staff:具名注入', () => {
  //staff1
  let n = 0
  let s1 = createStaff(function xxx(l) {
    return l.assignFeat({ s1: true })
  })

  //staff2
  let s2 = createStaff(s1, function xxx(l) {
    return l.assignFeat({ s2: true })
  })

  expect(s2(new EventLineFactory())).toMatchInlineSnapshot(`
    EventLineFactory {
      "core": EventLineEmitter {
        "emitter": LineEmitter {
          "_returnEmitter": null,
          "events": {},
          "isRunMap": Map {},
        },
        "feat": [Circular],
        "mod": [Circular],
        "s2": true,
      },
      "staffNames": Set {},
      "staffs": Set {},
    }
  `)
})

test('staff:复杂依赖', () => {
  //staff1
  let n = 0
  let s11 = createStaff(function s1(l) {
    return l.assignFeat({ s1: true })
  })

  //staff2
  let s22 = createStaff(s11, function s1(l) {
    return l.assignFeat({ s2: true })
  })
  let s33 = createStaff(s11, function s3(l) {
    return l.assignFeat({ s3: true })
  })
  let s44 = createStaff(s22, function s3(l) {
    return l.assignFeat({ s4: true })
  })
  let s55 = createStaff(s44, function s5(l) {
    return l.assignFeat({ s5: true })
  })
  let s66 = createStaff(s11, s22, s33, s44, s55, function s2(l) {
    return l.assignFeat({ s6: true })
  })

  expect(new EventLineFactory().add(s66)).toMatchInlineSnapshot(`
    EventLineFactory {
      "core": EventLineEmitter {
        "emitter": LineEmitter {
          "_returnEmitter": null,
          "events": {},
          "isRunMap": Map {},
        },
        "feat": [Circular],
        "mod": [Circular],
        "s1": true,
        "s2": true,
        "s3": true,
        "s4": true,
        "s5": true,
        "s6": true,
      },
      "staffNames": Set {},
      "staffs": Set {
        [Function],
        [Function],
        [Function],
        [Function],
        [Function],
        [Function],
      },
    }
  `)
})
