<script lang="ts" setup>
import FaviconVue from "@/components/icon/Favicon.vue";
import UploadVue from "@/components/Upload.vue";
import { ref } from "vue";
import SearchFormVue from "../components/SearchForm.vue";
import Sidebar from "../components/Sidebar.vue";
import I18nSwitchButtonVue from "./I18nSwitchButton.vue";
import MenuVue from "./icon/Menu.vue";
import LoadProgressVue from "./LoadProgress.vue";
import PoolStateNumberVue from "./PoolStateNumber.vue";
import ReloadButton from "./ReloadButton.vue";
import ThemeButtonVue from "./ThemeButton.vue";

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
  <span
    class="text-xl font-bold flex justify-center items-center"
    @click="() => $router.push('/')"
  >
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

    <LoadProgressVue class="ml-3" />
    <div class="ml-3 hidden sm:block">
      <ThemeButtonVue></ThemeButtonVue>
    </div>

    <div class="ml-3 hidden sm:block">
      <I18nSwitchButtonVue />
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
              <ReloadButton />
              <I18nSwitchButtonVue />
              <ThemeButtonVue></ThemeButtonVue>
              <PoolStateNumberVue />
            </div>
          </template>
        </n-drawer-content>
      </n-drawer>
    </div>
  </div>
</template>

<style scoped></style>
