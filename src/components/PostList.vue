<script lang="ts" setup>
import { eventDeletionOne } from "@/api/event";
import PapawVueList from "@/components/PapawList.vue";
import { NSkeleton, NSpace } from "naive-ui";
import { Event, Filter } from "nostr-tools";
import { getShortTextEventBeltline } from "../api/shortTextEventBeltline";

logger.for("home.vue").for("PostList.vue").info("进入PostList.vue");

const props = defineProps<{
  urls?: Set<string>;
  pubkey?: string[];
  filter?: Filter;
  pushEvent?: (e: Event) => void;
  beltline?: ReturnType<typeof getShortTextEventBeltline>;
}>();
const emit = defineEmits<{
  (e: "update:pushEvent", v: (e: Event) => void): void;
  (e: "update:beltline", v: ReturnType<typeof getShortTextEventBeltline>): void;
}>();
const { pubkey, filter, urls: url } = toRefs(props);

logger
  .for("home.vue")
  .for("PostList.vue")
  .debug("defineProps > pubkey:", pubkey);

const beltline = computed(() => {
  if (pubkey?.value?.length === 0) return;
  const opt: any = {};

  url?.value && url.value.size > 0 && (opt.relayUrls = url.value);
  filter?.value && (opt.filter = filter.value);

  return getShortTextEventBeltline(pubkey?.value, opt);
});
watch(
  beltline,
  () => {
    if (!beltline.value) {
      return;
    }

    emit("update:beltline", beltline.value);
  },
  {
    immediate: true,
  }
);
onUnmounted(() => {
  beltline.value?.closeReq();
});

const postEvents = computed(() => beltline.value?.getList());

emit("update:pushEvent", (e: Event) => {
  beltline.value?.pushEvent(e);
});
</script>

<template>
  <div>
    <div class="p-6" v-if="!postEvents || postEvents.length === 0">
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

    <PapawVueList
      v-if="postEvents"
      :eventList="postEvents"
      @eventDeletion="(id) => eventDeletionOne(id)"
    />
  </div>
</template>

<style scoped></style>
