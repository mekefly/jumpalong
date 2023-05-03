import { EventBeltline, PublishOpt } from "@/nostr/eventBeltline";
import {
  TYPES,
  nostrApi,
  relayConfigurator,
  rootEventBeltline,
} from "@/nostr/nostr";
import autoAddRelayurlByPubkeyStaff from "@/nostr/staff/autoAddRelayurlByPubkeyStaff";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import createEventSourceTracers from "@/nostr/staff/createEventSourceTracers";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createOneEventStaff from "@/nostr/staff/createOneEventStaff";
import createTimeoutUnSubStaff from "@/nostr/staff/createTimeoutUnSubStaff";
import createWithEvent from "@/nostr/staff/createWithEvent";
import createReplaceableEventCacheStaff from "@/nostr/staff/storage/createReplaceableEventCacheStaff";
import getCacheStaff from "@/nostr/staff/storage/getCacheStaff";
import { useCache } from "@/utils/cache";
import { toDeCodeAddress } from "@/utils/nostr";
import { merageSet, syncInterval } from "@/utils/utils";
import { inject, injectable } from "inversify";
import { nip19, type Event, type Filter } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";
import { createEventBeltlineReactive } from "../nostr/createEventBeltline";
import type CreateEventBeltline from "./CreateEventBeltline";

type EventDeletionOptions = {} & PublishOpt;

@injectable()
export class EventApi {
  constructor(
    @inject(TYPES.RootEventBeltline)
    private rootEventBeltline: EventBeltline<{}>,
    @inject(TYPES.CreateEventBeltline)
    private createEventBeltline: CreateEventBeltline
  ) {}
  private _deleteionLine: EventBeltline | null = null;
  private getDeleteionLine() {
    return (
      this._deleteionLine ?? this.createEventBeltline.createEventBeltline()
    );
  }
  async eventDeletion(
    eventId: string[],
    relayUrls?: Set<string>,
    opt?: EventDeletionOptions
  ) {
    return new Promise<void>(async (resolve, reject) => {
      this.getDeleteionLine().publish(
        {
          kind: 5,
          pubkey: await nostrApi.getPublicKey(),
          tags: eventId.map((id) => ["e", id]),
        },
        merageSet(relayConfigurator.getWriteList(), relayUrls ?? new Set()),
        opt
      );
    });
  }
  eventDeletionOne(
    eventId: string,
    opt?: { urls?: Set<string> } & EventDeletionOptions
  ) {
    this.eventDeletion([eventId], opt?.urls, opt);
  }

  publishEvent(
    event: Partial<Event>
    // options: PublishEventOptions = {}
  ) {
    this.rootEventBeltline
      .createChild()
      .publish(event, relayConfigurator.getWriteList());
  }

  createGetEventLineByAddress(address: string) {
    const addressPointer = toDeCodeAddress(address);
    if (addressPointer) {
      return this.createGetEventLineByAddressPointer(addressPointer);
    }
    throw new Error("Not an address");
  }
  createGetEventLineByAddressPointer(
    addressPointer: AddressPointer,
    opt?: CreateGetEventLineByAddressPointerOption
  ) {
    return useCache(
      `createGetEventLineByAddressPointer:${nip19.naddrEncode(addressPointer)}`,
      () => {
        const filter: Filter = {
          ["#d"]: [addressPointer.identifier],
          authors: [addressPointer.pubkey],
          kinds: [addressPointer.kind],
        };
        const line = createEventBeltlineReactive({
          describe: "获取Event通过id",
        })
          .addFilter(filter)
          .addStaff(createWithEvent()) //具有事件判定
          .addStaff(createLatestEventStaff()) // 只获取最新的一条
          .addStaff(createReplaceableEventCacheStaff(addressPointer)) //缓存
          .addStaff(createEventSourceTracers()) //事件来源记录
          .addStaff(createEoseUnSubStaff()) //自动结束订阅
          .addStaff(createTimeoutUnSubStaff()); //超时解除订阅

        let isRun = false;
        const req = async () => {
          if (isRun) return;
          isRun = true;

          line.addStaff(autoAddRelayurlByPubkeyStaff(addressPointer.pubkey));
          if (await line.feat.timeoutWithEvent()) return;

          if (opt?.urls && opt.urls.size > 0) {
            line.addRelayUrls(opt.urls);
            if (await line.feat.timeoutWithEvent()) return;
          }

          line.addReadUrl();
          if (await line.feat.timeoutWithEvent()) return;
        };

        //超时同步
        syncInterval(
          `createGetEventLineByAddressPointer:${addressPointer.kind}:${addressPointer.pubkey}:${addressPointer.identifier}`,
          () => {
            req();
          },
          20 * 1000
        );
        //无缓存直接请求
        if (line.feat.withEvent()) return line;
        req();
        return line;
      },
      {
        useLocalStorage: false,
      }
    );
  }

  getEventLineById(
    eventId: string,
    opt?: { urls?: Set<string>; pubkey?: string }
  ) {
    return useCache(
      "getEventLineById" + eventId,
      () => {
        const line = createEventBeltlineReactive({
          describe: "获取Event通过id",
        })
          .addFilter({ ids: [eventId], limit: 1 })
          .addStaff(createOneEventStaff())
          .addStaff(createWithEvent())
          .addStaff(createEventSourceTracers())
          .addStaff(createEoseUnSubStaff())
          .addStaff(createTimeoutUnSubStaff());

        line.addStaff(getCacheStaff(eventId));
        if (line.feat.withEvent()) return line;

        line.addExtends(rootEventBeltline);
        if (line.feat.withEvent()) return line;

        const req = async () => {
          if (opt?.urls && opt.urls.size > 0) {
            line.addRelayUrls(opt.urls);
            if (await line.feat.timeoutWithEvent()) return;
          }

          if (opt?.pubkey) {
            line.addStaff(autoAddRelayurlByPubkeyStaff(opt.pubkey));
            if (await line.feat.timeoutWithEvent()) return;
          }

          line.addReadUrl();
          if (await line.feat.timeoutWithEvent()) return;
        };

        syncInterval(
          `getEventLineById:${eventId}`,
          () => {
            req();
          },
          20 * 1000
        );

        return line;
      },
      {
        useLocalStorage: false,
      }
    );
  }
}

type CreateGetEventLineByAddressPointerOption = { urls?: Set<string> };
