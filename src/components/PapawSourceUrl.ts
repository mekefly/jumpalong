import { randomColorHex } from "@/utils/utils";

export const colorMap = new Map<string, string>();

export function getUrlColor(url: string) {
  const color = colorMap.get(url);
  if (color) {
    return color;
  }
  const color1 = randomColorHex();
  colorMap.set(url, color1);
  return color1;
}
