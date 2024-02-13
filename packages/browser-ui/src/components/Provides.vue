<script lang="ts" setup>
import {
  NButton,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  NLoadingBarProvider,
} from 'naive-ui'
import ProvideEventLine from './ProvideEventLine.vue'
let id = ''
</script>

<template>
  <!-- <NostrContainerProvade> -->
  <!-- <DrawerProvide #default="{ id }"> -->
  <div :id="id" class="w-full h-screen overflow-hidden">
    <ProvideEventLine name="root" :active="true">
      <n-dialog-provider>
        <n-message-provider>
          <n-notification-provider :placement="'bottom'">
            <n-loading-bar-provider>
              <slot></slot>
              <!-- <LoadProgressProvideVue>
              <UploadProvideVue>
                <NostrConnect>
                  <CollectProvide>
                    <ZapsPrivider>
                    </ZapsPrivider>
                  </CollectProvide>
                </NostrConnect>
              </UploadProvideVue>
            </LoadProgressProvideVue> -->
            </n-loading-bar-provider>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </ProvideEventLine>
  </div>
  <!-- </DrawerProvide> -->
  <!-- </NostrContainerProvade> -->
</template>

<style scoped></style>
