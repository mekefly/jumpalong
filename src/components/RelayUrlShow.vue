<script lang="ts" setup>
import { useToRelayInfo } from "../views/RelayInfoView";
import PingVue from "./Ping.vue";
const props = defineProps<{ url?: string }>();

const slots = useSlots();
const url = computed(() => {
  if (props.url) {
    return props.url;
  }

  const u = slots.default?.()[0] as any;
  if (u && typeof u.children === "string") {
    return u.children;
  }
  return;
});

const { toRelayInfoView } = useToRelayInfo();
</script>

<template>
  <div>
    <n-button v-if="url" text @click="() => toRelayInfoView(url)">
      <template #icon>
        <n-icon> </n-icon>
      </template>
      <span class="ml-2 flex">
        <span>
          <PingVue :url="url" />
        </span>
        {{ url }}
      </span>
    </n-button>
  </div>
</template>

<style scoped></style>
