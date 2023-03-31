<script lang="ts" setup>
import LayoutHeaderVue from "@/components/LayoutHeader.vue";
import { useThemeVars } from "naive-ui";
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";

const collapsed = ref(true);
const themeVars = useThemeVars();
</script>
<template>
  <n-layout style="height: 100vh">
    <n-layout-header
      class="h-14 md:h-20 flex justify-between items-center px-3 relative"
      :style="{
        transition: 'height 0.5s',
      }"
      bordered
    >
      <LayoutHeaderVue />
    </n-layout-header>
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
        <Sidebar :collapsed="collapsed" />
      </n-layout-sider>
      <n-layout content-style="padding: 8px;">
        <div class="h-full overflow-x-hidden">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
