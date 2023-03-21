import { createEvent } from "@/nostr/event";
import {
  deserializeRelayConfiguration,
  deserializeTagRToReadWriteList,
  serializeRelayConfiguration,
} from "@/nostr/tag";
import { reactive } from "vue";
import { readListKey, writeListKey } from "./relayConfiguratorKeys";
import { relayEmiter, rootEventBeltline } from "@/nostr/nostr";
import { ReplaceableEventSyncAbstract } from "../api/ReplaceableEventSyncAbstract";
import { timeout } from "../utils/utils";
import { useCache } from "@/utils/cache";
import { userKey } from "./user";
import { type Event } from "nostr-tools";

export const defaultUrls: string[] = (window as any).defaultRelayUrls ?? [
  "wss://no.str.cr",
  "wss://no-str.org",
  "wss://nos.lol",
  "wss://nostr.com.de",
  "wss://relay.mostr.pub",
  "wss://relay.nostr.wirednet.jp",
  "wss://no-str.org",
  "wss://brb.io",
];

/**
 * 三层结构
 * - 内存层
 * - 本地配置
 * - relay 配置
 *
 * 1. 内存层用来实时和临时更改的，但刷新后就会消失
 * 2. 本地配置在点击保存后就会更新
 * 3. 在保存本地配置后，也会同步发往云端，但是发布行为不一定会成功
 *
 * 最高优先级为本地配置
 */
export class RelayConfigurator extends ReplaceableEventSyncAbstract<RelayConfiguration> {
  private readList: Set<string>;
  private writeList: Set<string>;

  setLocalEventByEvent(e: Event) {
    this.setLocalEvent(e);
  }

  constructor() {
    super(
      {
        kinds: [10002],
        authors: [userKey.value.publicKey],
      },
      "RelayConfigurator",
      {
        [readListKey]: new Set(),
        [writeListKey]: new Set(),
      }
    );

    const data = this.getData();
    this.readList = data[readListKey];
    this.writeList = data[readListKey];
  }

  serializeToData(e: Event): RelayConfiguration {
    const { relayConfiguration, readUrl, writeUrl } =
      deserializeRelayConfiguration(e.tags);

    return relayConfiguration;
  }
  deserializeToEvent(data: RelayConfiguration, changeAt: number): Event {
    const tags = serializeRelayConfiguration(data);
    const event = createEvent({
      kind: 10002,
      tags,
      created_at: changeAt,
    });
    return event;
  }

  public getConfiguration() {
    return this.getData();
  }
  public getWriteList() {
    return this.writeList;
  }
  public getReadList() {
    return this.readList;
  }
  public getOtherList() {
    return getOtherUrls();
  }
  public addWriteRead(url: string) {
    this.addRead(url);
    this.addWrite(url);
  }
  public addWrite(url: string) {
    this.toChanged();
    this.getRule(url)["write"] = true;
  }
  public remoteWrite(url: string) {
    this.toChanged();
    this.getRule(url)["write"] = false;
  }
  public addRead(url: string) {
    this.toChanged();
    this.getRule(url)["read"] = true;
  }
  public remoteRead(url: string) {
    this.toChanged();
    this.getRule(url)["read"] = false;
  }
  public remove(url: string) {
    this.toChanged();
    delete this.getData()[url];
  }
  public setRule(url: string, read?: boolean, write?: boolean) {
    this.toChanged();
    if (!read && !write) {
      this.remove(url);
    } else {
      const rule = this.getRule(url);

      rule["read"] = read;
      rule["write"] = write;
    }
  }
  public getRule(url: string) {
    return this.getConfiguration()[url] ?? (this.getConfiguration()[url] = {});
  }
  public hasReadByUrl(url: string) {
    return this.getReadList().has(url);
  }
  public hasWriteByUrl(url: string) {
    return this.getWriteList().has(url);
  }

  public broadcast(options?: { slef?: object }) {
    const localEvent = this.getLocalEvent();
    if (!localEvent || localEvent.tags.length === 0) return;

    const url = this.getOtherList();
    const opt = Object.assign(options?.slef ?? {}, {
      numberOfErrors: 0,
      numberOfSuccesses: 0,
      total: url.size,
    });

    relayEmiter.on("ok", localEvent.id as string, ({ ok, message }) => {
      if (ok) {
        opt.numberOfSuccesses += 1;
      } else {
        opt.numberOfErrors += 1;
      }
    });

    rootEventBeltline.publish(localEvent, url);

    return opt;
  }
}

export function getEventTagRelayUrl(e: Event) {
  const rs = new Set<string>();
  e.tags.forEach((tag) => {
    if (tag[0] === "r") {
      rs.add(tag[1]);
    }
  });
  return rs;
}

/**
 * 中继配置器
 */
export const relayConfigurator = reactive(new RelayConfigurator());
setTimeout(() => {
  relayConfigurator.sync();
}, 0);
export default relayConfigurator;

export function getOtherUrls() {
  return useCache(
    "getOtherUrls",
    () => {
      const otherList = reactive(new Set<string>());
      const line = rootEventBeltline
        .createChild()
        .addFilter({ kinds: [10002], limit: 20 })
        .addStaff({
          push(e) {
            const { writeUrl, readUrl } = deserializeTagRToReadWriteList(
              e.tags
            );
            for (const url of writeUrl) {
              otherList.add(url);
            }
            for (const url of readUrl) {
              otherList.add(url);
            }
          },
          feat: {
            getOtherUrls() {
              return otherList;
            },
          },
        });

      setTimeout(async () => {
        const urls = Array.from(
          new Set(
            [
              ...relayConfigurator.getReadList(),
              ...relayConfigurator.getWriteList(),
              ...defaultUrls,
            ].slice(0, 10)
          )
        );

        let index = 0;

        while (otherList.size < 50) {
          await timeout(2000);

          const url = urls[index];
          if (!url) return;

          line.addRelayUrls(new Set<string>().add(url));

          index++;
        }
      }, 500);
      return line.feat.getOtherUrls.bind(line.feat)();
    },
    { useLocalStorage: false }
  );
}

export type RelayConfiguration = {
  [readListKey]: Set<string>;
  [writeListKey]: Set<string>;
  [url: string]: RelayConfigurationRule;
};
export type RelayConfigurationRule = { read?: boolean; write?: boolean };
