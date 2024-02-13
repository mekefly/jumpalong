import '@jumpalong/logger'

import {
  LocalStorageMap,
  ReversePromise,
  cached,
  setAdds,
} from '@jumpalong/shared'
import type { Event, Filter } from 'nostr-tools'
import { EventLineFactory } from '../../eventLine'
import { type RelayConfiguratorSynchronizer } from '../RelayConfiguratorSynchronizer'
import ReactiveClass from '../../reactive/ReactiveClass'

import AutoAddUrlByGlobalDiscoveryUserStaff from '../../staff/staffs/globalDiscoveryUser/AutoAddUrlByGlobalDiscoveryUserStaff'
import NostrApiStaff from '../../staff/staffs/login/NostrApiStaff'
import EoseAutoUnSubStaff from '../../staff/staffs/sub/EoseAutoUnSubStaff'
import TimeoutAutoUnSubStaff from '../../staff/staffs/sub/TimeoutAutoUnSubStaff'
import AutoAddKind10002UrlStaff from '../../staff/staffs/globalDiscoveryUser/AutoAddKind10002UrlStaff'
import CreateIdStaff from '../../staff/staffs/common/CreateIdStaff'
import RelayConfiguratorSynchronizerStaff from '../../staff/staffs/synchronizer/RelayConfiguratorSynchronizerStaff'
import AddStaff from '../../staff/staffs/staff/AddStaff'
import ManagerStaff from '../../staff/staffs/manager/ManagerStaff'
import SubStaff from '../../staff/staffs/sub/SubStaff'
import RelayEmitterStaff from '../../staff/staffs/server/RelayEmitterStaff'
import PublishStaff from '../../staff/staffs/publish/PublishStaff'
import LoginStaff from '../../staff/staffs/login/LoginStaff'
import GlobalDiscoveryUserStaff from '../../staff/staffs/globalDiscoveryUser/GlobalDiscoveryUserStaff'
$LoggerScope()

export type SyncOption = {
  moreUrls?: Set<string>
  onEvent?(e: Event, url: string): void
  onPush?(url: string): void
  isAutoAddRelayUrl?: boolean
  autoSync?: boolean
}
export type SynchronizerAbstractOption = {} & SyncOption
export default abstract class SynchronizerAbstract<E> extends ReactiveClass {
  static list: SynchronizerAbstract<any>[] = []
  static add(synchronizer: SynchronizerAbstract<any>) {
    SynchronizerAbstract.list.push(synchronizer)
  }
  static syncAll() {
    for (const item of SynchronizerAbstract.list) {
      item.sync()
    }
  }

  static clearAll() {
    for (const item of SynchronizerAbstract.list) {
      item.clear()
    }
  }

  private options: SynchronizerAbstractOption
  private name: string
  private eventMap: LocalStorageMap<Event>
  private getMod = cached(
    () =>
      this.parentLine
        .createChild()
        .add(
          CreateIdStaff,
          RelayConfiguratorSynchronizerStaff,
          SubStaff,
          AddStaff,
          ManagerStaff,
          RelayEmitterStaff,
          PublishStaff,
          NostrApiStaff,
          LoginStaff,
          GlobalDiscoveryUserStaff,
          EoseAutoUnSubStaff,
          TimeoutAutoUnSubStaff,
          AutoAddUrlByGlobalDiscoveryUserStaff
        )
        .add(mod => {
          return mod.defineEmit<'synchronizer-update', [event: Event]>(
            'synchronizer-update'
          )
        }).mod
  )
  private _ready = new ReversePromise()
  public async onInited(l?: () => void) {
    l && this._ready.promise.then(l)
    return this._ready.promise
  }

  constructor(
    private parentLine = new EventLineFactory().out(),
    name: string,
    opts?: SynchronizerAbstractOption
  ) {
    super(parentLine)
    //添加到同步列表
    SynchronizerAbstract.add(this)

    //init
    this.options = opts ?? {}
    this.name = name
    this.eventMap = new LocalStorageMap(`__key_list:${name}`)
    this.init(opts)
  }

  async init(opt?: SynchronizerAbstractOption) {
    await this.readEventMap()
    opt?.autoSync && (await this.sync())
    this._ready.toResolve()
  }

  getParentLine() {
    return this.parentLine
  }
  getLine() {
    return this.getMod().out()
  }

  abstract getFilters(): Promise<Filter[]>

  /**
   * 将事件序列化为你所需要的数据
   * @param e
   */
  abstract serializeToData(e: Event): Promise<E>

  /**
   * 将你的数据序列为存储和同步时需要使用的event
   * @param data
   * @param changeAt
   */
  abstract deserializeToEvent(data: E, changeAt: number): Promise<Event>

  abstract eventToFilter(event: Event): Promise<Filter[]>
  async createKeyByEvent(event: Event): Promise<string> {
    return await this.createKey(await this.eventToFilter(event))
  }
  abstract createKey(filter: Filter[]): Promise<string>

  abstract setData(key: string, value: E): Promise<void>
  abstract getData(key: string): Promise<E | null>
  abstract getDataKeys(): Promise<Iterable<string>>

  public async readEventMap() {
    const eventMap = this.eventMap.getMap()

    for (const [cacheKey, event] of eventMap) {
      const v = await this.serializeToData(event)
      const key = this.cacheKeyToKey(cacheKey)
      this.setData(key, v)
    }
  }

  /**
   * 更改本地的event
   * @param event
   */
  public async setLocalEvent(event: Event) {
    const key = await this.createKeyByEvent(event)
    this.setEvent(key, event)
  }
  public getEvent(key: string): Event | null {
    return this.eventMap.get(this.createEventCacheKey(key))
  }
  public setEvent(key: string, event: Event): void {
    this.eventMap.set(this.createEventCacheKey(key), event)
  }
  private createEventCacheKey(key: string) {
    return `${this.name}:${key}`
  }
  private cacheKeyToKey(cacheKey: string) {
    return cacheKey.slice(this.name.length + 1)
  }
  public async getChangeAtByFilter(filter: Filter[]) {
    const key = await this.createKey(filter)

    return this.getData(key)
  }

  /**
   * 获取最新一次保存的时间
   * @returns
   */
  public getUpdateAt(key: string) {
    const event = this.getEvent(key)
    if (!event) return null
    return event.created_at
  }

  /**
   * 当改变数据对象时需要调用
   */
  abstract toChanged(key: string): Promise<void>

  private async getIsChanged(key: string): Promise<boolean> {
    return !!(await this.getChangeAt(key))
  }

  abstract getChangeAt(key: string): Promise<number | null>
  abstract changesSaved(key: string): Promise<void>

  // private createEventBeltline() {
  //   return this.getLine().createChild()
  // }

  private getRelayConfigurator(): RelayConfiguratorSynchronizer {
    return this.getLine().relayConfigurator
  }
  public async syncOne(url: string, opts?: SyncOption) {
    logger.debug(this.name, 'syncOne')

    const urls: Set<string> = new Set()
    urls.add(url)

    let filters = await this.getFilters()
    if (filters.length === 0) return

    let l = await this._sync(filters, opts)
    l.on('synchronizer-update', e => {
      l.publishes(
        setAdds(
          new Set(),
          this.getRelayConfigurator().getWriteList(),
          this.getRelayConfigurator().getReadList()
        ),
        e
      )
    })

    l.addUrls(urls)
  }
  /**
   * 同步读写列表
   */
  public async sync(opts: SyncOption = {}) {
    opts = Object.assign({}, this.options, opts)

    logger.silly(this.name, 'sync', opts, this.options)

    const urls: Set<string> = setAdds(
      new Set(),
      this.getRelayConfigurator().getWriteList(),
      this.getRelayConfigurator().getReadList(),
      opts?.moreUrls
    )
    logger.silly('sync:urls', urls)

    let filters = await this.getFilters()
    if (filters.length === 0) return

    logger.silly('sync:filters', filters)

    let l = await (
      await this._sync(filters, opts)
    ).add(AutoAddKind10002UrlStaff)

    logger.silly('sync:urls', l)

    l.addUrls(urls)
    for (const filter of filters) {
      if (!filter.authors) continue
      for (const pubkey of filter.authors) {
        l.autoAdd10002(pubkey)
      }
    }

    logger.silly(
      'sync:addUrls:',
      urls,
      'isAutoAddRelayUrl:',
      opts.isAutoAddRelayUrl
    )

    if (!opts.isAutoAddRelayUrl) {
      return
    }
    const pubkey = await l.getPubkeyOrNull()
    if (!pubkey) return

    //全球发现获取url
    l.autoAddUrlByGlobalDiscoveryUser(pubkey)
  }

  /**
   * 此算法会拿到最新的创建时间当最版本，
   * 当得到一个event时超过本地版本，
   * 本地版本更新，上一个版本的所有url列表(currentVersionUrls)全部更新
   * 当本地超过url云端版本时，本地发布到云端，并放到currentVersionUrls列表
   * 这样当所有的事件获取一遍后，所有云端的事件全部将是最新版本
   * @param opts
   * @returns
   */
  private async _sync(filters: Filter[], opts: SyncOption = {}) {
    const currentVersionUrls = new Set<string>()
    let l = this.getMod().createChild().out()

    this.firstPublish(l, currentVersionUrls, opts)

    l.addFilters(filters)

    logger.debug('_sync', currentVersionUrls)

    //更旧的数据列表
    l.relayPool.getLine().on('event', (url, event, subId) => {
      opts.onEvent?.(event, url)
      this.syncEvent(l, event, url, currentVersionUrls)
    })

    return l
  }
  private async firstPublish(
    l: ReturnType<typeof this.getLine>,
    currentVersionUrls: Set<string>,
    opts: SyncOption
  ) {
    const withEventUrlList = new Set<string>()
    l.relayPool
      .getLine()
      .on('eose', (subId, url) => {
        if (withEventUrlList.has(url)) {
          return
        }

        //中继不存在此事件
        const list = this.eventMap.getValues()

        //就发布此事事件
        for (const event of list) {
          l.publish(url, event)
        }
        currentVersionUrls.add(url)
        withEventUrlList.add(url)

        //发布事件回调用
        opts?.onPush?.(url)
      })
      .on('event', url => {
        withEventUrlList.add(url)
      })
  }

  private async syncEvent(
    l: ReturnType<typeof this.getLine>,
    e: Event,
    url: string | undefined,
    currentVersionUrls: Set<string>
  ) {
    //url不存在应该就是本地或存储上下载下来的event，而不是relay,目前没有提供对应的删除更新方法

    const key = await this.createKeyByEvent(e)
    const updateAt = this.getUpdateAt(key)

    if (!updateAt || e.created_at > updateAt) {
      console.log('sync', updateAt, e.created_at)

      //远程更新到本地
      //更新本地内存上的数据
      this.setData(key, await this.serializeToData(e))
      //设置本地event
      this.setLocalEvent(e)

      // oldUrl是之前所有请求过的连接，发现远程 更 新，就将event从新发布到其他不是最新的中继上去
      l.publishes(currentVersionUrls, e)
      l.emit('synchronizer-update', e)
    } else if (e.created_at < updateAt && url) {
      //本地更新到远程
      const localEvent = await this.getEvent(key)

      localEvent && l.publish(url, localEvent)
    }

    if (!url) return

    currentVersionUrls.add(url)
  }

  /**
   * 保存行为不会比对，直接将数据发布到云端
   */
  public async save() {
    const keys = [...(await this.getDataKeys())]

    for (const key of keys) {
      const isChanged = await this.getIsChanged(key)
      if (!isChanged) continue

      const changeAt = await this.getChangeAt(key)
      if (!changeAt) continue

      const data = await this.getData(key)
      if (!data) continue

      //生成
      const event = await this.deserializeToEvent(data, changeAt)

      //写入本地存储
      this.setEvent(key, event)

      //设置为已保存了
      await this.changesSaved(key)
      //发布
      await this.publish(event)
      // this.sync()
    }
  }
  /**
   * 发布事件
   * @param event
   * @param opt
   */
  private async publish(event: Event) {
    await this.getLine().publishes(
      this.getRelayConfigurator().getWriteList(),
      event
    )
  }

  clear() {
    this.eventMap.clear()
  }
}
