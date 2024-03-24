import AuthStaff from './AuthStaff'
import CloseRelayStaff from './CloseRelayStaff'
import WebSocketStaff from './WebSocketFactoryStaff'
import ReactiveClass from '../reactive/ReactiveClass'
import {
  ClassStaffInterface,
  EventLine,
  warpClassWithStaff,
} from '@jumpalong/core'
import { createGetValue } from '@jumpalong/shared'
import { EoseStaff, EventStaff, OkStaff } from '..'
import PublishEmitStaff from '../publish/PublishEmitStaff'
import SubEmitStaff from '../sub/SubEmitStaff'
import Relay from './Relay'

export const Pool = warpClassWithStaff(
  { name: 'relayPool', id: 'pool-staff' },
  class Pool extends ReactiveClass implements ClassStaffInterface<'relayPool'> {
    // static Staff = createStaff('relayPool',ReactiveClass)
    name = 'relayPool' as const
    public getLine
    public pool = new Map<string, Relay>()
    public allSubIds = new Set()
    constructor(parentLine: EventLine<{}>) {
      super(parentLine)

      this.getLine = createGetValue(() =>
        parentLine
          .createChild()
          .add(WebSocketStaff)
          .add(SubEmitStaff)
          .add(SubEmitStaff)
          .add(PublishEmitStaff)
          .add(CloseRelayStaff)
          .add(AuthStaff)
          .add(EventStaff)
          .add(EoseStaff)
          .add(OkStaff)
      )
      this.listen()
    }
    async listen() {
      logger.debug('listen')

      this.getLine().on('sub', async (url, filters, subId) => {
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
)
