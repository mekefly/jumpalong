import { copy, copyDep, createVote } from '../src/utils'
describe('createVote', () => {
  test('add', () => {
    let vote = createVote<boolean>({ max: 3, min: 3 })
    expect(vote.takeCountOfVotes()).toMatchInlineSnapshot(`Map {}`)

    vote.add(true)
    expect(vote.getBallotBox()).toMatchInlineSnapshot(`
      [
        true,
      ]
    `)

    vote.add(false)
    expect(vote.getBallotBox()).toMatchInlineSnapshot(`
      [
        false,
        true,
      ]
    `)

    vote.add(false)
    expect(vote.getBallotBox()).toMatchInlineSnapshot(`
      [
        false,
        false,
        true,
      ]
    `)

    vote.add(false)
    expect(vote.getBallotBox()).toMatchInlineSnapshot(`
      [
        false,
        false,
        false,
      ]
    `)

    vote.add(false)
    expect(vote.getBallotBox()).toMatchInlineSnapshot(`
      [
        false,
        false,
        false,
      ]
    `)

    vote.add(true)
    vote.add(true)
    vote.add(true)
    vote.add(true)

    expect(vote.getBallotBox()).toMatchInlineSnapshot(`
      [
        true,
        true,
        true,
      ]
    `)
  })
  test('takeCountOfVotes', () => {
    let vote = createVote<boolean>({ max: 3, min: 3 })
    expect(vote.takeCountOfVotes()).toMatchInlineSnapshot(`Map {}`)

    vote.add(true)
    expect(vote.takeCountOfVotes()).toMatchInlineSnapshot(`
      Map {
        true => 1,
      }
    `)

    vote.add(false)
    expect(vote.takeCountOfVotes()).toMatchInlineSnapshot(`
      Map {
        false => 1,
        true => 1,
      }
    `)

    vote.add(false)
    expect(vote.takeCountOfVotes()).toMatchInlineSnapshot(`
      Map {
        false => 2,
        true => 1,
      }
    `)

    vote.add(false)
    expect(vote.takeCountOfVotes()).toMatchInlineSnapshot(`
      Map {
        false => 3,
      }
    `)

    vote.add(false)
    expect(vote.takeCountOfVotes()).toMatchInlineSnapshot(`
      Map {
        false => 3,
      }
    `)
  })

  test('rate', () => {
    let vote = createVote<boolean>({ max: 3, min: 3 })
    expect(vote.takeCountOfVotes()).toMatchInlineSnapshot(`Map {}`)

    vote.add(true)
    expect(vote.rate(true, false)).toMatchInlineSnapshot(`Infinity`)

    vote.add(false)
    expect(vote.rate(true, false)).toMatchInlineSnapshot(`1`)

    vote.add(false)
    expect(vote.rate(true, false)).toMatchInlineSnapshot(`0.5`)

    vote.add(false)
    vote.add(false)
    expect(vote.rate(true, false)).toMatchInlineSnapshot(`0`)
  })
  test('proportion', () => {
    let vote = createVote<boolean>({ max: 3, min: 3 })
    vote.add(true)
    expect(vote.proportion(false)).toMatchInlineSnapshot(`0`)
    expect(vote.proportion(true)).toMatchInlineSnapshot(`1`)

    vote.add(true)
    expect(vote.proportion(false)).toMatchInlineSnapshot(`0`)
    expect(vote.proportion(true)).toMatchInlineSnapshot(`1`)

    vote.add(false)
    expect(vote.proportion(false)).toMatchInlineSnapshot(`0.3333333333333333`)
    expect(vote.proportion(true)).toMatchInlineSnapshot(`0.6666666666666666`)

    vote.add(false)
    expect(vote.proportion(false)).toMatchInlineSnapshot(`0.6666666666666666`)
    expect(vote.proportion(true)).toMatchInlineSnapshot(`0.3333333333333333`)

    vote.add(false)
    expect(vote.proportion(false)).toMatchInlineSnapshot(`1`)
    expect(vote.proportion(true)).toMatchInlineSnapshot(`0`)
  })
})
test('copy', () => {
  expect(['333']).toMatchInlineSnapshot(`
    [
      "333",
    ]
  `)
  expect(copyDep(['333'])).toMatchInlineSnapshot(`
    [
      "333",
    ]
  `)
  expect(copyDep({ xxx: '222' })).toMatchInlineSnapshot(`
    {
      "xxx": "222",
    }
  `)
  let obj = { yyy: '222' }
  expect(copyDep(obj) !== obj).toMatchInlineSnapshot(`true`)

  let obj1 = { zzz: { yyy: '333' } }
  expect(copyDep(obj1).zzz !== obj1.zzz).toMatchInlineSnapshot(`true`)
  expect(copyDep(obj1).zzz !== obj1.zzz).toMatchInlineSnapshot(`true`)
})
