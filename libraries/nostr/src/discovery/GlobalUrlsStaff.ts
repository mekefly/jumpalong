import { createStaff } from '@jumpalong/core'
import { deserializeTagRToReadWriteList } from '@jumpalong/nostr-shared'
import {
  createTaskQueue,
  createVote,
  debounce,
  getCacheOrNull,
  setAdds,
  setCache,
  setExcludes,
  useCache,
} from '@jumpalong/shared'
import managerStaff from '../manager/ManagerStaff'
import { ReactiveStaff } from '../staffExport'
import DefaultUrlStaff from './DefaultUrlStaff'
import { Pool } from '../server/Pool'

export default createStaff(
  () => [managerStaff, DefaultUrlStaff, Pool.Staff, ReactiveStaff],
  ({ mod, line }) => {
    let queue = createTaskQueue(500)
    let vote = createVote<boolean>({ max: 10, min: 10 })

    let cacheKey = 'global-urls'
    let { mod: parentMod, line: parentLine } = mod
      .defineEmit<
        'added-the-global-url-list',
        [addedUrl: Set<string>, globalUrlList: Set<string>]
      >()
      .assignFeat({
        globalUrlList: line.reactive({ value: new Set<string>() }),
      })
      .assignFn({
        getCacheGlobalUrls() {
          let arr = getCacheOrNull(cacheKey) as string[]

          return arr && new Set(arr)
        },
        setGlobalUrlList(list: Set<string>) {
          this.globalUrlList.value = list
        },
        loadCacheGlobalUrls() {
          let urls = this.getCacheGlobalUrls()
          if (urls) {
            this.setGlobalUrlList(setAdds(this.getGlobalUrls(), urls))
            parentLine.emit(
              'added-the-global-url-list',
              new Set(urls),
              this.getGlobalUrls()
            )
            return urls
          }
        },
        fetchGlobalUrls(urls?: Set<string>) {
          logger.debug('fetchGlobalUrls')
          let debounceSetCache = debounce((set: Set<string>) => {
            setCache(cacheKey, [...set], {
              duration: 1 * 1000 * 3600 * 24,
              useLocalStorage: true,
              useMemoryCache: true,
            })
          }, 10_000)
          urls && setAdds(this.getGlobalUrls(), urls)

          //this === parentLine
          //当无操作20秒认为完成,完成后会进入缓存状态
          let globalLine = this.createChild()
          return (
            globalLine

              // .add(EoseAutoUnSubStaff)
              // .add(TimeoutAutoUnSubStaff)
              .onEvent((subId, e) => {
                //this === parentLine
                const { write: writeUrl, read: readUrl } =
                  deserializeTagRToReadWriteList(e.tags)

                let margeWriteAndRead = setAdds(
                  new Set<string>(),
                  writeUrl,
                  readUrl
                )
                //新增的url
                let newlyUrls = setExcludes(
                  margeWriteAndRead,
                  this.getGlobalUrls()
                )

                setAdds(this.getGlobalUrls(), newlyUrls)

                parentLine.emit(
                  'added-the-global-url-list',
                  newlyUrls,
                  this.getGlobalUrls()
                )
                globalLine.emit(
                  'added-the-global-url-list',
                  newlyUrls,
                  this.getGlobalUrls()
                )
                //设置缓存
                debounceSetCache(this.getGlobalUrls())

                //查看投票结果
                if (vote.isValidVote() && vote.proportion(false) >= 0.9) {
                  //满足票数将终止运行
                  queue.clear()
                  globalLine.removeAllListener('added-the-global-url-list')
                  globalLine.emitter.clear()
                  logger.silly(
                    'fetchGlobalUrls:已关闭并清理',
                    vote.proportion(false)
                  )
                  return
                }

                if (
                  //当获取url发现新增加的url很少时，就停止查询
                  newlyUrls.size === 0 ||
                  newlyUrls.size / margeWriteAndRead.size < 0.1 || //新增小于百分之10
                  //当获取到的列表太多时，就停止查询
                  this.getGlobalUrls().size > 99
                ) {
                  //投票想要停止请求
                  vote.add(false)
                  return
                }

                //投票认为可以继续执行
                vote.add(true)

                newlyUrls.forEach(url => {
                  queue.unShift(() => {
                    line.addUrl(url)
                  })
                })
              })
              .setSubOpt({
                eoseAutoDesub: true,
              })
              .addFilter({ kinds: [10002], limit: 200 })
              .addUrls(urls || this.defaultUrls)
          )
        },
        // async depFetchGlobalUrls(
        //   pushUrls: (urls: Set<string>) => void,
        //   deep: number = 4
        // ): Promise<Set<string>> {
        //   return new Promise<Set<string>>((resolve, reject) => {
        //     let list = new Set<string>()
        //     if (deep <= 0) return resolve(list)
        //     await this.depFetchGlobalUrls(urls => {
        //       setAdds(list, urls)
        //     })
        //   })

        //   return this.createChild()
        //     .onEvent((subId, event, url) => {
        //       const { write: writeUrl, read: readUrl } =
        //         deserializeTagRToReadWriteList(event.tags)

        //       let margeWriteAndRead = setAdds(
        //         new Set<string>(),
        //         writeUrl,
        //         readUrl
        //       )
        //       pushUrls(margeWriteAndRead)
        //     })
        //     .addFilter({ kinds: [10002], limit: 200 })
        //     .setSubOpt({
        //       eoseAutoDesub: true,
        //     })
        // },
        getGlobalUrls() {
          return this.globalUrlList.value
        },
        autoGetGlobalUrls() {
          return useCache(
            'autoGetGlobalUrls',
            () => {
              return new Promise<Set<string>>((resolve, reject) => {
                let self = this
                function* urlCache() {
                  //内存缓存
                  yield self.getGlobalUrls()
                  //本地缓存
                  yield self.loadCacheGlobalUrls()
                }
                for (const urls of urlCache()) {
                  if (urls && urls.size >= 30) {
                    resolve(urls)
                    return
                  }
                }

                let debounceResolve = debounce(resolve, 4000)
                // 没有缓存
                let line = this.fetchGlobalUrls()
                //超时未获取到数据则返回结束
                line?.on('added-the-global-url-list', () => {
                  debounceResolve(this.getGlobalUrls())
                })
              })
            },
            {
              useLocalStorage: false,
              useMemoryCache: true,
              duration: 99,
              requestMerge: true,
            }
          )
        },
        addGlobalUrls(urls: Set<string>) {
          setAdds(this.getGlobalUrls(), urls)
        },
      })
    return parentMod
  }
)
