<script lang="ts" setup>
import CollectProvide from "@/components/CollectProvide.vue";
import DrawerProvide from "@/components/DrawerProvide.vue";
import LoadProgressProvideVue from "@/components/LoadProgressProvide.vue";
import NostrConnect from "@/components/NostrConnect.vue";
import NostrContainerProvade from "@/components/NostrContainerProvade.vue";
import UploadProvideVue from "@/components/UploadProvide.vue";
import ZapsPrivider from "./ZapsPrivider.vue";
</script>

<template>
  <NostrContainerProvade>
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
                        <ZapsPrivider>
                          <slot></slot>
                        </ZapsPrivider>
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
  </NostrContainerProvade>
</template>

<style scoped></style>
