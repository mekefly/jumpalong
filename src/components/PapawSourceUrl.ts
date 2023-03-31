import { defaultCacheOptions, getCacheOrNull, setCache } from "@/utils/cache";
import { randomColorHex } from "@/utils/utils";

const cacheKey = "__color_map";
const cacheOptions = { ...defaultCacheOptions };
export const colorMap =
  (getCacheOrNull(cacheKey, cacheOptions) as Record<string, string>) ?? {};

export function getUrlColor(url: string) {
  const color = colorMap[url];
  if (color) {
    return color;
  }
  const color1 = randomColorHex();
  colorMap[url] = color1;
  setCache(cacheKey, colorMap, cacheOptions);
  return color1;
}
