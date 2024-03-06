import { ParserMap, tagIsEq } from '../src/Synchronizer'

test('TagHandel', () => {
  expect(
    tagIsEq(
      { e: ParserMap.e },
      { type: 'e', id: 'xxx' } as any,
      { type: 'e', id: 'xxx' } as any
    )
  ).toMatchInlineSnapshot(`true`)
})
