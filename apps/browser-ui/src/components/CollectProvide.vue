<script lang="ts" setup>
import { t } from "@/i18n";
import { getCategorizedBookmarksSynchronizer } from "@/nostr/Synchronizer/CategorizedBookmarksSynchronizer";
import {
  useRecommendEvent,
  useRecommendUser,
  useRecommendUserMetadata,
} from "@/state/nostr";
import { useAsyncComputed } from "@/utils/use";
import { provideCollect } from "./CollectProvide";
import CollectProvideItem from "./CollectProvideItem.vue";
import Drawer from "./Drawer.vue";
import Scrollbar from "./Scrollbar.vue";

const state = provideCollect();

const collectSynchronizer = getCategorizedBookmarksSynchronizer();
const values = computed(() => collectSynchronizer.getList());
const collect = ref(new Set<string>());
const uncollect = ref(new Set<string>());
const recommendEvent = useRecommendEvent();
const recommendUser = useRecommendUser();
const recommendUserMetadata = useRecommendUserMetadata();

const defaultData = useAsyncComputed(async () => {
  return await collectSynchronizer.getCollect("default");
});
async function handleComplete() {
  const event = state.event.value;
  if (!event) return;
  for (const name of collect.value) {
    await collectSynchronizer.addCollectByEvent(name, event);
  }

  for (const name of uncollect.value) {
    await collectSynchronizer.deleteCollectByEvent(name, event);
  }

  recommendEvent(event);
  recommendUser(event.pubkey);
  recommendUserMetadata(event.pubkey);
  collect.value.clear();
  uncollect.value.clear();

  state.show.value = false;
}
const createDrawerShow = ref(false);
function handleCreate() {
  createDrawerShow.value = true;
}
const createName = ref("");
function handleCreateComplete() {
  const event = state.event.value;
  if (!event) return;
  collectSynchronizer.addCollectByEvent(createName.value, event);

  recommendEvent(event);
  recommendUser(event.pubkey);
  recommendUserMetadata(event.pubkey);
}
const event = computed(() => state.event.value);
</script>

<template>
  <Drawer
    placement="bottom"
    height="100%"
    v-model:show="createDrawerShow"
    closable
  >
    <n-space vertical>
      <n-input v-model:value="createName" :placeholder="t('name')"></n-input>
      <n-button @click="handleCreateComplete">{{ t("complete") }}</n-button>
    </n-space>
  </Drawer>
  <Drawer
    placement="bottom"
    height="80%"
    v-model:show="state.show.value"
    closable
  >
    <template #footer>
      <n-button @click="handleCreate">
        {{ t("create") }}
      </n-button>
    </template>
    <div class="flex flex-col h-full w-full">
      <Scrollbar class="flex-shrink flex-1">
        <n-list bordered>
          <CollectProvideItem
            :collect="collect"
            :uncollect="uncollect"
            v-if="!defaultData && event"
            :key="'deafault'"
            :event="event"
            :data="{ name: 'default', map: new Map(), size: 0 }"
          ></CollectProvideItem>

          <CollectProvideItem
            :collect="collect"
            :uncollect="uncollect"
            v-if="event"
            v-for="value in values"
            :key="value.name"
            :event="event"
            :data="value"
          ></CollectProvideItem>
        </n-list>
      </Scrollbar>
      <n-button @click="handleComplete">{{ t("complete") }}</n-button>
    </div>
  </Drawer>
  <slot></slot>
</template>

<style scoped></style>
