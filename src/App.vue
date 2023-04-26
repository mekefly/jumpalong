<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import { theme } from "./app";
import CollectProvide from "./components/CollectProvide.vue";
import LoadProgressProvideVue from "./components/LoadProgressProvide.vue";
import NostrConnect from "./components/NostrConnect.vue";
import UploadProvideVue from "./components/UploadProvide.vue";
import Main from "./Main.vue";

const logger = loggerScope;
logger.info();
</script>

<template>
  <n-config-provider :theme="theme">
    <div
      class="body"
      :style="{
        backgroundColor: theme?.common.bodyColor,
      }"
    >
      <div class="container">
        <DrawerProvide #default="{ id }">
          <div :id="id" class="w-full h-screen overflow-hidden">
            <n-dialog-provider>
              <n-message-provider>
                <n-notification-provider :placement="'bottom'">
                  <n-loading-bar-provider>
                    <LoadProgressProvideVue>
                      <UploadProvideVue>
                        <NostrConnect>
                          <CollectProvide>
                            <Main></Main>
                          </CollectProvide>
                        </NostrConnect>
                      </UploadProvideVue>
                    </LoadProgressProvideVue>
                  </n-loading-bar-provider>
                </n-notification-provider>
              </n-message-provider>
            </n-dialog-provider>
          </div>
        </DrawerProvide>
      </div>
    </div>
  </n-config-provider>
</template>

<style scoped>
.body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
}
.container {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0rem;
  overflow: hidden;
  position: relative;
}
</style>
