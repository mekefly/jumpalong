import { type Event, type Filter } from 'nostr-tools'
import { ContactConfigurationType } from 'packages/browser-ui/src/types/Contact'
import ReplaceableSynchronizerAbstract from './abstract/ReplaceableSynchronizerAbstract'
import { ChannelMetadata } from 'nostr-tools/nip28'
import { TagE, deserializeTagP, serializeTagE } from '../event/tag'
import { EventLine, Pubkey, UserApiStaff, createClassStaff } from '..'
import { ContactMetaData } from '../types/ContactMetaData'
import { debounce } from '@jumpalong/shared'
import { UserApi } from 'packages/browser-ui/src/api/user'

export type ContactConfigurationDatas = {
  contactConfiguration: ContactConfigurationType
  channelConfiguration: ChannelConfigurationType
}
export type ChannelConfigurationData = ChannelMetadata & TagE
type ChannelConfigurationType = Map<string, ChannelConfigurationData>

export class ContactConfigurationSynchronizer extends ReplaceableSynchronizerAbstract<ContactConfigurationType> {
  static Staff = createClassStaff(
    'contactConfiguration',
    ContactConfigurationSynchronizer,
    [],
    mod => {
      return mod
    }
  )

  constructor(line: EventLine<{}>) {
    super(line, 'ContactConfiguration')
    logger.verbose('new ContactConfiguration()')
  }

  createDefault(): ContactConfigurationType {
    return {}
  }

  async getFilters(): Promise<Filter[]> {
    const pubkey = await this.getLine().getPubkeyOrNull()
    if (!pubkey) return []

    return [{ kinds: [3], authors: [pubkey.toHex()] }]
  }

  public async serializeToData(e: Event) {
    const contactConfiguration: ContactConfigurationType = {}
    const pubkeyTagList = deserializeTagP(e.tags)
    for (const { name, pubkey, relayUrl } of pubkeyTagList) {
      contactConfiguration[pubkey] = { name, pubkey, relayUrl: relayUrl }
    }

    return contactConfiguration
  }
  getContactConfiguration() {
    return this.getDataSync()
  }
  public async deserializeToEvent(
    data: ContactConfigurationType,
    createAt: number
  ): Promise<Event> {
    const contactConfiguration = data
    const tagPs = Object.entries(contactConfiguration).map(
      ([pubkey, { name, relayUrl }]) =>
        ['p', pubkey, relayUrl, name].filter(Boolean)
    ) as string[][]

    return this.getLine().createEvent({
      kind: 3,
      tags: [...tagPs],
      created_at: createAt,
    })
  }

  follow(pubkey?: string | Pubkey, relayUrl?: string, name?: string) {
    if (!pubkey) return
    pubkey = Pubkey.fromMaybeHex(pubkey)

    //已关注就不会执行
    if (this.isFollow(pubkey.toHex())) return

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步
    const contactConfiguration = this.getDataSync()

    const contactMetaData: ContactMetaData = (contactConfiguration[
      pubkey.toHex()
    ] = {
      pubkey: pubkey.toHex(),
      name: name ?? '',
      relayUrl: relayUrl ?? '',
    })

    const changeId = this.toChanged()

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
    const contactConfiguration = this.getDataSync()

    if (contactConfiguration[pubkey.toHex()] === undefined) return
    delete contactConfiguration[pubkey.toHex()]
    this.toChanged()
    this.save()
  }
  isFollow(pubkey: string | Pubkey) {
    return Boolean(
      this.getDataSync()[typeof pubkey === 'string' ? pubkey : pubkey.toHex()]
    )
  }
}
