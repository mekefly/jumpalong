<script lang="ts" setup>
import { NSpace } from "naive-ui";
import { relayConfigurator } from "../api/relays";
import AddButton from "./AddButton.vue";
import Ellipsis from "./Ellipsis.vue";
import RelayFailedFlay from "./RelayFailedFlay.vue";

const other = computed(() => relayConfigurator.getOtherList());
</script>

<template>
  <n-card title="其他">
    <n-table striped>
      <tbody>
        <tr class="flex" v-for="(url, index) in other">
          <td class="flex-grow">
            <Ellipsis>{{ url }}</Ellipsis>
          </td>
          <td class="shrink-0">
            <n-space justify="end" align="center">
              <AddButton @click="() => relayConfigurator.addWriteRead(url)" />
              <RelayFailedFlay url="url" />
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
</template>

<style scoped></style>
