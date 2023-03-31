<script lang="ts" setup>
import { getSourceUrls } from "@/nostr/staff/createEventSourceTracers";
import { Event } from "nostr-tools";
import { getUrlColor } from "./PapawSourceUrl";
import RelayAddButtonVue from "./RelayAddButton.vue";
import RelayConnectListVue from "./RelayConnectList.vue";

const props = defineProps<{ event: Event }>();
const event = toRef(props, "event");
const sourceUrls = computed(() => getSourceUrls(event.value.id));
const active = ref(false);
</script>

<template>
  <div class="flex pb-2 px-4" @click="() => (active = !active)">
    <div
      v-for="url in sourceUrls"
      class="h-4 w-4 rounded-full mr-2"
      :style="{
        backgroundColor: getUrlColor(url),
      }"
    ></div>
  </div>
  <n-collapse-transition :show="active">
    <RelayConnectListVue :urls="sourceUrls ?? []" title="">
      <template #right="{ url }">
        <RelayAddButtonVue :url="url" />
      </template>
    </RelayConnectListVue>
  </n-collapse-transition>
</template>

<style scoped></style>
