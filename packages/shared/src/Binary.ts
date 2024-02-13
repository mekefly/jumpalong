export default class Binary {
  //binary bits
  binaryBits = 16
  uint16Array: Uint16Array
  get hexBits() {
    return this.binaryBits / 4
  }
  //二进制位数
  constructor(_arr: Array<number>) {
    this.uint16Array = new Uint16Array(_arr)
  }

  static fromHex(hex: string) {
    let hexBits = 4
    let arr: number[] = []
    for (let index = hex.length - 1; index >= 0; index -= hexBits) {
      let l = index - hexBits
      let left = l < 0 ? 0 : l
      let b = hex.slice(left, index + 1)
      arr[Math.floor(index / hexBits)] = parseInt(b, 16)
    }
    return new Binary(arr)
  }
  static fromStr(binary: string) {
    let binaryBits = 16
    let arr: number[] = []
    for (let index = binary.length - 1; index >= 0; index -= binaryBits) {
      let l = index - binaryBits
      let left = l < 0 ? 0 : l
      let b = binary.slice(left, index + 1)
      arr[Math.floor(index / 16)] = parseInt(b, 2)
    }

    return new Binary(arr)
  }
  XOR(b: Binary) {
    if (this.uint16Array.length > b.uint16Array.length) {
      return this._XOR(b, this)
    } else {
      return this._XOR(this, b)
    }
  }
  //left小 right大
  private _XOR(shortBin: Binary, longBin: Binary) {
    let shortLength = shortBin.uint16Array.length
    let longLength = longBin.uint16Array.length
    let arr = new Array(longLength)
    for (let i = 0; i < shortLength; i++) {
      arr[i] = shortBin.uint16Array[i] ^ longBin.uint16Array[i]
    }
    arr.push(...longBin.uint16Array.slice(shortLength))
    return new Binary(arr)
  }
  toString(n: number = 2) {
    let str = ''
    for (let i = this.uint16Array.length - 1; i >= 0; i--) {
      let item = this.uint16Array[i]
      str =
        item.toString(n).padStart(Math.log(1 << 16) / Math.log(n), '0') + str
    }
    return str
  }
  get(l: number) {
    let n = this.uint16Array.length - 1 - Math.floor(l / this.binaryBits)
    let s = l % this.binaryBits

    return Boolean(this.uint16Array[n] & (1 << s))
  }

  //对特征压缩
  //00001111000011110000111100001111->11001100110011
  //00110011001100110011001100110011->101010101010101
  characteristic() {
    if (this.uint16Array.length === 1) {
      return this.uint16Array[0]
    }
    let len = this.uint16Array.length
    let result = 0
    let byteIndex = 0

    for (let i = 0; i < this.binaryBits; i++) {
      let tNum = 0
      for (let i = 0; i < len; i++) {
        if (this.get(byteIndex)) {
          tNum++
        }

        byteIndex++
      }

      if (tNum / len > 0.5) {
        result = result | (1 << i)
      }
    }
    return result
  }
  leadingZeroNumber() {
    let n = 0
    for (let i = this.uint16Array.length * 16 - 1; i >= 0; i--) {
      if (this.get(i)) {
        return n
      }
      n++
    }
    return n
  }
}
