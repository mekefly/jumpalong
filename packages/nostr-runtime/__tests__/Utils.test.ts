import { generatePrivateKey } from '../src/utils/user'
import { createDate } from './utils'

test('generatePrivateKey', () => {
  expect(generatePrivateKey().length).toMatchInlineSnapshot(`64`)

  expect(typeof generatePrivateKey()).toMatchInlineSnapshot(`"string"`)
})
test('createDate', () => {
  let t = createDate('2023.4.3 10:23')
  expect(t).toMatchInlineSnapshot(`1680488580`)
  expect(new Date(t * 1000).toJSON()).toMatchInlineSnapshot(
    `"2023-04-03T02:23:00.000Z"`
  )
  expect(createDate('2023-04-03T02:23:00.000Z')).toMatchInlineSnapshot(
    `1680488580`
  )
})
