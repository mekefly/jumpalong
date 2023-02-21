import { useLocalStorage } from "@vueuse/core";
import { type Event } from "nostr-tools";
import { nowSecondTimestamp } from "../utils/utils";
import { createEvent, publishEvent } from "./event";
import { defaultUrls, relayConfigurator, sub } from "./relays";
import { userKey } from "./user";

export enum ReadWriteEnum {
  READ = 2 << 0,
  WRITE = 2 << 1,
}
export class RelayConfigurator {
  private isInitialization = false;
  private configuration = ref({} as Record<string, number>);
  private configurationEvent = useLocalStorage(
    "configurationEvent",
    {} as Event
  );
  private otherListStorage = useLocalStorage("other-list", () => {
    this.isInitialization = true;
    return [] as string[];
  });
  private otherList = ref(new Set<string>(this.otherListStorage.value));

  private writeList = ref(new Set<string>());
  private readList = ref(new Set<string>());

  private updateAt: undefined | number = undefined;

  constructor() {
    if (!!this.configurationEvent.value.id) {
      this.updateLocal(this.configurationEvent.value);
    }
    setTimeout(() => {
      if (this.isInitialization) {
        this.refreshOtherUrls();
      }
      this.sync();
    }, 0);
  }

  private sync() {
    this.updateConfigurationEvent();
    let _updateAt = this.getUpdateAt();
    const urls = new Set(
      [
        ...this.getReadList(),
        ...this.getWriteList(),
        ...defaultUrls,
        ...this.getOtherList(),
      ].slice(0, 10)
    );
    const itExists = new Set<string>();
    sub(
      [
        {
          kinds: [10002],
          authors: [userKey.value.publicKey],
        },
      ],
      {
        relayUrls: urls,
        eose: ({ fromUrl }) => {
          if (itExists.has(fromUrl)) {
            return;
          }
          this.publishToRelay(fromUrl);
        },
        even: (e, { fromUrl }) => {
          itExists.add(fromUrl);
          if (e.id === this.configurationEvent.value?.id) {
            return;
          }
          if (!_updateAt || e.created_at > _updateAt) {
            this.updateLocal(e);
          } else if (e.created_at < _updateAt) {
            this.publishToRelay(fromUrl);
          }
        },
      }
    );
  }

  private updateConfigurationEvent() {
    const updateAt = this.getUpdateAt();
    if (!this.configurationEvent.value.id || !updateAt) {
      return;
    }
    if (updateAt > this.configurationEvent.value?.created_at) {
      this.configurationEvent.value = this.genEvent();
    }
  }

  private genEvent() {
    const tags = Object.keys(this.configuration.value).map((url) => {
      const cl = this.configuration.value[url];
      const tag = ["r", url];
      if (cl & ReadWriteEnum.READ && cl & ReadWriteEnum.WRITE) {
      } else if (cl & ReadWriteEnum.READ) {
        tag.push("read");
      } else if (cl & ReadWriteEnum.WRITE) {
        tag.push("write");
      }
      return tag;
    });

    return createEvent({ kind: 10002, tags });
  }
  private publishToRelay(url: string) {
    if (
      !this.configurationEvent.value ||
      this.configurationEvent.value.tags.length === 0
    )
      return;

    publishEvent(this.configurationEvent.value, {
      relayUrls: new Set([url]),
      ok() {
        console.log("当前中继已保存到", url);
      },
    });
  }

  private refreshOtherUrls() {
    this.otherList.value = getOtherUrls();
  }
  private updateLocal(e: Event) {
    this.clear();
    analysisTagR(
      e,
      (u) => this.addWrite(u),
      (u) => this.addRead(u)
    );
    //更新时间戳要放后面，因为addWrite会更新时间戳
    this.setUpdateAt(e.created_at);
  }

  private clear() {
    this.configuration.value = {};
    this.readList.value = new Set();
    this.writeList.value = new Set();
  }
  private updateAtSetToNow() {
    this.setUpdateAt(nowSecondTimestamp());
  }

  private setUpdateAt(secondStamp: number) {
    this.updateAt = secondStamp;
  }
  public getUpdateAt() {
    return this.updateAt;
  }
  public getConfiguration() {
    return readonly(this.configuration).value;
  }
  public getWriteList() {
    return readonly(this.writeList).value;
  }
  public getReadList() {
    return readonly(this.readList).value;
  }
  public getOtherList() {
    return this.otherList.value;
  }
  public addWriteRead(url: string) {
    this.addRead(url);
    this.addWrite(url);
  }
  public addWrite(url: string) {
    this.addRule(url, ReadWriteEnum.WRITE);
  }
  public remoteWrite(url: string) {
    this.remoteRule(url, ReadWriteEnum.WRITE);
  }
  public addRead(url: string) {
    this.addRule(url, ReadWriteEnum.READ);
  }
  public remoteRead(url: string) {
    this.remoteRule(url, ReadWriteEnum.READ);
  }
  private addRule(url: string, rule: ReadWriteEnum) {
    this.setRule(url, this.configuration.value[url] | rule);
  }
  private remoteRule(url: string, rule: ReadWriteEnum) {
    this.setRule(url, this.configuration.value[url] ^ rule);
  }
  private setRule(url: string, rw: number) {
    this.configuration.value[url] = rw;
    rw & ReadWriteEnum.READ
      ? this.readList.value.add(url)
      : this.readList.value.delete(url);
    rw & ReadWriteEnum.WRITE
      ? this.writeList.value.add(url)
      : this.writeList.value.delete(url);
    this.updateAtSetToNow();
  }
  public remove(url: string) {
    this.configuration.value[url] = undefined as any;
    delete this.configuration.value[url];
  }
  public hasReadByUrl(url: string) {
    return this.getReadList().has(url);
  }
  public hasWriteByUrl(url: string) {
    return this.getWriteList().has(url);
  }
  public save() {
    this.configurationEvent.value = this.genEvent();
    if (!this.configurationEvent.value.id) {
      this.configurationEvent.value = this.genEvent();
    }
    this.sync();
  }
  public broadcast() {
    if (
      !this.configurationEvent.value ||
      this.configurationEvent.value.tags.length === 0
    )
      return;

    const url = this.getOtherList();
    const numberOfSuccesses = ref(0);
    const numberOfErrors = ref(0);
    const total = ref(url.size);

    publishEvent(this.configurationEvent.value, {
      relayUrls: url,
      ok() {
        numberOfSuccesses.value++;
      },
      failed() {
        numberOfErrors.value++;
      },
    });
    return { numberOfErrors, numberOfSuccesses, total };
  }
}

export function analysisTagR(
  e: Event,
  addWrite: (url: string) => void,
  addRead: (url: string) => void
) {
  e.tags.forEach((tag) => {
    const url = tag[1];
    if (!url) return;
    if (tag[0] === "r") {
      switch (tag[2]) {
        case "write":
          addWrite(url);
          break;
        case "read":
          addRead(url);
          break;
        default:
          addWrite(url);
          addRead(url);
          break;
      }
    }
  });
}
export function generateReadWriteList(e: Event) {
  const p: [Set<string>, Set<string>] = [new Set<string>(), new Set<string>()];
  analysisTagR(
    e,
    (u) => p[0].add(u),
    (u) => p[1].add(u)
  );
  return p;
}
export function getOtherUrls() {
  const otherList = reactive(new Set<string>());
  sub([{ kinds: [10002], limit: 20 }], {
    even(e) {
      getEventTagRelayUrl(e).forEach((r) => {
        otherList.add(r.endsWith("/") ? r.slice(0, r.length - 1) : r);
      });
    },
    relayUrls: new Set([
      ...relayConfigurator.getReadList(),
      ...relayConfigurator.getWriteList(),
      ...defaultUrls,
    ]),
  });

  return otherList;
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
