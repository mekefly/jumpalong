import { defaultCacheOptions, deleteCache, useCache } from '@jumpalong/shared'
import { Filter, type Event } from 'nostr-tools'
import {
  RelayConfiguration,
  deserializeRelayConfiguration,
  serializeRelayConfiguration,
} from '@jumpalong/nostr-shared'
import { ReplaceableSynchronizer } from './common'
import ReactiveClass from '../reactive/ReactiveClass'
import { EventLine, createStaffClass } from '@jumpalong/core'

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
export var RelayConfiguratorSynchronizer = createStaffClass(
  'relayConfigurator',
  class RelayConfiguratorSynchronizer extends ReactiveClass {
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
    public getOtherList() {
      return this.getOtherUrls()
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

    public broadcast(options?: { slef?: object }) {
      const localEvent = this.replaceableSynchronizer.getLocalEvent()
      if (!localEvent || localEvent.tags.length === 0) return

      const url = this.getOtherList()
      const opt = Object.assign(options?.slef ?? {}, {
        numberOfErrors: 0,
        numberOfSuccesses: 0,
        numberOfOvertime: 0,
        total: url.size,
      })

      const halReply = new Set()
      this.getLine()
        .relayPool.getLine()
        .on(`ok:${localEvent.id}`, (eventId, { ok, message, url }) => {
          halReply.add(url)
          if (ok) {
            opt.numberOfSuccesses += 1
          } else {
            opt.numberOfErrors += 1
          }
        })

      this.getLine().publishes(url, localEvent)

      setTimeout(() => {
        url.forEach(url => {
          if (halReply.has(url)) return

          opt.numberOfOvertime += 1
        })
      }, 1000 * 30)

      return opt
    }

    getOtherUrls() {
      const arr = useCache(
        getOtherUrlsCacheKey,
        () => this.getLine().getGlobalUrls(),
        getOtherUrlsCacheOptions
      )

      if (Array.isArray(arr)) {
        return new Set(arr)
      } else if (arr instanceof Set) {
        return arr
      } else {
        //这里可能得到了一个对象{}，原因是set在被序列化后就是一个obj，但是后面的更新算法没有执行，没有把obj替换为数组，这可能是加载完成之前就点击了刷新按钮造成的，所以认为需要删除缓存
        deleteCache(getOtherUrlsCacheKey)
        return this.getLine().getGlobalUrls()
      }
    }
    clear() {
      this.replaceableSynchronizer.clear()
    }
    refresh() {
      this.clear()
      this.replaceableSynchronizer.synchronizer.sync()
    }
  }
)

export function getEventTagRelayUrl(e: Event) {
  const rs = new Set<string>()
  e.tags.forEach(tag => {
    if (tag[0] === 'r') {
      rs.add(tag[1])
    }
  })
  return rs
}
const getOtherUrlsCacheKey = '__other_urls'
const getOtherUrlsCacheOptions = {
  ...defaultCacheOptions,
  useLocalStorage: true,
  duration: 1000 * 60,
}
