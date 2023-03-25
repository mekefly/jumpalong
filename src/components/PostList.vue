<script lang="ts" setup>
import { NSkeleton, NSpace } from "naive-ui";
import { Event, Filter } from "nostr-tools";
import { eventDeletion } from "../api/event";
import { getShortTextEventBeltline } from "../api/shortTextEventBeltline";
import PapawVue from "./Papaw.vue";

logger.for("home.vue").for("PostList.vue").info("进入PostList.vue");

const props = defineProps<{
  urls?: Set<string>;
  pubkey?: string[];
  filter?: Filter;
  pushEvent?: (e: Event) => void;
}>();
const emit = defineEmits<{
  (e: "update:pushEvent", v: (e: Event) => void): void;
}>();
const { pubkey, filter, urls: url } = toRefs(props);

logger
  .for("home.vue")
  .for("PostList.vue")
  .debug("defineProps > pubkey:", pubkey);

const beltline = computed(() => {
  const opt: any = {};

  url?.value && url.value.size > 0 && (opt.relayUrls = url.value);
  filter?.value && (opt.filter = filter.value);

  return getShortTextEventBeltline(pubkey?.value, opt);
});
onUnmounted(() => {
  beltline.value.closeReq();
});

const postEvents = computed(() => beltline.value.getList());

emit("update:pushEvent", (e: Event) => {
  beltline.value.pushEvent(e);
});
</script>

<template>
  <div>
    <div class="p-6" v-if="!postEvents.length">
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
    <n-empty v-if="!postEvents.length" description="你什么也找不到"> </n-empty>

    <PapawVue
      v-for="event in postEvents"
      :key="event.id"
      :event="event"
      :deleteEvent="(id) => eventDeletion([id])"
    />
  </div>
</template>

<style scoped></style>
