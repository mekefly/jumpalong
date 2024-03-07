import WebSocketStaff from './WebSocketFactoryStaff'
import CloseRelayStaff from './CloseRelayStaff'
import AuthStaff from './AuthStaff'
import {
  ClassStaff,
  ClassStaffInterface,
  createClassStaff,
  createStaff,
} from '../../staff'
import { EventLine } from '../../../eventLine'
import Relay from './Relay'
import OkStaff from './OkStaff'
import EoseStaff from './EoseStaff'
import NoticeStaff from './NoticeStaff'
import EventStaff from '../eventStaff/EventStaff'
import { cached } from '@jumpalong/shared'
import SubEmitStaff from '../sub/SubEmitStaff'
import SubStaff from '../sub/SubStaff'
import PublishEmitStaff from '../publish/PublishEmitStaff'
import PublishStaff from '../publish/PublishStaff'
import ReactiveClass from '../../../reactive/ReactiveClass'
//@LoggerScope

export default createStaff('pool-staff', ({ mod, line }) => {
  logger.debug('pool-staff')

  return mod.add(Pool)
})

export class Pool
  extends ReactiveClass
  implements ClassStaffInterface<'relayPool'>
{
  name = 'relayPool' as const
  constructor(private parentLine: EventLine<{}>) {
    super(parentLine)
    this.listen()
  }
  public getLine = cached(() =>
    this.parentLine.createChild().add(
      WebSocketStaff,
      AuthStaff,
      CloseRelayStaff,
      OkStaff,
      EoseStaff,
      NoticeStaff,
      EventStaff,
      //pool,api
      SubStaff,
      PublishStaff,
      //emits
      SubEmitStaff,
      PublishEmitStaff
    )
  )
  pool = new Map<string, Relay>()
  allSubIds = new Set()
  async listen() {
    logger.debug('listen')

    this.getLine().on('sub', async (url, filters, subId) => {
      console.log('on sub')

      logger.http('sub', url, subId, filters)
      const relay = await this.getRelay(url)

      relay.req(filters, subId)
    })
    this.getLine().on('desub', async (subId, url) => {
      logger.http('desub', url, subId)
      if (!this.allSubIds.has(subId)) return
      this.allSubIds.delete(subId)

      const relay = this.getRelayFromPool(url)
      if (!relay) {
        return
      }
      relay.closeReq(subId)
    })
    this.getLine().on('publish', async (url, event) => {
      logger.http('publish', url, event)
      const relay = await this.getRelay(url)
      relay.publish(event)
    })
    this.getLine().on('closeRelay', async url => {
      logger.http('closeRelay', url)
      const relay = this.getRelayFromPool(url)
      if (!relay) {
        return
      }
      relay.close()
    })
    this.getLine().on('auth', async (url, event) => {
      logger.http('auth', url, event)
      const relay = await this.getRelay(url)
      relay.auth(event)
    })
  }
  getPool() {
    return this.pool
  }
  async getRelay(url: string) {
    const relay = this.pool.get(url)
    if (!relay) {
      return await this.createRelay(url)
    }
    return relay
  }
  getRelayFromPool(url: string) {
    const relay = this.pool.get(url)
    return relay
  }
  closeRelay(url: string) {
    if (!this.pool.has(url)) return
    let r = this.getRelayFromPool(url)

    if (r) {
      for (const subId of r.subIds) {
        this.allSubIds.delete(subId)
      }
      r.close()
    }
    this.pool.delete(url)
  }
  async createRelay(url: string) {
    return new Promise<Relay>(async (res, rej) => {
      const ws = await this.getLine().webSocketFactory(url)

      ws.onerror = ws.onclose = () => {
        this.closeRelay(url)
      }

      const relay = new Relay(this.getLine() as any, ws)
      this.pool.set(url, relay)

      res(relay)
    })
  }
}
