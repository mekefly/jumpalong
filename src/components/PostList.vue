<script lang="ts" setup>
import { eventDeletionOne } from "@/api/event";
import PapawVueList from "@/components/PapawList.vue";
import { t } from "@/i18n";
import { useElementIntoScreen } from "@/utils/use";
import { Event, Filter } from "nostr-tools";
import { createTextEventBeltline } from "../api/shortTextEventBeltline";
import { useLoad } from "./Refresh";

logger.for("home.vue").for("PostList.vue").info("进入PostList.vue");

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

logger
  .for("home.vue")
  .for("PostList.vue")
  .debug("defineProps > pubkey:", pubkey);
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

const allPubkeys = computed(() => [
  ...(pubkey?.value ?? []),
  ...mergeFilters.value.map((filter) => filter.authors ?? []).flat(1),
]);

const textEventbeltline = computed(() => {
  const opt: any = {};
  const line = createTextEventBeltline({
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

    <PapawVueList
      v-if="postEvents"
      :eventList="postEvents"
      withPapawOptionsButtons
      :disabledReply="disabledReply"
      @eventDeletion="(id) => eventDeletionOne(id)"
    />
  </div>
</template>

<style scoped></style>
