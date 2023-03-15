<script lang="ts" setup>
import { NSkeleton, NSpace } from "naive-ui";
import { Filter } from "nostr-tools";
import { eventDeletion } from "../api/event";
import { getShortTextEventBeltline } from "../api/shortTextEventBeltline";
import PapawVue from "./Papaw.vue";

logger.for("home.vue").for("PostList.vue").info("进入PostList.vue");

const props = defineProps<{ pubkey?: string[]; filter?: Filter }>();
const { pubkey, filter } = toRefs(props);

logger
  .for("home.vue")
  .for("PostList.vue")
  .debug("defineProps > pubkey:", pubkey);

const beltline = computed(() => {
  const opt: any = {};

  filter?.value && (opt.filter = filter.value);

  return getShortTextEventBeltline(pubkey?.value, opt);
});
onUnmounted(() => {
  beltline.value.closeReq();
});

const postEvents = computed(() => beltline.value.getList());

// const v = ref({} as Record<string, UserMetaData>);
// const userMetaDataMap = reactive(new WeakMap<object, UserMetaData>());
// beltline.addStaff({
//   push: (e) => {
//     v.value[e.pubkey] = { name: e.pubkey.slice(0, 10) };
//     getUserMetadataByPubkey(e.pubkey).then((data) => {
//       if (!data) return;
//       v.value[e.pubkey] = data;
//       userMetaDataMap.set(e, data);
//     });
//   },
//   feat: {
//     getUserMetaData(e: Event) {
//       return userMetaDataMap.get(e);
//     },
//   },
// });
</script>

<template>
  <div>
    <div class="p-6" v-if="!postEvents.length">
      <n-space vertical>
        <n-card class="" v-for="_ in Array(10)">
          <n-space vertical class="p-8">
            <n-space class="flex" align="center">
              <NSkeleton circle class="w-12 h-12"></NSkeleton>
              <NSkeleton text class="w-80 h-6" :sharp="false"></NSkeleton>
            </n-space>
            <n-skeleton text :repeat="4" round />
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
