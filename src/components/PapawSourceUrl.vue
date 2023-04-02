<script lang="ts" setup>
import { getSourceUrls } from "@/nostr/staff/createEventSourceTracers";
import { Event } from "nostr-tools";
import DrawerVue from "./Drawer.vue";
import { getUrlColor } from "./PapawSourceUrl";
import RelayAddButtonVue from "./RelayAddButton.vue";
import RelayConnectListVue from "./RelayConnectList.vue";
import ScrollbarVue from "./Scrollbar.vue";

const props = defineProps<{ event: Event }>();
const event = toRef(props, "event");
const sourceUrls = computed(() => getSourceUrls(event.value.id));
const active = ref(false);
</script>

<template>
  <div class="flex pb-2 px-4" @click="() => (active = !active)">
    <div
      v-for="url in sourceUrls"
      class="h-2 w-2 rounded-full mr-1"
      :style="{
        backgroundColor: getUrlColor(url),
      }"
    ></div>
  </div>
  <DrawerVue v-model:show="active" :height="'100%'" closable>
    <ScrollbarVue>
      <RelayConnectListVue :urls="sourceUrls ?? []" title="">
        <template #right="{ url }">
          <RelayAddButtonVue :url="url" />
        </template>
      </RelayConnectListVue>
    </ScrollbarVue>
  </DrawerVue>
</template>

<style scoped></style>
