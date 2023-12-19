import {
  defaultCacheOptions,
  deleteCache,
  setCache,
  timeout,
  useCache,
} from '@jumpalong/shared'
import { type Event } from 'nostr-tools'
import { debounceWatch } from 'packages/shared/src/vue'
import { reactive } from 'vue'
import { EventLine } from '..'
import {
  deserializeRelayConfiguration,
  deserializeTagRToReadWriteList,
  serializeRelayConfiguration,
} from '../event/tag'
import { ReadAndWriteConfigurationMap } from '../event/types'
import ConfigStaff from '../staff/staffs/config/ConfigStaff'
import EoseAutoUnSubStaff from '../staff/staffs/sub/EoseAutoUnSubStaff'
import TimeoutAutoUnSubStaff from '../staff/staffs/sub/TimeoutAutoUnSubStaff'
import ReplaceableSynchronizerAbstract from './abstract/ReplaceableSynchronizerAbstract'

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
 */
export class RelayConfiguratorSynchronizer extends ReplaceableSynchronizerAbstract<RelayConfiguration> {
  constructor(line: EventLine<{}>) {
    super(line, 'RelayConfigurator', {
      isAutoAddRelayUrl: true,
    })
  }
  createDefault(): RelayConfiguration {
    return {
      read: new Set(),
      write: new Set(),
      config: {},
    }
  }
  public async getFilters() {
    const pubkey = await this.getLine().getPubkeyOrNull()
    if (!pubkey) {
      return []
    }

    return [
      {
        kinds: [10002],
        authors: [pubkey],
      },
    ]
  }

  public async serializeToData(e: Event): Promise<RelayConfiguration> {
    const { relayConfiguration, readUrl, writeUrl } =
      deserializeRelayConfiguration(e.tags)

    return relayConfiguration
  }
  public async deserializeToEvent(
    data: RelayConfiguration,
    changeAt: number
  ): Promise<Event> {
    const tags = serializeRelayConfiguration(data.config)
    const event = await this.getLine().createEvent({
      kind: 10002,
      tags,
      created_at: changeAt,
    })
    return event
  }

  public getConfiguration() {
    return this.getDataSync()
  }
  public getWriteList() {
    return this.getConfiguration().write
  }
  public getReadList() {
    return this.getConfiguration().read
  }
  public getOtherList() {
    return this.getOtherUrls()
  }
  public addWriteRead(url: string) {
    this.addRead(url)
    this.addWrite(url)
  }
  public addWrite(url: string) {
    this.toChanged()
    this.getRule(url)['write'] = true
    this.getConfiguration().write.add(url)
  }
  public remoteWrite(url: string) {
    this.toChanged()
    this.getRule(url)['write'] = false

    this.getConfiguration().write.delete(url)
  }
  public addRead(url: string) {
    this.toChanged()
    this.getRule(url)['read'] = true
    this.getConfiguration().write.add(url)
  }
  public remoteRead(url: string) {
    this.toChanged()
    this.getRule(url)['read'] = false

    this.getConfiguration().read.delete(url)
  }
  public remove(url: string) {
    this.toChanged()
    delete this.getDataSync().config[url]

    this.getConfiguration().write.delete(url)
    this.getConfiguration().read.delete(url)
  }
  public setRule(url: string, read?: boolean, write?: boolean) {
    this.toChanged()
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
  public hasWriteByUrl(url: string) {
    return this.getWriteList().has(url)
  }

  public broadcast(options?: { slef?: object }) {
    const localEvent = this.getLocalEvent()
    if (!localEvent || localEvent.tags.length === 0) return

    const url = this.getOtherList()
    const opt = Object.assign(options?.slef ?? {}, {
      numberOfErrors: 0,
      numberOfSuccesses: 0,
      numberOfOvertime: 0,
      total: url.size,
    })

    const halReply = new Set()
    this.getLine().on(
      `ok:${localEvent.id}`,
      (eventId, { ok, message, url }) => {
        halReply.add(url)
        if (ok) {
          opt.numberOfSuccesses += 1
        } else {
          opt.numberOfErrors += 1
        }
      }
    )

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
      this.toGetRelayUrls.bind(this),
      getOtherUrlsCacheOptions
    )

    if (Array.isArray(arr)) {
      return new Set(arr)
    } else if (arr instanceof Set) {
      return arr
    } else {
      //这里可能得到了一个对象{}，原因是set在被序列化后就是一个obj，但是后面的更新算法没有执行，没有把obj替换为数组，这可能是加载完成之前就点击了刷新按钮造成的，所以认为需要删除缓存
      deleteCache(getOtherUrlsCacheKey)
      return this.toGetRelayUrls()
    }
  }
  toGetRelayUrls() {
    const otherList = reactive(new Set<string>())
    const line = this.getLine()
      .mod.add(EoseAutoUnSubStaff)
      .add(TimeoutAutoUnSubStaff)
      .add(ConfigStaff)
      .createAsATemplate()
      .chain('addFilter', { kinds: [10002], limit: 100 })
      .on('event', (url, e) => {
        const { write: writeUrl, read: readUrl } =
          deserializeTagRToReadWriteList(e.tags)
        for (const url of writeUrl) {
          otherList.add(url)
        }
        for (const url of readUrl) {
          otherList.add(url)
        }
      })

    setTimeout(async () => {
      const urls = Array.from(
        new Set(
          [...this.getReadList(), ...this.getWriteList(), ...defaultUrls].slice(
            0,
            10
          )
        )
      )

      let index = 0

      while (
        otherList.size < (line.config.getOtherUrlsRequestLimitSize ?? 50)
      ) {
        await timeout(2000)

        const url = urls[index]
        if (!url) return

        line.addUrl(url)

        index++
      }
    }, 0)

    debounceWatch(
      otherList,
      () => {
        setCache(getOtherUrlsCacheKey, [...otherList], getOtherUrlsCacheOptions)
      },
      {
        deep: true,
      }
    )

    return otherList
  }
}

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

export type RelayConfiguration = {
  read: Set<string>
  write: Set<string>
  config: ReadAndWriteConfigurationMap
}
