<script lang="ts" setup>
import Scrollbar from "naive-ui/es/scrollbar/src/Scrollbar";
import RelayUrlShowVue from "./RelayUrlShow.vue";

const props = defineProps<{
  urls: Iterable<string>;
  title: string;
}>();
</script>

<template>
  <n-card :title="props.title ?? '中续'">
    <Scrollbar class="max-h-[40em]">
      <n-table striped>
        <tbody class="w-full">
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
  </n-card>
</template>

<style scoped></style>
