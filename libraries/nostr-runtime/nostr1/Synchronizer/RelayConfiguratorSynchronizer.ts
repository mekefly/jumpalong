import { createEvent } from "@/nostr/event";
import {
  config,
  relayConfigurator,
  relayEmiter,
  rootEventBeltline,
} from "@/nostr/nostr";
import {
  deserializeRelayConfiguration,
  deserializeTagRToReadWriteList,
  serializeRelayConfiguration,
} from "@/nostr/tag";
import {
  defaultCacheOptions,
  deleteCache,
  setCache,
  useCache,
} from "@/utils/cache";
import { getPubkeyOrNull } from "@/utils/nostrApi";
import { debounceWatch } from "@/utils/vue";
import { injectable } from "inversify";
import { type Event } from "nostr-tools";
import { reactive } from "vue";
import { timeout } from "../../utils/utils";
import { readListKey, writeListKey } from "../relayConfiguratorKeys";
import createEoseUnSubStaff from "../staff/createEoseUnSubStaff";
import createTimeoutUnSubStaff from "../staff/createTimeoutUnSubStaff";
import ReplaceableSynchronizerAbstract from "./abstract/ReplaceableSynchronizerAbstract";

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
@injectable()
export class RelayConfiguratorSynchronizer extends ReplaceableSynchronizerAbstract<RelayConfiguration> {
  constructor() {
    super("RelayConfigurator", {
      isAutoAddRelayurl: true,
    });
  }
  createDefault(): RelayConfiguration {
    return {
      [readListKey]: new Set(),
      [writeListKey]: new Set(),
    };
  }
  public async getFilters() {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) {
      return [];
    }

    return [
      {
        kinds: [10002],
        authors: [pubkey],
      },
    ];
  }

  public async serializeToData(e: Event): Promise<RelayConfiguration> {
    const { relayConfiguration, readUrl, writeUrl } =
      deserializeRelayConfiguration(e.tags);

    return relayConfiguration;
  }
  public async deserializeToEvent(
    data: RelayConfiguration,
    changeAt: number
  ): Promise<Event> {
    const tags = serializeRelayConfiguration(data);
    const event = await createEvent({
      kind: 10002,
      tags,
      created_at: changeAt,
    });
    return event;
  }

  public getConfiguration() {
    return this.getDataSync();
  }
  public getWriteList() {
    return this.getConfiguration()[writeListKey];
  }
  public getReadList() {
    return this.getConfiguration()[readListKey];
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
    this.getConfiguration()[writeListKey].add(url);
  }
  public remoteWrite(url: string) {
    this.toChanged();
    this.getRule(url)["write"] = false;

    this.getConfiguration()[writeListKey].delete(url);
  }
  public addRead(url: string) {
    this.toChanged();
    this.getRule(url)["read"] = true;
    this.getConfiguration()[readListKey].add(url);
  }
  public remoteRead(url: string) {
    this.toChanged();
    this.getRule(url)["read"] = false;

    this.getConfiguration()[readListKey].delete(url);
  }
  public remove(url: string) {
    this.toChanged();
    delete this.getDataSync()[url];

    this.getConfiguration()[writeListKey].delete(url);
    this.getConfiguration()[readListKey].delete(url);
  }
  public setRule(url: string, read?: boolean, write?: boolean) {
    this.toChanged();
    if (!read && !write) {
      this.remove(url);
    } else {
      const rule = this.getRule(url);

      rule["read"] = read;
      rule["write"] = write;

      write
        ? this.getConfiguration()[writeListKey].add(url)
        : this.getConfiguration()[writeListKey].delete(url);
      read
        ? this.getConfiguration()[readListKey].add(url)
        : this.getConfiguration()[readListKey].delete(url);
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
      numberOfOvertime: 0,
      total: url.size,
    });

    const halReply = new Set();
    relayEmiter.on("ok", localEvent.id as string, ({ ok, message, url }) => {
      halReply.add(url);
      if (ok) {
        opt.numberOfSuccesses += 1;
      } else {
        opt.numberOfErrors += 1;
      }
    });

    rootEventBeltline.publish(localEvent, url);

    setTimeout(() => {
      url.forEach((url) => {
        if (halReply.has(url)) return;

        opt.numberOfOvertime += 1;
      });
    }, 1000 * 30);

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
const getOtherUrlsCacheKey = "__other_urls";
const getOtherUrlsCacheOptions = {
  ...defaultCacheOptions,
  useLocalStorage: true,
  duration: 1000 * 60,
};

export function getOtherUrls() {
  const arr = useCache(
    getOtherUrlsCacheKey,
    toGetRelayUrls,
    getOtherUrlsCacheOptions
  );

  if (Array.isArray(arr)) {
    return new Set(arr);
  } else if (arr instanceof Set) {
    return arr;
  } else {
    //这里可能得到了一个对象{}，原因是set在被序列化后就是一个obj，但是后面的更新算法没有执行，没有把obj替换为数组，这可能是加载完成之前就点击了刷新按钮造成的，所以认为需要删除缓存
    deleteCache(getOtherUrlsCacheKey);
    return toGetRelayUrls();
  }
}
function toGetRelayUrls() {
  const otherList = reactive(new Set<string>());
  const line = rootEventBeltline
    .createChild()
    .addStaff(createEoseUnSubStaff())
    .addStaff(createTimeoutUnSubStaff())
    .addFilter({ kinds: [10002], limit: 100 })
    .addStaff({
      push(e) {
        const { writeUrl, readUrl } = deserializeTagRToReadWriteList(e.tags);
        for (const url of writeUrl) {
          otherList.add(url);
        }
        for (const url of readUrl) {
          otherList.add(url);
        }
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

    while (otherList.size < (config.getOtherUrlsRequestLimitSize ?? 50)) {
      await timeout(2000);

      const url = urls[index];
      if (!url) return;

      line.addRelayUrls(new Set<string>().add(url));

      index++;
    }
  }, 0);

  debounceWatch(
    otherList,
    () => {
      setCache(getOtherUrlsCacheKey, [...otherList], getOtherUrlsCacheOptions);
    },
    {
      deep: true,
    }
  );

  return otherList;
}

export type RelayConfiguration = {
  [readListKey]: Set<string>;
  [writeListKey]: Set<string>;
  [url: string]: RelayConfigurationRule;
};
export type RelayConfigurationRule = { read?: boolean; write?: boolean };
