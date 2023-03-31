<script lang="ts" setup>
import { t } from "@/i18n";
import Scrollbar from "naive-ui/es/scrollbar/src/Scrollbar";
import RelayUrlShowVue from "./RelayUrlShow.vue";

const props = defineProps<{
  urls: Iterable<string>;
  title?: string;
  loadable?: boolean;
}>();
const isEmpty = computed(
  () => props.urls[Symbol.iterator]().next().done === true
);
</script>

<template>
  <n-card :title="props.title ?? '中续'">
    <Scrollbar class="max-h-[40em]">
      <n-table striped>
        <tbody class="w-full">
          <div
            class="w-full h-28 flex justify-center items-center"
            v-if="props.loadable && isEmpty"
          >
            <n-spin size="large" />
          </div>
          <n-empty
            v-else-if="isEmpty"
            size="large"
            :description="t('empty_text')"
          >
          </n-empty>
          <tr class="flex" v-for="url in props.urls" :key="url">
            <td class="flex-grow w-0 flex-shrink">
              <RelayUrlShowVue :url="url"> </RelayUrlShowVue>
            </td>
            <td class="shrink-0 flex justify-center items-center">
              <slot name="right" :url="url"></slot>
            </td>
          </tr>
        </tbody>
      </n-table>
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
