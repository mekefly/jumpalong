import { UserMetaData } from 'packages/nostr-runtime/src/types/User';
import { createStaff } from '../..'
import managerStaff from '../manager/managerStaff';
import { useCache } from '@jumpalong/shared';
import LatestEventStaff from '../eventStaff/LatestEventStaff';
import ReadWriteListStaff from './ReadWriteListStaff';

export default createStaff(managerStaff,({ mod, line }) => {
  return mod.assignFeat({

// async sendUserMetadataByPubkey(userMetaData: UserMetaData) {

//     return new Promise<void>(async (resolve, reject) => {
//       setTimeout(reject, 20000);
//       this.addEvent({
//         kind: 0,
//         content: JSON.stringify(userMetaData),
//       });
//     });
//   }

  getUserRelayUrlConfigByPubkey(pubkey: string) {
    return useCache(
      `getUserRelayUrlConfigByPubkey:${pubkey}`,
      () => {
        const kind10002line = this.mod
          .add(LatestEventStaff)
        .createAsATemplate()
        .chain('addFilter',({
            kinds: [10002],
            authors: [pubkey],
          }))
          .mod
          // .addStaff(ReplaceableEventMapStaff(10002, pubkey)) // 本地缓存
          .add(ReadWriteListStaff).out() // 创建读写配置列表
          // .addStaff(createWithEvent())
          // .addExtends(rootEventBeltline); //请求到的结果从root中也可取到取到

        if (kind10002line.isHasLatestEvent()) {
          return kind10002line;
        }

        //请求10002
        kind10002line
          .createChild()
          .addStaff(autoAddRelayurlByPubkeyStaff(pubkey));
        return kind10002line;
      },
      {
        useLocalStorage: false,
      }
    );
  }
    getUserMetadataLineByPubkey(
      pubkey: string,
      opt?: {
        urls?: Set<string>
      }
    ) {
      const { urls } = opt ?? {}
      return useCache(
        `getUserMetadataLineByPubkey:${pubkey}`,
        () => {
          const line = this.createEventBeltline
            .createEventBeltlineReactive()
            .createChild({
              slef: reactive({}),
            })
            .addFilter({
              authors: [pubkey],
              kinds: [0],
            })
            .addStaff(createLatestEventStaff())
            .addStaff(ReplaceableEventMapStaff(0, pubkey)) //可替换事件缓存
            .addStaff(createUseChannelMetadata<UserMetaData>())
            .addStaff(createEoseUnSubStaff())
            .addStaff(createTimeoutUnSubStaff())
            .addStaff(createWithEvent())

          const req = async () => {
            line.addRelayUrls(urls)

            await timeout(1000)
            line.addStaff(autoAddRelayurlByPubkeyStaff(pubkey))

            await timeout(1000)
            line.addReadUrl()
          }

          if (line.feat.isHas()) {
            syncInterval(
              `getUserMetadataLineByPubkey0${pubkey}`,
              req,
              config.syncInterval4
            )
          } else {
            syncInterval(
              `getUserMetadataLineByPubkey1${pubkey}`,
              req,
              config.syncInterval
            )
          }

          return line
        },
        {
          useLocalStorage: false,
        }
      )
    },
  })
})
