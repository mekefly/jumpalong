import { useCache } from "@/utils/cache";
import { getPubkeyOrNull } from "@/utils/nostrApiUse";
import { Event, Filter } from "nostr-tools";
import { createEvent } from "../event";
import { TagType, getOnlyTag } from "../tag";
import { ParameterizedReplaceableMapSynchronizerAbstract } from "./abstract/ParameterizedReplaceableMapSynchronizerAbstract";

export type CategorizedBookmarksSynchronizerDataType = {
  name: string;
  map: Map<TagType, Set<string>>;
  size: number;
};
const kind = 30001;
export default class CategorizedBookmarksSynchronizer extends ParameterizedReplaceableMapSynchronizerAbstract<CategorizedBookmarksSynchronizerDataType> {
  constructor() {
    super("CategorizedBookmarksSynchronizer");
  }
  async getFilters(): Promise<Filter[]> {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) {
      return [];
    }
    return [
      {
        kinds: [kind],
        authors: [pubkey],
      },
    ];
  }
  async serializeToData(
    e: Event
  ): Promise<CategorizedBookmarksSynchronizerDataType> {
    const identifier = getOnlyTag("d", e.tags);
    const key = await this.createKeyByEvent(e);
    const data: CategorizedBookmarksSynchronizerDataType = {
      map: new Map(),
      name: identifier?.[1] ?? "",
      size: 0,
    };

    for (const [type, value] of e.tags) {
      if (!type && !value) continue;
      let set = data.map.get(type);
      if (!set) {
        set = new Set();
        data.map.set(type, set);
      }
      set.add(value);
      data.size++;
    }
    return data;
  }
  async deserializeToEvent(
    data: CategorizedBookmarksSynchronizerDataType,
    changeAt: number
  ): Promise<Event> {
    const tags: string[][] = [["d", data.name]];
    for (const [type, list] of data.map) {
      for (const item of list) {
        tags.push([String(type), item]);
      }
    }

    return createEvent({
      kind,
      created_at: changeAt,
      tags,
    });
  }
  createTag(event: Event): [TagType, string] {
    const kind = event.kind;
    if (kind >= 30000 && kind < 39999) {
      const id = getOnlyTag("d", event.tags);
      return ["a", `${event.kind}:${event.pubkey}:${id?.[1] ?? ""}`];
    } else {
      return [`e`, event.id];
    }
  }

  async addCollectByEvent(name: string, event: Event) {
    await this.addCollect(name, ...this.createTag(event));
  }
  async hasTag(name: string, type: string, item: string) {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return;

    const key = await this.createKeyByAddressPointer({
      kind,
      pubkey,
      identifier: name,
    });

    let data = await this.getData(key);
    if (!data) return false;
    return this.toHasByData(data, type, item);
  }
  async hasByEvent(name: string, event: Event) {
    const [type, item] = this.createTag(event);

    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return;

    const key = await this.createKeyByAddressPointer({
      kind,
      pubkey,
      identifier: name,
    });

    let data = await this.getData(key);
    if (!data) return false;
    return this.hasByData(event, data);
  }

  hasByData(event: Event, data: CategorizedBookmarksSynchronizerDataType) {
    const [type, item] = this.createTag(event);
    return this.toHasByData(data, type, item);
  }
  toHasByData(
    data: CategorizedBookmarksSynchronizerDataType,
    type: TagType,
    item: string
  ) {
    const list = data.map.get(type);
    if (!list) return false;
    return list.has(item);
  }
  /**
   * 添加收藏
   * @param name
   * @param type
   * @param item
   * @returns
   */
  async addCollect(name: string, type: TagType, item: string) {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return;

    const key = await this.createKeyByAddressPointer({
      kind,
      pubkey,
      identifier: name,
    });

    let data = (await this.getData(key)) ?? { map: new Map(), name, size: 0 };
    if (this.toHasByData(data, type, item)) {
      return;
    }

    let list = data.map.get(type) ?? new Set();

    list.add(item);
    data.size++;
    data.map.set(type, list);

    await this.setData(key, data);

    await this.toChanged(key);

    await this.save();
  }

  async deleteCollectByEvent(name: string, event: Event) {
    await this.deleteCollect(name, ...this.createTag(event));
  }
  /**
   * 删除收藏
   * @param name
   * @param type
   * @param item
   * @returns
   */
  async deleteCollect(name: string, type: TagType, item: string) {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return;
    const key = await this.createKeyByAddressPointer({
      kind,
      pubkey,
      identifier: name,
    });
    let data = await this.getData(key);
    if (!data) {
      return;
    }
    if (!this.toHasByData(data, type, item)) {
      return;
    }

    let list = data.map.get(type);
    if (!list) {
      list = new Set();
    }

    list.delete(item);
    data.size--;
    data.map.set(type, list);

    await this.setData(key, data);

    await this.toChanged(key);
    await this.save();
  }
  values() {
    return this.map.values();
  }
  getList() {
    return [...this.values()].map((item) => item.data);
  }
  async getCollect(name: string) {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return;
    const key = await this.createKeyByAddressPointer({
      kind,
      pubkey,
      identifier: name,
    });
    return await this.getData(key);
  }
}
export function getCategorizedBookmarksSynchronizer() {
  return useCache(
    "getCategorizedBookmarksSynchronizer",
    () => {
      return new CategorizedBookmarksSynchronizer();
    },
    { useLocalStorage: false }
  );
}
