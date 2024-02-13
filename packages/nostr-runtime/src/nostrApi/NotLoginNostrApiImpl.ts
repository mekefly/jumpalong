import { CommonNostrApiImpl } from './CommonNostrApiImpl'

export class NotLoginNostrApiImpl extends CommonNostrApiImpl {
  constructor() {
    super(async () => ({}))
  }
}
