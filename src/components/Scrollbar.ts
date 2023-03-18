import EventEmitter from "events";
import { ScrollbarInst } from "naive-ui";
import { InjectionKey } from "vue";

export const scrollbarInstKey: InjectionKey<{
  scrollbarInst: Ref<ScrollbarInst | null>;
  onScroll: (handle: (e: Event) => void) => void;
  removeScrollListener: (handle: (e: Event) => void) => void;
}> = Symbol("scrollbarInstKey");

const eventEmitter = new EventEmitter();
export const useProviteScrollbarInstRef = () => {
  const scrollbarInstRef = ref<ScrollbarInst | null>(null);
  provide(scrollbarInstKey, {
    scrollbarInst: scrollbarInstRef,
    onScroll(e: (e: Event) => void) {
      eventEmitter.on("scroll", e);
    },
    removeScrollListener(e: (e: Event) => void) {
      eventEmitter.removeListener("scroll", e);
    },
  });
  const handleOnScroll = (e: Event) => {
    eventEmitter.emit("scroll", e);
  };
  return { scrollbarInstRef, handleOnScroll };
};
export const useInjectScrollbarInstRef = () => {
  return inject(scrollbarInstKey, () => undefined, true);
};
