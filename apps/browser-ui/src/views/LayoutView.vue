<script lang="ts" setup>
// import LayoutHeaderVue from "@/components/LayoutHeader.vue";
import Router from '@/components/Router.vue'
import { useThemeVars, NLayoutHeader, NLayout, NLayoutSider } from 'naive-ui'
import LayoutHeader from '../components/LayoutHeader.vue'
// import { ref } from "vue";
import Sidebar from '../components/Sidebar.vue'
//@LoggerScope
logger.info()

const collapsed = ref(true)
</script>
<template>
  <n-layout style="height: 100vh">
    <NLayoutHeader
      class="h-14 md:h-20 flex justify-between items-center px-3 relative"
      :style="{
        transition: 'height 0.5s',
      }"
      bordered
    >
      <LayoutHeader />
    </NLayoutHeader>
    <n-layout
      class="absolute w-full top-14 md:top-20 bottom-0"
      has-sider
      :style="{
        transition: 'top 0.5s, bottoom 0.5s',
      }"
    >
      <n-layout-sider
        class="hidden md:flex"
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
        <div></div>
        <Sidebar :collapsed="collapsed" />
      </n-layout-sider>
      <n-layout content-style="padding: 8px;">
        <div class="h-full overflow-x-hidden">
          <div></div>
          <Router></Router>
        </div>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
