<script lang="ts" setup>
import { NIcon, NSpace } from "naive-ui";
import { relayConfigurator } from "../api/relays";
import ButtonCloseVue from "./ButtonClose.vue";
import EllipsisVue from "./Ellipsis.vue";

const urls = computed(() => Object.keys(relayConfigurator.getConfiguration()));
function switchWrite(url: string) {
  relayConfigurator.hasWriteByUrl(url)
    ? relayConfigurator.remoteWrite(url)
    : relayConfigurator.addWrite(url);
}
function switchRead(url: string) {
  relayConfigurator.hasReadByUrl(url)
    ? relayConfigurator.remoteRead(url)
    : relayConfigurator.addRead(url);
}
</script>

<template>
  <n-card title="中继配置">
    <n-space vertical>
      <n-table striped>
        <tbody>
          <tr class="flex" v-for="url in urls">
            <td class="flex-grow">
              <EllipsisVue>{{ url }}</EllipsisVue>
            </td>
            <td class="flex-shrink-0">
              <n-space justify="end" align="center">
                <n-icon
                  :color="
                    relayConfigurator.hasWriteByUrl(url) ? '#2ed573' : undefined
                  "
                  @click="() => switchWrite(url)"
                >
                  <ArrowUpload16Filled />
                </n-icon>
                <n-icon
                  :color="
                    relayConfigurator.hasReadByUrl(url) ? '#2ed573' : undefined
                  "
                  @click="() => switchRead(url)"
                >
                  <ArrowDownload16Filled />
                </n-icon>
                <ButtonCloseVue @click="() => relayConfigurator.remove(url)" />
                <RelayFailedFlay url="url" />
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-space>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button @click="() => relayConfigurator.save()" type="primary">
              保存
            </n-button>
          </template>
          会发布到云端
        </n-tooltip>
        <Broadcast />
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped></style>
