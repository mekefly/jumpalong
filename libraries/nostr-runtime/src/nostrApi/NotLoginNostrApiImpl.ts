import { CommonNostrApiImpl } from './CommonNostrApiImpl'

export class NotLoginNostrApiImpl extends CommonNostrApiImpl {
  constructor() {
    super()
    this.nostrApiProvide.resolve({})
  }
}
