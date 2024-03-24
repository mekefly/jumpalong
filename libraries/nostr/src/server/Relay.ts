import EventStaff from '../event/EventStaff'
import type { EventLine } from '@jumpalong/core'
import { cached, createTaskQueue } from '@jumpalong/shared'
import { type Event, type Filter } from 'nostr-tools'
import { verifyEvent } from 'nostr-tools/pure'
import PublishStaff from '../publish/PublishStaff'
import AuthStaff from './AuthStaff'
import CloseRelayStaff from './CloseRelayStaff'
import EoseStaff from './EoseStaff'
import NoticeStaff from './NoticeStaff'
import OkStaff from './OkStaff'
import { Pool } from './Pool'
$LoggerScope()
let queue = createTaskQueue(10)

export default class Relay {
  ws: WebSocket
  subIds: Set<string> = new Set()
  private timeout: any = undefined
  private isClose: boolean = false
  publishIds: Set<string> = new Set()

  constructor(private _line: EventLine<{}>, ws: WebSocket) {
    this.ws = ws
    this.ws.onmessage = (...rest) => {
      queue.unShift(() => {
        this.handleMessage(...rest)
      })
    }
  }
  getLine = cached(() =>
    this._line.add(
      Pool.Staff,
      CloseRelayStaff,
      AuthStaff,
      PublishStaff,
      OkStaff,
      EoseStaff,
      NoticeStaff,
      EventStaff
    )
  )

  handleMessage(ev: MessageEvent<string>) {
    try {
      const data = JSON.parse(ev.data)

      logger.http('handleMessage', this.ws.url, data)

      let subId = ''
      if (Array.isArray(data)) {
        switch (data[0]) {
          case 'EVENT':
            subId = data[1]
            let event = data[2]

            if (!verifyEvent(event)) {
              logger.error('Event signature error')
              return
            }
            // if (!verifySignature(event)) {
            //   logger.error('Event signature error')
            //   return
            // }

            this.getLine().emitEvent(subId, event, this.ws.url)
            break
          case 'NOTICE':
            this.getLine().emit('notice', data[1], this.ws.url)
            break
          case 'EOSE':
            subId = data[1]
            this.getLine().emitEose(subId, this.ws.url)
            break
          case 'OK':
            let eventId: string = data[1]

            this.getLine().emitOK(eventId, {
              ok: data[2] as any,
              message: data[3],
              url: this.ws.url,
            })
            this.closePublish(eventId)
            break
          case 'AUTH':
            const challenge = data[1]
            this.getLine().emit('auth', this.ws.url, challenge)
            break
          default:
            break
        }
      }
    } catch (error) {
      return
    }
  }
  auth(event: Event) {
    this.send(['AUTH', event])
  }
  send(v: [string, ...any]) {
    logger.http('send:', v[0], this.ws.url, v)
    ;(window as any).sendCount++
    this.ws.send(JSON.stringify(v))
  }
  createSubId() {
    return Math.random().toString().slice(2)
  }
  req(filters: Filter[], subId = this.createSubId()) {
    this.addSubId(subId)
    try {
      this.send(['REQ', subId, ...filters])
    } catch (error) {
      this.deleteSubId(subId)
    }

    return subId
  }
  closePublish(id: string) {
    if (!this.publishIds.has(id)) return

    this.publishIds.delete(id)
    this.autoClose()
  }
  publish(e: Event) {
    this.send(['EVENT', e])
    this.publishIds.add(e.id)

    //超时
    setTimeout(() => {
      this.closePublish(e.id)
    }, 60000)
  }

  closeReq(subId: string) {
    if (!this.subIds.has(subId)) return

    this.send(['CLOSE', subId])
    this.deleteSubId(subId)
  }

  addSubId(subId: string) {
    if (this.isClose) {
      this.isClose = true
      this.getLine().relayPool.getPool().set(this.ws.url, this)
    }
    this.subIds.add(subId)
    this.getLine().relayPool.allSubIds.add(subId)
  }
  deleteSubId(subId: string) {
    if (!this.subIds.has(subId)) return

    this.subIds.delete(subId)
    this.getLine().relayPool.allSubIds.delete(subId)
    this.getLine().removeAllListener(`event:${subId}`)

    this.autoClose()
  }
  close() {
    if (this.isClose) return
    this.isClose = true

    for (const subId of this.subIds) {
      this.deleteSubId(subId)
    }
    this.ws.close()
    this.getLine().relayPool.closeRelay(this.ws.url)
    //@ts-ignore
    this.getLine().emit(`relay-closed:${this.ws.url}`)
  }
  clearAutoClose() {
    clearTimeout(this.timeout)
    this.timeout = undefined
  }
  autoClose(isTimeoutCall: boolean = false) {
    if (this.subIds.size > 0 || this.publishIds.size > 0) return

    if (isTimeoutCall) {
      this.close()
    } else {
      this.timeout = setTimeout(() => {
        this.autoClose(true)
      }, 60000) //60秒没有操作就关闭连接
    }
  }
}
