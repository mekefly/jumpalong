import { TYPES } from "@/nostr/nostr";
import { createDoNotRepeatStaff } from "@/nostr/staff";
import autoAddRelayurlByPubkeyStaff from "@/nostr/staff/autoAddRelayurlByPubkeyStaff";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createRefreshLoadStaff from "@/nostr/staff/createRefreshLoadStaff";
import createTimeoutUnSubStaff from "@/nostr/staff/createTimeoutUnSubStaff";
import createWithEvent from "@/nostr/staff/createWithEvent";
import { deserializeTagP } from "@/nostr/tag";
import { useCache } from "@/utils/cache";
import { lazyInject } from "@/utils/inversify";
import { injectable } from "inversify";
import CreateEventBeltline from "./CreateEventBeltline";

export const logger = loggerScope;

@injectable()
export class ContactApi {
  constructor(
    @lazyInject(TYPES.CreateEventBeltline)
    private createEventBeltline: CreateEventBeltline
  ) {}

  getContactListLineByPubkey(pubkey: string, opts?: { urls?: Set<string> }) {
    return useCache(
      `getContactListLineByPubkey:${pubkey}`,
      () => {
        const line = this.createEventBeltline
          .createEventBeltlineReactive()
          .addFilter({ kinds: [3], authors: [pubkey] })
          .addStaff(createLatestEventStaff())
          .addStaff(createEoseUnSubStaff())
          .addStaff(createTimeoutUnSubStaff())
          .addStaff({
            feat: {
              getContactList() {
                const event = this.beltline.feat.getLatestEvent();
                if (!event) return [];
                return deserializeTagP(event.tags);
              },
            },
          })
          .addStaff(createWithEvent());

        const req = async () => {
          line.addRelayUrls(opts?.urls);
          line.addStaff(autoAddRelayurlByPubkeyStaff(pubkey));
          line.addReadUrl();
        };
        req();

        return line;
      },
      {
        useLocalStorage: false,
      }
    );
  }

  getFollowerLineByPubkey(
    pubkey: string,
    opts?: GetFollowerLineByPubkeyOptions
  ) {
    return useCache(
      `getFollowerLineByPubkey:${pubkey}`,
      () => {
        const line = this.createEventBeltline
          .createEventBeltlineReactive({
            name: "getFollowerLineByPubkey",
          })
          .addStaff(
            createRefreshLoadStaff([{ kinds: [3], "#p": [pubkey] }], 100)
          )
          .addStaff(createDoNotRepeatStaff())
          .addStaff(autoAddRelayurlByPubkeyStaff(pubkey))
          .addReadUrl()
          .addRelayUrls(opts?.urls);

        line.feat.load();
        return line;
      },
      {
        useLocalStorage: false,
        duration: 100_000,
      }
    );
  }
}

type GetFollowerLineByPubkeyOptions = { urls: Set<string> };
