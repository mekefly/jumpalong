import { defineMatch, match } from '../src/Match'

test('match', () => {
  let { yyy, zzz } = defineMatch<{ yyy: [11]; zzz: [22 | 33] }>()
  match(yyy(11), {
    yyy(value) {
      expect(value).toMatchInlineSnapshot(`11`)
    },
    zzz(value) {
      expect(value).toMatchInlineSnapshot()
    },
    _(value) {
      expect(value).toMatchInlineSnapshot()
    },
  })
})

test('match1', () => {
  let { yyy, zzz } = defineMatch<{ yyy: [11]; zzz: [22 | 33] }>()
  match(zzz(22), {
    yyy(value) {
      expect(value).toMatchInlineSnapshot()
    },
    zzz(value) {
      expect(value).toMatchInlineSnapshot(`22`)
    },
    _(value) {
      expect(value).toMatchInlineSnapshot()
    },
  })
})

test('match1', () => {
  let { yyy, zzz, xxx } = defineMatch<{ yyy: [11]; zzz: [22 | 33]; xxx: [] }>()
  let xxx = match(
    xxx(),
    {
      yyy(value) {
        expect(value).toMatchInlineSnapshot()
      },
      zzz(value) {
        expect(value).toMatchInlineSnapshot(`22`)
        return '3'
      },
    },
    xx => {
      match(xx, {
        xxx() {
          return 2
        },
      })
    }
  )
})
