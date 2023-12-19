<script lang="ts" setup>
import Scrollbar from "naive-ui/es/scrollbar/src/Scrollbar";
import RelayConnectListVue from "./RelayConnectList.vue";

const props = defineProps<{
  urls: Iterable<string>;
  title?: string;
  loadable?: boolean;
}>();
</script>

<template>
  <n-card :title="props.title ?? '中续'">
    <Scrollbar class="max-h-[40em]">
      <RelayConnectListVue v-bind="props">
        <template #right="o"><slot name="right" v-bind="o"></slot></template>
      </RelayConnectListVue>
    </Scrollbar>

    <slot name="bottom"></slot>

    <template v-if="$slots['header-extra']" #header-extra>
      <slot name="header-extra"></slot>
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
    <template v-if="$slots.action" #action>
      <slot name="action"></slot>
    </template>
  </n-card>
</template>

<style scoped></style>
