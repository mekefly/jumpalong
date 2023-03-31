<script lang="ts" setup>
import { eventDeletionOne } from "@/api/event";
import PapawVueList from "@/components/PapawList.vue";
import { t } from "@/i18n";
import { NSkeleton, NSpace } from "naive-ui";
import { Event, Filter } from "nostr-tools";
import { createTextEventBeltline } from "../api/shortTextEventBeltline";
import { useLoad } from "./Refresh";

logger.for("home.vue").for("PostList.vue").info("进入PostList.vue");

const props = defineProps<{
  urls?: Set<string>;
  pubkeys?: string[];
  filter?: Filter;
  filters?: Filter[];
  pushEvent?: (e: Event) => void;
  active?: boolean;
}>();
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
          kinds: [1],
          authors: [pubkey],
        } as Filter;
      })
    );

  return _filters;
});

const textEventbeltline = computed(() => {
  const opt: any = {};
  return createTextEventBeltline({
    filters: mergeFilters.value,
    ...opt,
  });
});

useLoad(textEventbeltline, active);

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
</script>

<template>
  <div>
    <div class="p-6" v-if="isLoading && postEvents && postEvents.length === 0">
      <n-space vertical>
        <n-card class="" v-for="_ in Array(5)">
          <n-space vertical class="p-8">
            <div class="flex items-center">
              <NSkeleton circle class="w-12 h-12 flex-shrink-0"></NSkeleton>
              <NSkeleton
                text
                class="w-80 flex-shrink h-6 ml-3"
                :sharp="false"
              ></NSkeleton>
            </div>
            <n-skeleton text :repeat="5" round />
          </n-space>
        </n-card>
      </n-space>
    </div>

    <div
      v-else-if="!isLoading && postEvents && postEvents.length === 0"
      class="h-40 flex justify-center items-center"
    >
      <n-empty :description="t('empty_text')" size="huge"> </n-empty>
    </div>

    <PapawVueList
      v-if="postEvents"
      :eventList="postEvents"
      withPapawOptionsButtons
      @eventDeletion="(id) => eventDeletionOne(id)"
    />
  </div>
</template>

<style scoped></style>
