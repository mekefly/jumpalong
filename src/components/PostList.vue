<script lang="ts" setup>
import { EventApi } from "@/api/event";
import PapawVueList from "@/components/PapawList.vue";
import { t } from "@/i18n";
import { TYPES } from "@/nostr/nostr";
import { useElementIntoScreen } from "@/utils/use";
import { Event, Filter } from "nostr-tools";
import { useNostrContainerGet } from "./NostrContainerProvade";
import PapawByAddr from "./PapawByAddr.vue";
import PapawById from "./PapawById.vue";
import { useLoad } from "./Refresh";
const logger = loggerScope;
logger.debug();

const props = withDefaults(
  defineProps<{
    urls?: Set<string>;
    pubkeys?: string[];
    filter?: Filter;
    filters?: Filter[];
    pushEvent?: (e: Event) => void;
    active?: boolean;
    disabledLoad?: boolean;
    disabledEmpty?: boolean;
    limit?: number;
    reverseSort?: boolean;
    disabledReply?: boolean;
    tags?: string[][];
  }>(),
  {
    active: true,
  }
);
const emit = defineEmits<{
  (e: "update:pushEvent", v: (e: Event) => void): void;
}>();
const { pubkeys: pubkey, filter, filters, urls, active } = toRefs(props);
const message = useMessage();
const eventApi = useNostrContainerGet<EventApi>(TYPES.EventApi);

const mergeFilters = computed(() => {
  const _filters = filters?.value ? [...filters.value] : [];

  filter?.value && _filters.push(filter.value);
  pubkey?.value &&
    _filters.push(
      ...pubkey.value.map((pubkey) => {
        return {
          kinds: [30023, 1],
          authors: [pubkey],
        } as Filter;
      })
    );

  return _filters;
});

const generalEventEventBeltline = useNostrContainerGet(
  TYPES.GeneralEventEventBeltline
);
logger.silly("generalEventEventBeltline", generalEventEventBeltline);

const allPubkeys = computed(() => [
  ...(pubkey?.value ?? []),
  ...mergeFilters.value.map((filter) => filter.authors ?? []).flat(1),
]);

const textEventbeltline = computed(() => {
  const opt: any = {};

  const line = generalEventEventBeltline.createGeneralEventEventBeltline({
    filters: mergeFilters.value,
    ...opt,
    addUrls: urls?.value,
    pubkeys: allPubkeys.value,
    limit: props.limit,
  });

  props.reverseSort && line.addStaffOfSortByCreateAt();

  return line;
});

const loadOptions = useLoad(textEventbeltline, active);

onUnmounted(() => {
  textEventbeltline.value?.closeReq();
});

const postEvents = computed(() => textEventbeltline.value?.getList());

emit("update:pushEvent", (e: Event) => {
  textEventbeltline.value?.pushEvent(e);
});
const isLoading = computed(
  () =>
    textEventbeltline.value?.feat.loadBufferOpt.isLoading ||
    textEventbeltline.value?.feat.refreshBufferOpt.isLoading
);
defineExpose({
  postEvents,
  ...loadOptions,
});
const divRef = ref(undefined);
useElementIntoScreen(divRef, {
  active: active ?? ref(true),
});

const instance = ref(getCurrentInstance());
</script>

<template>
  <div ref="divRef">
    <div
      class="py-20 flex items-center justify-center"
      v-if="!disabledLoad && isLoading && postEvents && postEvents.length === 0"
    >
      <n-spin size="medium" />
    </div>

    <div
      v-else-if="
        !disabledEmpty && !isLoading && postEvents && postEvents.length === 0
      "
      class="h-40 flex justify-center items-center"
    >
      <n-empty :description="t('empty_text')" size="huge"> </n-empty>
    </div>

    <div v-if="tags" v-for="tag in tags">
      <PapawById
        v-if="tag[0] === 'e' && tag[1]"
        :id="tag[1]"
        :relays="tag[2] ? new Set([tag[2]]) : undefined"
      ></PapawById>

      <PapawByAddr
        v-else-if="tag[0] === 'a' && tag[1]"
        :a="tag[1]"
      ></PapawByAddr>
    </div>

    <PapawVueList
      v-if="postEvents"
      :eventList="postEvents"
      withPapawOptionsButtons
      :disabledReply="disabledReply"
      @eventDeletion="(id) => eventApi.eventDeletionOne(id)"
    />
  </div>
</template>

<style scoped></style>
