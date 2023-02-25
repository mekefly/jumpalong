<script lang="ts" setup>
import { relayConfigurator } from "../api/relays";
import { relayPool } from "../nostr/relay";
import AddButtonVue from "./AddButton.vue";
import ButtonCloseVue from "./ButtonClose.vue";
import Ellipsis from "./Ellipsis.vue";
</script>

<template>
  <n-card title="活动中继">
    <n-table striped>
      <tbody>
        <tr class="flex" v-for="relayConnect in relayPool">
          <td class="flex-grow">
            <Ellipsis
              >{{ relayConnect?.relay.url }} ({{
                relayConnect?.taskList.size
              }})</Ellipsis
            >
          </td>
          <td class="shrink-0">
            <n-space justify="end" align="center">
              <AddButtonVue
                @click="() => relayConfigurator.addWriteRead(relayConnect?.relay.url as any)"
              >
              </AddButtonVue>
              <ButtonCloseVue @close="() => relayConnect?.relay.close()" />
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
</template>

<style scoped></style>
