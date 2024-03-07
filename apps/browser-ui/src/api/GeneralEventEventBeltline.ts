import { EventBeltline } from '@/nostr/eventBeltline'
import { TYPES } from '@/nostr/nostr'
import {
  createDoNotRepeatStaff,
  createFilterGreaterThanTheCurrenttimeStaff,
} from '@/nostr/staff'
import autoAddRelayUrlByFilter from '@/nostr/staff/autoAddRelayUrlByFilter'
import autoAddRelayurlByPubkeyStaff from '@/nostr/staff/autoAddRelayurlByPubkeyStaff'
import { createGarbageFilter } from '@/nostr/staff/createGarbageFilter'
import CreateMuteUserStaff from '@/nostr/staff/CreateMuteUserStaff'
import createRefreshLoadStaff, {
  createEventSourceTracersForRefreshLoadStaff,
} from '@/nostr/staff/createRefreshLoadStaff'
import { useCache } from '@/utils/cache'
import { callLogger } from '@/utils/decorator'
import { lazyInject } from '@/utils/inversify'
import { withDefault } from '@/utils/utils'
import { createBlackStaff } from '@/views/ContentBlacklistView'
import { inject, injectable } from 'inversify'
import CreateEventBeltline from './CreateEventBeltline'
import { type CreateTextEventBeltlineOption } from './shortTextEventBeltline'

@injectable()
export class GeneralEventEventBeltline {
  static logger = logger
  constructor(
    @inject(TYPES.RootEventBeltline)
    private rootEventBeltline: EventBeltline<{}>,

    @lazyInject(TYPES.CreateEventBeltline)
    private createEventBeltline: CreateEventBeltline
  ) {}

  @callLogger()
  createGeneralEventEventBeltline(opts: CreateTextEventBeltlineOption) {
    return useCache(
      `createShortTextEventBeltline:${JSON.stringify(opts.filters)}`,
      () => {
        const limit = opts.limit ?? 10
        const filters = opts.filters

        const textEventBeltline = this.createEventBeltline
          .createEventBeltlineReactive(
            withDefault(opts, {
              describe: '通用事件查询',
            })
          )
          .addStaff(createDoNotRepeatStaff()) // 重复事件过滤器
          .addStaff(CreateMuteUserStaff()) // 用户黑名单过滤器
          .addStaff(createBlackStaff()) // 文本黑名单过滤器
          .addStaff(createGarbageFilter()) // 垃圾邮件过滤器
          .addStaff(createFilterGreaterThanTheCurrenttimeStaff()) // 过滤掉-n秒前的情况
          .addStaff(createRefreshLoadStaff(filters, limit)) //添加刷新和加载功能
          .addStaff(createEventSourceTracersForRefreshLoadStaff()) // 给刷新和加载添加源头追踪
          .addStaffOfReverseSortByCreateAt() // 通过创建时间反排序

        logger.debug('filters', textEventBeltline)

        if (filters.length === 0) return textEventBeltline

        textEventBeltline
          .addReadUrl()
          .addRelayUrls(opts.urls)
          .addRelayUrls(opts.addUrls)

        if (opts.pubkeys) {
          for (const pubkey of opts.pubkeys) {
            textEventBeltline.addStaff(
              autoAddRelayurlByPubkeyStaff(pubkey, { urls: opts.urls })
            )
          }
        } else {
          opts.urls ||
            textEventBeltline.addStaff(autoAddRelayUrlByFilter({ filters }))
        }

        textEventBeltline.feat.firstLoad()
        return textEventBeltline
      },
      {
        useLocalStorage: false,
      }
    )
  }
}
