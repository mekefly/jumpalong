<script lang="ts" setup>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";

const collapsed = ref(true);
</script>
<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
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
      <n-layout class="h-screen p-4 box-border">
        <RouterView />
      </n-layout>
    </n-layout>
  </n-space>
</template>
