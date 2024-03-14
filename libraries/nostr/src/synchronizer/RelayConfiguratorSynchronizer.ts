import { EventLine, createClassStaff } from '@jumpalong/core'
import {
  RelayConfiguration,
  deserializeRelayConfiguration,
  serializeRelayConfiguration,
} from '@jumpalong/nostr-shared'
import { Filter, type Event } from 'nostr-tools'
import ReactiveClass from '../reactive/ReactiveClass'
import { ReplaceableSynchronizer } from './common'

export const defaultUrls: string[] = (window as any).defaultRelayUrls ?? [
  'wss://no.str.cr',
  'wss://no-str.org',
  'wss://nos.lol',
  'wss://nostr.com.de',
  'wss://relay.mostr.pub',
  'wss://relay.nostr.wirednet.jp',
  'wss://no-str.org',
  'wss://brb.io',
]

/**
 * 三层结构
 * - 内存层
 * - 本地配置
 * - relay 配置
 *
 * 1. 内存层用来实时和临时更改的，但刷新后就会消失
 * 2. 本地配置在点击保存后就会更新
 * 3. 在保存本地配置后，也会同步发往云端，但是发布行为不一定会成功
 *
 * 最高优先级为本地配置
 * 同步方法将云端取回本地
 */
export class RelayConfiguratorSynchronizer extends ReactiveClass {
  static Staff = createClassStaff(
    'relayConfigurator',
    RelayConfiguratorSynchronizer
  )
  replaceableSynchronizer: ReplaceableSynchronizer<RelayConfiguration>
  constructor(line: EventLine<{}>) {
    super(line)
    let self = this
    this.replaceableSynchronizer = new ReplaceableSynchronizer(
      line,
      {
        name: 'RelayConfigurator',
        createDefault: function (): RelayConfiguration {
          return {
            read: new Set(),
            write: new Set(),
            config: {},
          }
        },
        async deserializeToEvent(
          data: RelayConfiguration,
          changeAt: number
        ): Promise<Event> {
          const tags = serializeRelayConfiguration(data.config)
          const event = await self.getLine().createEvent({
            kind: 10002,
            tags,
            created_at: changeAt,
          })

          return event
        },
        async serializeToData(e: Event): Promise<RelayConfiguration> {
          const { relayConfiguration } = deserializeRelayConfiguration(e.tags)

          return relayConfiguration
        },
        async getFilters(): Promise<Filter[]> {
          const pubkey = await self.getLine().getPubkeyOrNull()
          if (!pubkey) {
            return []
          }

          return [
            {
              kinds: [10002],
              authors: [pubkey.toHex()],
            },
          ]
        },
      },
      {
        isAutoAddRelayUrl: true,
        autoSync: true,
      }
    )
  }
  hasChange() {
    this.replaceableSynchronizer.hasChange()
  }
  getLine() {
    return this.replaceableSynchronizer.synchronizer.getLine()
  }
  getDataSync() {
    return this.replaceableSynchronizer.getDataSync()
  }
  getData() {
    return this.replaceableSynchronizer.getDataSync()
  }

  public getConfiguration() {
    return this.replaceableSynchronizer.getDataSync()
  }
  public async initedGetWriteList() {
    await this.onInited()
    return this.getWriteList()
  }
  public getWriteList() {
    return this.getConfiguration().write
  }
  public async initedGetReadList() {
    await this.onInited()
    return this.getReadList()
  }
  public getReadList() {
    return this.getConfiguration().read
  }
  public async initedGetWriteReadList() {
    await this.onInited()
    return new Set([...this.getWriteList(), ...this.getReadList()])
  }
  public addWriteRead(url: string) {
    this.addRead(url)
    this.addWrite(url)
  }
  public addWrite(url: string) {
    this.replaceableSynchronizer.toChanged()
    this.getRule(url)['write'] = true
    this.getConfiguration().write.add(url)
  }
  public remoteWrite(url: string) {
    this.replaceableSynchronizer.toChanged()
    this.getRule(url)['write'] = false

    this.getConfiguration().write.delete(url)
  }
  public addRead(url: string) {
    this.replaceableSynchronizer.toChanged()
    this.getRule(url)['read'] = true
    this.getConfiguration().read.add(url)
  }
  public remoteRead(url: string) {
    this.replaceableSynchronizer.toChanged()
    this.getRule(url)['read'] = false

    this.getConfiguration().read.delete(url)
  }
  public remove(url: string) {
    this.replaceableSynchronizer.toChanged()
    delete this.replaceableSynchronizer.getDataSync().config[url]

    this.getConfiguration().write.delete(url)
    this.getConfiguration().read.delete(url)
  }
  public setRule(url: string, read?: boolean, write?: boolean) {
    this.replaceableSynchronizer.toChanged()
    if (!read && !write) {
      this.remove(url)
    } else {
      const rule = this.getRule(url)

      rule.read = Boolean(read)
      rule.write = Boolean(write)

      write
        ? this.getConfiguration().write.add(url)
        : this.getConfiguration().write.delete(url)
      read
        ? this.getConfiguration().write.add(url)
        : this.getConfiguration().write.delete(url)
    }
  }
  public getRule(url: string) {
    return (
      this.getConfiguration().config[url] ??
      (this.getConfiguration().config[url] = {} as any)
    )
  }
  public hasReadByUrl(url: string) {
    return this.getReadList().has(url)
  }
  public getUpdateAt() {
    return this.replaceableSynchronizer.getUpdateAt()
  }
  public hasWriteByUrl(url: string) {
    return this.getWriteList().has(url)
  }
  onInited(l?: () => void) {
    return this.replaceableSynchronizer.synchronizer.onInited(l)
  }

  clear() {
    this.replaceableSynchronizer.clear()
  }
  refresh() {
    this.clear()
    this.replaceableSynchronizer.synchronizer.sync()
  }
}
export namespace RelayConfiguratorSynchronizer {}

export function getEventTagRelayUrl(e: Event) {
  const rs = new Set<string>()
  e.tags.forEach(tag => {
    if (tag[0] === 'r') {
      rs.add(tag[1])
    }
  })
  return rs
}
