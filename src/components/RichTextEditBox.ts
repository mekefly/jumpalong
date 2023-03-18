import { createEvent } from "@/nostr/event";
import { defaultCacheOptions, getCache, setCache } from "@/utils/cache";
import { CacheOptions } from "@/utils/cache/types";
import { createId } from "@/utils/utils";
import { MaybeRef } from "@vueuse/core";
import { EventEmitter } from "events";
import { Event } from "nostr-tools";

type EmitType = {
  (e: "reply", event: Event): void;
};
type OnType = {
  (e: "reply", callback: (event: Event) => void): void;
};
type Opt = {
  emitRichTextEditBox: EmitType;
  onRichTextEditBox: OnType;
  id: string;
};
const richTextEditBoxEmiterKey: InjectionKey<Opt> = Symbol();

export function useRichTextEditBoxOpt(id: MaybeRef<string> = createId()) {
  return inject(
    richTextEditBoxEmiterKey,
    () => {
      const eventEmiter = new EventEmitter();
      const emit: EmitType = function (e: "reply", event: Event) {
        console.log("emit", event);

        eventEmiter.emit(e, event);
      };

      const on: OnType = function on(e, callback) {
        console.log("on", "监听");
        eventEmiter.on(e, callback);
      };
      const opt: Opt = reactive({
        emitRichTextEditBox: emit,
        onRichTextEditBox: on,
        id: id,
      });

      provide(richTextEditBoxEmiterKey, opt);

      return opt;
    },
    true
  );
}
const cacheOptions: CacheOptions = {
  ...defaultCacheOptions,
  duration: 1000 * 60 * 60,
};
export function useCacheTextValue(id: Ref<string>) {
  const event = ref<Event>(
    createEvent({
      kind: 1,
    })
  );
  watch(
    id,
    () => {
      try {
        const c = getCache(`RichTextEditBox:${id.value}`, cacheOptions);
        console.log("获取到缓存了", c);

        event.value = c;
      } catch (error) {}
    },
    {
      immediate: true,
    }
  );
  watch(event, () => {
    setCache(`RichTextEditBox:${id.value}`, event.value, cacheOptions);
  });
  return event;
}
