<script lang="ts" setup>
import { NSpace } from "naive-ui";
import { relayConfigurator } from "../nostr/nostr";
import AddButton from "./AddButton.vue";
import EllipsisVue from "./Ellipsis.vue";
import RelayFailedFlay from "./RelayFailedFlay.vue";
import RelayUrlShowVue from "./RelayUrlShow.vue";

const other = computed(() => relayConfigurator.getOtherList());
</script>

<template>
  <n-card title="其他" class="h-[512px] overflow-auto">
    <n-table striped>
      <tbody>
        <tr class="flex" v-for="(url, index) in other">
          <td class="flex-grow">
            <RelayUrlShowVue :url="url">
              <EllipsisVue>{{ url }}</EllipsisVue>
            </RelayUrlShowVue>
          </td>
          <td class="shrink-0">
            <n-space justify="end" align="center">
              <AddButton @click="() => relayConfigurator.addWriteRead(url)" />
              <RelayFailedFlay :url="url" />
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
</template>

<style scoped></style>
