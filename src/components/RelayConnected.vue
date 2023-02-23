<script lang="ts" setup>
import { relayConfigurator, relayPool } from "../api/relays";
import AddButtonVue from "./AddButton.vue";
import Ellipsis from "./Ellipsis.vue";
import CloseVue from "./icon/Close.vue";
</script>

<template>
  <n-card title="活动中继">
    <n-table striped>
      <tbody>
        <tr class="flex" v-for="relay in relayPool">
          <td class="flex-grow">
            <Ellipsis>{{ relay?.url }}</Ellipsis>
          </td>
          <td class="shrink-0">
            <n-space justify="end" align="center">
              <AddButtonVue
                @click="() => relayConfigurator.addWriteRead(relay?.url as any)"
              >
              </AddButtonVue>

              <n-button
                quaternary
                circle
                type="error"
                class="text-[#6c5ce7] hover:text-[#a29bfe]"
                @click="() => relay?.close()"
              >
                <template #icon>
                  <n-icon>
                    <CloseVue />
                  </n-icon>
                </template>
              </n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
</template>

<style scoped></style>
