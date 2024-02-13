import '@jumpalong/logger'
import { objectFilter } from '@jumpalong/shared'
import { createStaff } from '../src/staff/staff'
import { EventLineFactory } from '../src/eventLine'

describe('staff', () => {
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
      "dependents": [Function],
      "id": "id-xx",
    }
  `)
  })

  test('具有依赖', () => {
    let xx = createStaff(l => l)
    let yy = createStaff(xx, 'id-xx', line => line.defineEmit<'3'>())
    expect(yy?.dependents?.()).toMatchInlineSnapshot(`
    [
      [Function],
    ]
  `)
    expect(yy.id).toMatchInlineSnapshot(`"id-xx"`)
  })

  test('staff:依赖自动注入', () => {
    //staff1
    let s1 = createStaff(l => {
      return l.assignFeat({ s1: true })
    })

    //staff2
    let s2 = createStaff(s1, l => l.assignFeat({ s2: true }))

    expect(s2).toMatchInlineSnapshot('[Function]')
    let l = new EventLineFactory().add(s2)
    expect(l.out().s1).toMatchInlineSnapshot(`true`)
    expect(l.out().s2).toMatchInlineSnapshot(`true`)
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
    let l = new EventLineFactory().add(s2)
    expect(l.out()).toMatchObject({ s1: true, s2: true })
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

    let l = new EventLineFactory().add(s66)
    expect(l.out()).toMatchObject({
      s1: true,
      s2: true,
      s3: true,
      s4: true,
      s5: true,
      s6: true,
    })
  })

  test('数组依赖注入', () => {
    let s1 = createStaff(m => m.assignFeat({ x1: 1 }))
    let s2 = createStaff([s1], m => m.assignFeat({ x2: 2 }))
    let l = new EventLineFactory().add(s2)
    expect(l.out()).toMatchObject({
      x1: 1,
      x2: 2,
    })
  })

  test('函数依赖注入', () => {
    let s1 = createStaff(m => m.assignFeat({ x1: 1 }))
    let s2 = createStaff(
      () => [s1],
      m => m.assignFeat({ x2: 2 })
    )
    let l = new EventLineFactory().add(s2)
    expect(l.out()).toMatchObject({
      x1: 1,
      x2: 2,
    })
  })
  test('函数依赖注入,具有id', () => {
    let s1 = createStaff(m => m.assignFeat({ x1: 1 }))
    let s2 = createStaff(
      () => [s1],
      'name-test',
      m => m.assignFeat({ x2: 2 })
    )
    expect(s2.id).toMatchInlineSnapshot(`"name-test"`)
    let l = new EventLineFactory().add(s2)
    expect(l.out()).toMatchObject({
      x1: 1,
      x2: 2,
    })
  })
  test('循环依赖', () => {
    let xx = {} as any

    xx.s1 = createStaff(
      () => [xx.s2],
      m => m.assignFeat({ x1: 1 })
    )

    xx.s2 = createStaff(
      () => [xx.s1],
      m => m.assignFeat({ x2: 2 })
    )

    let l = new EventLineFactory().add(xx.s2)

    expect(l.out()).toMatchObject({
      x1: 1,
      x2: 2,
    })
  })
})
