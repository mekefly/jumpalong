import Binary from '../src/Binary'

test('fromHex', () => {
  expect(Binary.fromHex('ffff')).toMatchInlineSnapshot(`
    Binary {
      "binaryBits": 16,
      "uint16Array": Uint16Array [
        65535,
      ],
    }
  `)
  expect(Binary.fromHex('fff')).toMatchInlineSnapshot(`
    Binary {
      "binaryBits": 16,
      "uint16Array": Uint16Array [
        4095,
      ],
    }
  `)

  expect(Binary.fromHex('fffff').toString(16)).toMatchInlineSnapshot(
    `"000fffff"`
  )
  expect(Binary.fromHex('000fffff').toString(16)).toMatchInlineSnapshot(
    `"000fffff"`
  )
})
test('fromStr', () => {
  expect(Binary.fromStr('111').uint16Array.length).toMatchInlineSnapshot(`1`)
  expect(Binary.fromStr('11000').toString()).toMatchInlineSnapshot(
    `"0000000000011000"`
  )
  expect(Binary.fromStr('10101010101010').toString()).toMatchInlineSnapshot(
    `"0010101010101010"`
  )

  expect(Binary.fromStr('11100000000001111').toString()).toMatchInlineSnapshot(
    `"00000000000000011100000000001111"`
  )
})
test('XOR', () => {
  let l = Binary.fromHex('fff')
  let r = Binary.fromHex('ffff')
  expect(l.toString()).toMatchInlineSnapshot(`"0000111111111111"`)
  expect(r.toString()).toMatchInlineSnapshot(`"1111111111111111"`)
  expect(
    Binary.fromHex('fff').XOR(Binary.fromHex('ffff')).toString(2)
  ).toMatchInlineSnapshot(`"1111000000000000"`)
})
test('characteristic', () => {
  expect(
    Binary.fromStr('00001111000011110000111100001111')
      .characteristic()
      .toString(2)
  ).toMatchInlineSnapshot(`"11001100110011"`)

  expect(
    Binary.fromStr('00110011001100110011001100110011')
      .characteristic()
      .toString(2)
  ).toMatchInlineSnapshot(`"101010101010101"`)
})
test('get', () => {
  expect(Binary.fromStr('0000100').get(2)).toMatchInlineSnapshot(`true`)
  expect(Binary.fromStr('100').get(1)).toMatchInlineSnapshot(`false`)
  expect(Binary.fromStr('110000100').get(7)).toMatchInlineSnapshot(`true`)

  expect(Binary.fromStr('10000000000000001').get(0)).toMatchInlineSnapshot(
    `true`
  )
  expect(Binary.fromStr('10000000000000000').get(0)).toMatchInlineSnapshot(
    `false`
  )

  expect(Binary.fromStr('10000000000000000').get(16)).toMatchInlineSnapshot(
    `true`
  )
})
test('leadingZeroNumber', () => {
  expect(Binary.fromStr('000').leadingZeroNumber()).toMatchInlineSnapshot(`16`)
  expect(Binary.fromStr('000100').leadingZeroNumber()).toMatchInlineSnapshot(
    `13`
  )

  expect(Binary.fromStr('0001').leadingZeroNumber()).toMatchInlineSnapshot(`15`)
})
