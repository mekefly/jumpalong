<script lang="ts" setup>
import { relayConfigurator, relayPool } from "../nostr/nostr";
import AddButtonVue from "./AddButton.vue";
import ButtonCloseVue from "./ButtonClose.vue";
import EllipsisVue from "./Ellipsis.vue";
import RelayUrlShowVue from "./RelayUrlShow.vue";
const pool = computed(() => {
  return relayPool.getPool();
});
</script>

<template>
  <n-card title="活动中继">
    <n-table striped>
      <tbody>
        <tr class="flex" v-for="[url, relayConnect] in pool">
          <td class="flex-grow">
            <RelayUrlShowVue :url="url">
              <EllipsisVue>
                {{ url }}
                ({{ relayConnect.subIds.size }})
              </EllipsisVue>
            </RelayUrlShowVue>
          </td>
          <td class="shrink-0">
            <n-space justify="end" align="center">
              <AddButtonVue
                @click="() => relayConfigurator.addWriteRead(url as any)"
              >
              </AddButtonVue>
              <ButtonCloseVue @close="() => relayConnect.close()" />
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </n-card>
</template>

<style scoped></style>
