import { createStaff } from '../../../staff/staff'
import DefaultUrlStaff from './DefaultUrlStaff'
import { deserializeTagRToReadWriteList } from '../../../event/tag'
import {
  createTaskQueue,
  createVote,
  debounce,
  getCache,
  getCacheOrNull,
  setAdds,
  setCache,
  setExcludes,
  useCache,
} from '@jumpalong/shared'
import managerStaff from '../manager/ManagerStaff'
import EoseAutoUnSubStaff from '../sub/EoseAutoUnSubStaff'
import TimeoutAutoUnSubStaff from '../sub/TimeoutAutoUnSubStaff'
import PoolStaff from '../server/PoolStaff'

export default createStaff(
  managerStaff,
  DefaultUrlStaff,
  PoolStaff,
  ({ mod, line }) => {
    let queue = createTaskQueue(500)
    let vote = createVote<boolean>({ max: 10, min: 10 })
    let { mod: parentMod, line: parentLine } = mod
      .defineEmit<
        'added-the-global-url-list',
        [addedUrl: Set<string>, globalUrlList: Set<string>]
      >()

      .assignFeat({
        globalUrlList: new Set<string>(),
        fetchGlobalUrls(urls?: Set<string>) {
          let cacheKey = 'global-urls'
          let cacheUrls = getCacheOrNull(cacheKey) as string[]
          logger
          if (cacheUrls) {
            this.globalUrlList = setAdds(this.globalUrlList, cacheUrls)

            parentLine.emit(
              'added-the-global-url-list',
              new Set(cacheUrls),
              this.globalUrlList
            )
            return
          }

          console.log('debounceSetList')
          let debounceSetCache = debounce((set: Set<string>) => {
            setCache(cacheKey, [...set], {
              duration: 1 * 1000 * 3600 * 24,
              useLocalStorage: true,
              useMemoryCache: true,
            })
          }, 10_000)
          urls && setAdds(this.globalUrlList, urls)

          //this === parentLine
          //当无操作20秒认为完成,完成后会进入缓存状态
          return this.mod
            .createChild()
            .add(EoseAutoUnSubStaff)
            .add(TimeoutAutoUnSubStaff)
            .inLine(line =>
              line.on('event', (url, e) => {
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
                  this.globalUrlList
                )
                console.log('newlyUrls', newlyUrls)

                console.log('this.globalUrlList', this.globalUrlList)
                setAdds(this.globalUrlList, newlyUrls)
                console.log('this.globalUrlList', this.globalUrlList)

                parentLine.emit(
                  'added-the-global-url-list',
                  newlyUrls,
                  this.globalUrlList
                )
                //设置缓存
                debounceSetCache(this.globalUrlList)

                console.log('queue', queue.queue.length)

                if (vote.isValidVote() && vote.proportion(false) >= 0.9) {
                  queue.clear()
                  parentLine.removeAllListener('added-the-global-url-list')
                  line.emitter.clear()
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
                  this.globalUrlList.size > 99
                ) {
                  vote.add(false)
                  return
                }

                vote.add(true)

                newlyUrls.forEach(url => {
                  queue.unShift(() => {
                    line.addUrl(url)
                  })
                })
              })
            )
            .out()
            .chaining('addFilter', { kinds: [10002], limit: 200 })
            .chaining('addUrls', urls || this.defaultUrls)
        },
        getGlobalUrls() {
          console.log('this.globalUrlList', this.globalUrlList)

          return this.globalUrlList || this.defaultUrls
        },
        autoGetGlobalUrls() {
          return useCache(
            'autoGetGlobalUrls',
            () => {
              return new Promise<Set<string>>((resolve, reject) => {
                let debounceResolve = debounce(resolve, 4000)

                let line = this.fetchGlobalUrls()
                if (!line) {
                  //缓存返回
                  resolve(this.getGlobalUrls())
                  return
                }
                //超时
                line.on('added-the-global-url-list', () => {
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
          setAdds(this.globalUrlList, urls)
        },
      })
    return parentMod
  }
)
