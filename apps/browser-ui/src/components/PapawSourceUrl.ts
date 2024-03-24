// import { getSourceUrls } from "@/nostr/staff/createEventSourceTracers";
import { deserializeTagR } from '../nostr-runtime'
import {
  defaultCacheOptions,
  getCacheOrNull,
  randomColorHex,
  setAdds,
  setCache,
} from '@jumpalong/shared'
import { Event } from 'nostr-tools'

const cacheKey = '__color_map'
const cacheOptions = { ...defaultCacheOptions }
export const colorMap =
  (getCacheOrNull(cacheKey, cacheOptions) as Record<string, string>) ?? {}

export function getUrlColor(url: string) {
  const color = colorMap[url]
  if (color) {
    return color
  }
  const color1 = randomColorHex()
  colorMap[url] = color1
  setCache(cacheKey, colorMap, cacheOptions)
  return color1
}
export function getUrlsByEvent(event: Event) {
  const urls = event.tags
    .filter(tag => (tag[0] === 'e' || tag[0] === 'p') && tag[2])
    .map(tag => tag[2])
  return setAdds(
    deserializeTagR(event.tags),
    // getSourceUrls(event.id) ?? [],
    urls
  )
}
