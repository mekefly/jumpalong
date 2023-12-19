import { Event, Filter } from 'nostr-tools'
import { EventLine } from '..'
import { getOnlyTag } from '../event/tag'
import ReplaceableSynchronizerAbstract from './abstract/ReplaceableSynchronizerAbstract'

type PinList = { tagMap: Map<string, string[]> }
export class PinListSynchronizer extends ReplaceableSynchronizerAbstract<PinList> {
  kind = 10001 as any
  constructor(line: EventLine<{}>) {
    super(line, 'PinListSync')
  }
  createDefault(): PinList {
    return { tagMap: new Map() }
  }
  async getFilters(): Promise<Filter[]> {
    const pubkey = await this.getLine().getPubkeyOrNull()
    if (!pubkey) return []
    return [
      {
        authors: [pubkey],
        kinds: [this.kind],
      },
    ]
  }
  async serializeToData(e: Event): Promise<PinList> {
    const tagMap = new Map()
    for (const tag of e.tags) {
      tagMap.set(JSON.stringify(tag), tag)
    }

    return {
      tagMap,
    }
  }
  async deserializeToEvent(data: PinList, changeAt: number): Promise<Event> {
    return await this.getLine().createEvent({
      tags: [...data.tagMap.values()],
      created_at: changeAt,
      kind: this.kind,
    })
  }
  public getPinListSync() {
    return this.getDataSync()
  }
  private createPinTag(event: Event) {
    const kind = event.kind
    if (kind === 0) {
      return ['p', event.pubkey]
    } else if (kind === 1) {
      return ['e', event.id]
    } else if (kind >= 30000 && kind <= 39999) {
      const tag = getOnlyTag('a', event.tags)
      if (tag) {
        return tag
      }
      const dt = getOnlyTag('d', event.tags)
      if (dt && dt[1]) {
        return ['a', `${event.kind}:${event.pubkey}:${dt[1]}`]
      }
      return null
    } else {
      return ['e', event.id]
    }
  }
  public has(tag: string[]) {
    return this.getPinListSync().tagMap.has(JSON.stringify(tag))
  }
  public hasByEvent(event: Event) {
    const tag = this.createPinTag(event)
    if (!tag) {
      return false
    }
    return this.getPinListSync().tagMap.has(JSON.stringify(tag))
  }
  private addPin(tag: string[]) {
    const data = this.getPinListSync()
    data.tagMap.set(JSON.stringify(tag), tag)
  }
  private removePin(tag: string[]) {
    const data = this.getPinListSync()
    data.tagMap.delete(JSON.stringify(tag))
  }
  public async pin(event: Event) {
    const tag = this.createPinTag(event)

    if (!tag) return
    if (this.has(tag)) return

    this.addPin(tag)
    this.toChanged()
    await this.save()
  }
  public async unpin(event: Event) {
    const tag = this.createPinTag(event)
    if (!tag) return
    if (!this.has(tag)) return

    this.removePin(tag)
    this.toChanged()
    await this.save()
  }
}
