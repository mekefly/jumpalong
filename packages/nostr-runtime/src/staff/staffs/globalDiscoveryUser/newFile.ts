import { createStaff } from 'staff'
import DefaultUrlStaff from './DefaultUrlStaff'
import { deserializeTagRToReadWriteList } from 'packages/nostr-runtime/src/event/tag'
import { setAdds, setExcludes } from '@jumpalong/shared'
import managerStaff from '../manager/ManagerStaff'
import EoseAutoUnSubStaff from '../sub/EoseAutoUnSubStaff'
import TimeoutAutoUnSubStaff from '../sub/TimeoutAutoUnSubStaff'

export default createStaff(
  managerStaff,
  // EventStaff,
  DefaultUrlStaff,
  ({ mod, line }) => {
    let globalUrlList = new Set<string>()
    let { mod: parentMod, line: parentLine } = mod
      .defineEmit<
        'added-the-global-url-list',
        [addedUrl: Set<string>, globalUrlList: Set<string>]
      >()

      .assignFeat({
        fetchGlobalUrls(urls?: Set<string>) {
          //this === parentLine
          this.mod
            .createAsATemplateMod()
            .add(EoseAutoUnSubStaff)
            .add(TimeoutAutoUnSubStaff)

            .createAsATemplate()
            .chaining('addFilter', { kinds: [10002], limit: 100 })
            .on('event', (url, e) => {
              //this === parentLine
              const { write: writeUrl, read: readUrl } =
                deserializeTagRToReadWriteList(e.tags)

              //新增的url
              let newlyUrls = setExcludes(
                setAdds(new Set(), writeUrl, readUrl),
                globalUrlList
              )
              setAdds(globalUrlList, newlyUrls)

              parentLine.emit(
                'added-the-global-url-list',
                newlyUrls,
                globalUrlList
              )
              //当获取url发现新增加的url很少时，就停止查询
              if (newlyUrls.size / globalUrlList.size < 0.1) {
                parentLine.removeAllListener('added-the-global-url-list')
                return
              }
              //当获取到的列表太多时，就停止查询
              if (globalUrlList.size > 9999) {
                parentLine.removeAllListener('added-the-global-url-list')
                return
              }
              parentLine.fetchGlobalUrls(newlyUrls)
            })
            .addUrls(urls || this.defaultUrls)
        },
        addGlobalUrls() {
          this.addUrls(globalUrlList)
          this.on('added-the-global-url-list', added => {
            this.addUrls(added)
          })
        },
      })
    return parentMod
  }
)
