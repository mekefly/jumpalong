<script lang="ts" setup>
import contactConfiguration from "@/api/Contact";
import { NIcon, NSpace } from "naive-ui";
import { relayConfigurator } from "../nostr/nostr";
import { userKey } from "../nostr/user";
import ButtonCloseVue from "./ButtonClose.vue";
import EllipsisVue from "./Ellipsis.vue";
import RelayUrlShowVue from "./RelayUrlShow.vue";

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
const value = ref("");
function addRelay() {
  relayConfigurator.addWriteRead(value.value);
}

const message = useMessage();
function handleSave() {
  relayConfigurator.save();
  message.success(
    "你的中继信息已保存到本地，正在准备上传，您可以继续您的其他操作"
  );

  if (localStorage.getItem("newUserFlag") === userKey.value.privateKey) {
    localStorage.removeItem("newUserFlag");
    //自动关注开发者
    contactConfiguration.follow(
      "ddc9d594c9eb02353915ef41fa51065d7a83d7fdd45be63aee72c9c9ba1127e6"
    );
    //关注群聊
    contactConfiguration.joinChannel(
      "25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb"
    );
  }
}
</script>

<template>
  <n-card title="中继配置">
    <n-space vertical>
      <n-table striped>
        <tbody>
          <tr class="flex" v-for="url in urls" :key="url">
            <td class="flex-grow">
              <RelayUrlShowVue :url="url">
                <EllipsisVue>{{ url }}</EllipsisVue>
              </RelayUrlShowVue>
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
        <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
        <n-button @click="addRelay" type="primary"> 添加 </n-button>
      </n-space>
      <n-space>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button @click="handleSave" type="primary"> 保存 </n-button>
          </template>
          会发布到云端
        </n-tooltip>
        <Broadcast />
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped></style>
