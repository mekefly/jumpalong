<script lang="ts" setup>
import FaviconVue from "@/components/icon/Favicon.vue";
import { relayPool } from "@/nostr/nostr";
import { createDynamicColor } from "@/utils/utils";
import { lightTheme } from "naive-ui";
import { ref } from "vue";
import { switchTheme, theme } from "../app";
import SearchFormVue from "../components/SearchForm.vue";
import Sidebar from "../components/Sidebar.vue";

const collapsed = ref(true);
const poolSize = computed(() => relayPool.getPool().size);
const subIdSize = computed(() => relayPool.allSubIds.size);
</script>
<template>
  <n-layout style="height: 100vh">
    <n-layout-header
      style="height: 64px"
      class="flex justify-between items-center p-4 box-border"
      bordered
    >
      <span class="text-xl font-bold flex justify-center items-center">
        <n-icon class="ml-1">
          <FaviconVue />
        </n-icon>
        <span class="ml-6"> Jumpalong </span>
      </span>
      <SearchFormVue></SearchFormVue>
      <n-space class="flex justify-center items-center">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span
              :style="{
                color: createDynamicColor(subIdSize, 20, 400),
              }"
            >
              {{ subIdSize }}
            </span>
          </template>
          当前订阅数，包括临时订阅
        </n-tooltip>
        |
        <n-tooltip trigger="hover">
          <template #trigger>
            <span
              :style="{
                color: createDynamicColor(poolSize, 5, 30),
              }"
            >
              {{ poolSize }}
            </span>
          </template>
          当前与中续的连接数量
        </n-tooltip>

        <n-button quaternary @click="switchTheme">
          {{ theme === lightTheme ? "浅色" : "深色" }}
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
      <n-layout-sider
        :native-scrollbar="false"
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <Sidebar :collapsed="collapsed" />
      </n-layout-sider>
      <n-layout content-style="padding: 24px;">
        <div class="h-[100%]">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px" bordered>
      <span class="flex items-center justify-center h-full w-full text-xs">
        {{ "Jumpalong __VERSION__ · Made by mekefly" }}
      </span>
    </n-layout-footer>
  </n-layout>
</template>
