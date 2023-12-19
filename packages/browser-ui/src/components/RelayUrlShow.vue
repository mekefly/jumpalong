<script lang="ts" setup>
import { useThemeVars } from "naive-ui";
import { useToRelayInfo } from "../views/RelayInfoView";
import EllipsisVue from "./Ellipsis.vue";
import PingVue from "./Ping.vue";
const props = defineProps<{ url: string }>();

const { url } = toRefs(props);

const themes = useThemeVars();
const { toRelayInfoView } = useToRelayInfo();
const active = ref(false);
</script>

<template>
  <div>
    <div
      class="flex w-full button"
      v-if="url"
      @click="() => toRelayInfoView(url)"
      @mouseenter="() => (active = true)"
      @mouseleave="() => (active = false)"
      :style="{
        color: active ? themes.successColorHover : undefined,
      }"
    >
      <span class="flex w-full">
        <slot class="w-0 flex-1 flex-shrink">
          <EllipsisVue>{{ url }}</EllipsisVue>
        </slot>
        <PingVue class="shrink-0" :url="url" />
      </span>
    </div>
  </div>
</template>

<style scoped></style>
