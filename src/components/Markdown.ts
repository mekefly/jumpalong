import { createGetEventLineByAddressPointer } from "@/api/event";
import { EventBeltline } from "@/nostr/eventBeltline";
import { getOnlyTag } from "@/nostr/tag";
import { toDeCodeAddress } from "@/utils/nostr";
import { createInjection } from "@/utils/use";
import { Event } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";

export type LongFormContentOptions = {
  content: string;
  title: string;
  publishedAt: number;
  summary: string;
  image: string;
  hashtags: string[];
};

type UseMarkdownStateReturnType = {
  line: EventBeltline<any>;
  addressPointer: ComputedRef<AddressPointer | null>;
  event: ComputedRef<Event | undefined>;
  longFormContentOptions: ComputedRef<
    Partial<LongFormContentOptions> | undefined
  >;
};

export function useMarkdownState(
  address: Ref<AddressPointer | undefined>
): UseMarkdownStateReturnType;
export function useMarkdownState(
  address: Ref<string | undefined>
): UseMarkdownStateReturnType;

export function useMarkdownState(
  address: Ref<string | AddressPointer | undefined>
): UseMarkdownStateReturnType {
  const addressPointer = computed(() => {
    if (!address.value) {
      return null;
    } else {
      return typeof address.value === "object"
        ? address.value
        : toDeCodeAddress(address.value);
    }
  });
  const line = computed(
    () =>
      addressPointer.value &&
      createGetEventLineByAddressPointer(addressPointer.value, {
        urls: new Set(addressPointer.value.relays),
      })
  );
  const event = computed(() => line.value?.feat.getLatestEvent());
  return {
    line: line as any,
    addressPointer,
    event,
    longFormContentOptions: useLongFormContentOptions(event),
  };
}

export function useLongFormContentOptions<E extends Event | undefined>(
  event: Ref<E>
) {
  return computed(() => {
    if (!event.value) return;
    const option: Partial<LongFormContentOptions> = {};

    option.content = event.value.content;

    for (const type of ["title", "summary", "image"] as const) {
      const tag = getOnlyTag(type, event.value.tags);
      if (tag && tag[1]) {
        option[type] = tag[1];
      }
    }

    const tag = getOnlyTag("published_at", event.value.tags);
    if (tag && tag[1]) {
      try {
        option["publishedAt"] = parseInt(tag[1]);
      } catch (error) {}
    }

    option["hashtags"] = event.value.tags
      .filter((tag) => tag[0] === "t" && tag[1])
      .map((tag) => tag[1]);

    return option;
  });
}
export const [proviteArticeSetting, useArticeSetting] = createInjection(
  (opt: { showArticleDetails: boolean }) => {
    return opt;
  }
);
