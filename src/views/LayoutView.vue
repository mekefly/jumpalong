<script lang="ts" setup>
import { lightTheme } from "naive-ui";
import { ref } from "vue";
import { switchTheme, theme } from "../App";
import Sidebar from "../components/Sidebar.vue";

const collapsed = ref(true);
</script>
<template>
  <n-layout style="height: 100vh">
    <n-layout-header
      style="height: 64px"
      class="flex justify-between items-center p-4 box-border"
      bordered
    >
      <span class="text-xl font-bold"> Jumpalong </span>
      <div>
        <n-input placeholder="搜索"></n-input>
      </div>
      <n-space>
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
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <RouterView />
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px" bordered>
      <span class="flex items-center justify-center h-full w-full text-xs">
        {{ "Jumpalong __VERSION__ · Made by mekefly" }}
      </span>
    </n-layout-footer>
  </n-layout>
</template>
