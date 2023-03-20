<script lang="ts" setup>
import FaviconVue from "@/components/icon/Favicon.vue";
import UploadVue from "@/components/Upload.vue";
import { lightTheme } from "naive-ui";
import { ref } from "vue";
import { switchTheme, theme } from "../app";
import SearchFormVue from "../components/SearchForm.vue";
import Sidebar from "../components/Sidebar.vue";
import MenuVue from "./icon/Menu.vue";

const isShowdrawerMenu = ref(false);
const route = useRoute();
watch(
  () => route.path,
  () => {
    isShowdrawerMenu.value = false;
  }
);
</script>

<template>
  <span class="text-xl font-bold flex justify-center items-center">
    <n-icon size="40">
      <FaviconVue />
    </n-icon>
    <span class="ml-6 hidden md:block"> Jumpalong </span>
  </span>

  <div class="flex justify-center items-center">
    <SearchFormVue></SearchFormVue>
    <div class="ml-3">
      <UploadVue />
    </div>
    <div class="ml-3 clashidden sm:block">
      <PoolStateNumber />
    </div>

    <div class="ml-3 hidden sm:block">
      <n-button quaternary @click="switchTheme">
        {{ theme === lightTheme ? "浅色" : "深色" }}
      </n-button>
    </div>
    <div class="ml-3 md:hidden">
      <n-button
        quaternary
        @click="() => (isShowdrawerMenu = !isShowdrawerMenu)"
      >
        <n-icon size="22">
          <MenuVue />
        </n-icon>
      </n-button>
      <n-drawer v-model:show="isShowdrawerMenu" width="100%" placement="right">
        <n-drawer-content title="Menu" closable>
          <Sidebar :collapsed="false" />
          <template #footer>
            <div class="flex items-center">
              <n-button quaternary @click="switchTheme">
                {{ theme === lightTheme ? "浅色" : "深色" }}
              </n-button>
              <PoolStateNumber />
            </div>
          </template>
        </n-drawer-content>
      </n-drawer>
    </div>
  </div>
</template>

<style scoped></style>
