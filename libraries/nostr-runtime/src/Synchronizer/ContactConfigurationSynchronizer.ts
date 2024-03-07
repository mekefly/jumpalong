import { type Event, type Filter } from 'nostr-tools'
import { ContactConfigurationType } from 'packages/browser-ui/src/types/Contact'
import ReplaceableSynchronizerAbstract from './abstract/ReplaceableSynchronizerAbstract'
import { ChannelMetadata } from 'nostr-tools/nip28'
import { deserializeTagP } from '../event/tag'
import {
  EventLine,
  Pubkey,
  UserApiStaff,
  createClassStaff,
  createStaffClass,
} from '..'
import { ContactMetaData } from '../types/ContactMetaData'
import { debounce } from '@jumpalong/shared'
import { UserApi } from 'packages/browser-ui/src/api/user'
import { ReplaceableSynchronizer } from './common'

export type ContactConfigurationDatas = {
  contactConfiguration: ContactConfigurationType
  channelConfiguration: ChannelConfigurationType
}
export type ChannelConfigurationData = ChannelMetadata
type ChannelConfigurationType = Map<string, ChannelConfigurationData>

export const ContactConfigurationSynchronizer = createStaffClass(
  'contactConfiguration',
  class ContactConfigurationSynchronizer {
    replaceableSynchronizer: ReplaceableSynchronizer<ContactConfigurationType>

    constructor(line: EventLine<{}>) {
      let self = this
      this.replaceableSynchronizer = new ReplaceableSynchronizer(
        line,
        {
          name: 'ContactConfiguration',
          createDefault() {
            return {}
          },
          async getFilters(): Promise<Filter[]> {
            const pubkey = await self.getLine().getPubkeyOrNull()
            if (!pubkey) return []

            return [{ kinds: [3], authors: [pubkey.toHex()] }]
          },

          async serializeToData(e: Event) {
            const contactConfiguration: ContactConfigurationType = {}
            const pubkeyTagList = deserializeTagP(e.tags)
            for (const { name, pubkey, relayUrl } of pubkeyTagList) {
              contactConfiguration[pubkey] = {
                name,
                pubkey,
                relayUrl: relayUrl,
              }
            }

            return contactConfiguration
          },
          async deserializeToEvent(
            data: ContactConfigurationType,
            createAt: number
          ): Promise<Event> {
            const contactConfiguration = data
            const tagPs = Object.entries(contactConfiguration).map(
              ([pubkey, { name, relayUrl }]) =>
                ['p', pubkey, relayUrl, name].filter(Boolean)
            ) as string[][]

            return self.getLine().createEvent({
              kind: 3,
              tags: [...tagPs],
              created_at: createAt,
            })
          },
        },
        {
          autoSync: true,
        }
      )
      logger.verbose('new ContactConfiguration()')
    }
    getLine() {
      return this.replaceableSynchronizer.synchronizer.getLine()
    }
    save() {
      this.replaceableSynchronizer.synchronizer.save()
    }

    getContactConfiguration() {
      return this.replaceableSynchronizer.getDataSync()
    }
    toChanged() {
      this.replaceableSynchronizer.toChanged()
    }
    follow(pubkey?: string | Pubkey, relayUrl?: string, name?: string) {
      if (!pubkey) return
      pubkey = Pubkey.fromMaybeHex(pubkey)

      //已关注就不会执行
      if (this.isFollow(pubkey.toHex())) return

      // 每改变一次加一次，如果中间有新的更新，就会强制停止同步
      const contactConfiguration = this.getContactConfiguration()

      const contactMetaData: ContactMetaData = (contactConfiguration[
        pubkey.toHex()
      ] = {
        pubkey: pubkey.toHex(),
        name: name ?? '',
        relayUrl: relayUrl ?? '',
      })

      const changeId = this.replaceableSynchronizer.toChanged()

      const line = this.getLine()
        .add(UserApiStaff)
        .getUserMetadataLineByPubkey(pubkey)

      const debounceUpdateMetadata = debounce(
        (metadata: ContactMetaData, subId?: string) => {
          // if (this.isReChange(changeId)) {
          //   line.closeReq();
          //   return;
          // }
          Object.assign(contactMetaData, metadata)
          // if (metadata.relayUrls && metadata.relayUrls.length > 0) {
          //   contactMetaData.relayUrl = metadata.relayUrls[0]
          // } else {
          //   const url = line.getUrlBySubId(subId ?? '')
          //   if (url) {
          //     contactMetaData.relayUrl = url
          //   }
          // }
        }
      )

      this.save()
      line.onHasMetadata(debounceUpdateMetadata)
    }

    unFollow(pubkey?: string | Pubkey) {
      if (!pubkey) return
      pubkey = Pubkey.fromMaybeHex(pubkey)

      //未关注就不需要执行
      if (!this.isFollow(pubkey.toHex())) return

      // 每改变一次加一次，如果中间有新的更新，就会强制停止同步
      const contactConfiguration = this.getContactConfiguration()

      if (contactConfiguration[pubkey.toHex()] === undefined) return
      delete contactConfiguration[pubkey.toHex()]
      this.toChanged()
      this.save()
    }
    isFollow(pubkey: string | Pubkey) {
      return Boolean(
        this.getContactConfiguration()[
          typeof pubkey === 'string' ? pubkey : pubkey.toHex()
        ]
      )
    }
  }
)
