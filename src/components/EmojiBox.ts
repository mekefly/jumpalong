import { debounce } from "@/utils/utils";

export type Emoji = {
  type: TypeEmoji;
  emoji: string;
  name: string;
  UNICODE: string;
};
export type TypeEmoji = string;
export type JsonData = [string, string, string, string][] | null;

export function useJsonDataList() {
  const data = ref<JsonData>(null);
  const json = import("@/json/emoji.json");
  const isLoading = ref(true);

  json.then((json) => {
    isLoading.value = false;
    data.value = json.default as any;
  });
  return { data, isLoading };
}
export function useEmojiClassificationTable(
  data: Ref<JsonData>,
  searchValue: Ref<string>
) {
  const map = ref<Record<string, Emoji[]>>({});
  const debounceCreateMap = debounce((...rest: [any, any]) => {
    map.value = createMap(...rest);
  }, 500);

  watchEffect(() => {
    debounceCreateMap(searchValue.value, data.value);
  });

  function createMap(searchValue: string, data: JsonData) {
    if (!data) return {};
    const _map: Record<string, Emoji[]> = reactive({});
    for (const emojiArray of data) {
      const type = emojiArray[0];
      const emoji = emojiArray[1];
      const name = emojiArray[2];
      const UNICODE = emojiArray[3];
      if (!name.includes(searchValue)) continue;

      let arr = _map[type];
      if (!arr) {
        arr = [];
        _map[type] = arr;
      }
      arr.push({ type, emoji, name, UNICODE });
    }
    return _map;
  }

  return { emojiClassificationTable: map };
}
