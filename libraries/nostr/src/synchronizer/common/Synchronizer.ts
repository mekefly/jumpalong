import { EventLine } from '@jumpalong/core'
import '@jumpalong/logger'
import {
  LocalStorageMap,
  ReversePromise,
  createGetValue,
  setAdds,
} from '@jumpalong/shared'
import { Event, Filter } from 'nostr-tools'
import ReactiveClass from '../../reactive/ReactiveClass'
import { RelayConfiguratorSynchronizer } from '../RelayConfiguratorSynchronizer'
import CreateIdStaff from '@/common/CreateIdStaff'
import SubStaff from '@/sub/SubStaff'
import ManagerStaff from '@/manager/ManagerStaff'
import RelayEmitterStaff from '@/server/RelayEmitterStaff'
import PublishStaff from '@/publish/PublishStaff'
import NostrApiStaff from '@/login/NostrApiStaff'
import LoginStaff from '@/login/LoginStaff'
import LoginUtilsStaff from '@/login/LoginUtilsStaff'
import GlobalDiscoveryUserStaff from '@/discovery/GlobalDiscoveryUserStaff'
import EoseAutoUnSubStaff from '@/sub/EoseAutoUnSubStaff'
import TimeoutAutoUnSubStaff from '@/sub/TimeoutAutoUnSubStaff'
import AutoAddUrlByGlobalDiscoveryUserStaff from '@/discovery/AutoAddUrlByGlobalDiscoveryUserStaff'
import EventUtilsStaff from '@/login/EventUtilsStaff'
import AutoAddKind10002UrlStaff from '@/discovery/AutoAddKind10002UrlStaff'
import { SyncOption, SynchronizerAbstractOption } from '@/types/synchronizer'
$LoggerScope()

/**
 * 通用同步器api
 */
export interface SynchronizerAbstractApi<E> {
  name: string
  getFilters(): Promise<Filter[]>
  serializeToData(e: Event): Promise<E>
  deserializeToEvent(data: E, changeAt: number): Promise<Event>
  eventToFilter(event: Event): Promise<Filter[]>
  createKey(filter: Filter[]): Promise<string>
  setData(key: string, value: E): Promise<void>
  getData(key: string): Promise<E | null>
  getDataKeys(): Promise<Iterable<string>>
  toChanged(key: string): Promise<void>
  getChangeAt(key: string): Promise<number | null>
  changesSaved(key: string): Promise<void>
}
/**
 * 通用同步器
 */
export class Synchronizer<E> extends ReactiveClass {
  getFilters(): Promise<Filter[]> {
    return this.api.getFilters()
  }
  /**
   * 将事件序列化为你所需要的数据
   * @param e
   */
  serializeToData(e: Event): Promise<E> {
    return this.api.serializeToData(e)
  }
  /**
   * 将你的数据序列为存储和同步时需要使用的event
   * @param data
   * @param changeAt
   */
  deserializeToEvent(data: E, changeAt: number): Promise<Event> {
    return this.api.deserializeToEvent(data, changeAt)
  }
  eventToFilter(event: Event): Promise<Filter[]> {
    return this.api.eventToFilter(event)
  }
  createKey(filter: Filter[]): Promise<string> {
    return this.api.createKey(filter)
  }
  setData(key: string, value: E): Promise<void> {
    return this.api.setData(key, value)
  }
  getData(key: string): Promise<E | null> {
    return this.api.getData(key)
  }
  getDataKeys(): Promise<Iterable<string>> {
    return this.api.getDataKeys()
  }
  toChanged(key: string): Promise<void> {
    return this.api.toChanged(key)
  }
  getChangeAt(key: string): Promise<number | null> {
    return this.api.getChangeAt(key)
  }
  changesSaved(key: string): Promise<void> {
    return this.api.changesSaved(key)
  }

  options: SynchronizerAbstractOption
  private name: string
  private eventMap: LocalStorageMap<Event>
  private _ready = new ReversePromise()
  public async onInited(l?: () => void) {
    return l ? this._ready.promise.then(l) : this._ready.promise
  }

  getLine
  constructor(
    line: EventLine<{}>,
    private api: SynchronizerAbstractApi<E>,
    opts?: SynchronizerAbstractOption
  ) {
    super(line)
    this.getLine = createGetValue(() => {
      return line
        .createChild()
        .add(
          CreateIdStaff,
          RelayConfiguratorSynchronizer.Staff,
          SubStaff,
          ManagerStaff,
          RelayEmitterStaff,
          PublishStaff,
          NostrApiStaff,
          LoginStaff,
          LoginUtilsStaff,
          GlobalDiscoveryUserStaff,
          EoseAutoUnSubStaff,
          TimeoutAutoUnSubStaff,
          AutoAddUrlByGlobalDiscoveryUserStaff,
          EventUtilsStaff
        )
        .mod.defineEmit<'synchronizer-update', [event: Event]>(
          'synchronizer-update'
        )
        .out()
    })
    //添加到同步列表
    //init
    this.options = opts ?? {}
    this.name = api.name
    this.eventMap = new LocalStorageMap(`__key_list:${api.name}`)
    this.init(opts)
  }

  async init(opt?: SynchronizerAbstractOption) {
    await this.readEventMap()
    opt?.autoSync && (await this.sync())
    this._ready.toResolve()
  }

  async createKeyByEvent(event: Event): Promise<string> {
    return await this.createKey(await this.eventToFilter(event))
  }
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

  private async getIsChanged(key: string): Promise<boolean> {
    return !!(await this.getChangeAt(key))
  }

  private getRelayConfigurator() {
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
    /**
     * 已保持同步的urls
     */
    const synchronizedUrls = new Set<string>()
    let l = this.getLine().createChild()

    this.firstPublish(l, synchronizedUrls, opts)

    l.setSubOpt({
      eoseAutoDesub: true,
    })
    l.addFilters(filters)

    //更旧的数据列表
    l.onEvent((subId, event, url) => {
      opts.onEvent?.(event, url)
      this.syncEvent(l, event, url, synchronizedUrls)
    })

    return l
  }
  private async firstPublish(
    l: ReturnType<typeof this.getLine>,
    synchronizedUrls: Set<string>,
    opts: SyncOption
  ) {
    l.onEose((subId, url) => {
      //如果在监听到eose监听时，此url还没有同步，就向其发布当前版本的事件
      if (synchronizedUrls.has(url)) {
        return
      }

      //中继不存在此事件
      this.updatePublish(l, url, synchronizedUrls, opts)
    })
  }

  /** 将事件发布到一个不存在此事件的url */
  private updatePublish(
    l: ReturnType<typeof this.getLine>,
    url: string,
    synchronizedUrls: Set<string>,
    opts: SyncOption
  ) {
    const list = this.eventMap.getValues()

    const { onOK, onPush } = opts
    //就发布此事事件
    l.publishEvents(url, list, {
      onOK,
    })

    synchronizedUrls.add(url)
    onPush?.(url)
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
