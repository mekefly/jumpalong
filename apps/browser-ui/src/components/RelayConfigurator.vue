<script lang="ts" setup>
import { NIcon, NSpace } from 'naive-ui'
import BroadcastVue from './Broadcast.vue'
import ButtonCloseVue from './ButtonClose.vue'
import DateTimeVue from './DateTime.vue'
import RelayConnectListVue from './RelayConnectListCard.vue'
import RelayReadableButtonVue from './RelayReadableButton.vue'
import RelayWritableButtonVue from './RelayWritableButton.vue'
import TooltipVue from './Tooltip.vue'
import { useEventLine } from './ProvideEventLine'
import { RelayConfiguratorSynchronizer } from '@/nostr-runtime'
import EditCalendarRound from './icon/EditCalendarRound.vue'

let line = useEventLine(RelayConfiguratorSynchronizer.Staff)
let relayConfigurator = line.relayConfigurator

const urls = computed(
  () =>
    new Set([
      ...relayConfigurator.getConfiguration().read,
      ...relayConfigurator.getConfiguration().write,
    ])
)

function switchWrite(url: string) {
  relayConfigurator.hasWriteByUrl(url)
    ? relayConfigurator.remoteWrite(url)
    : relayConfigurator.addWrite(url)
}
function switchRead(url: string) {
  relayConfigurator.hasReadByUrl(url)
    ? relayConfigurator.remoteRead(url)
    : relayConfigurator.addRead(url)
}
const value = ref('')
function addRelay() {
  if (!value.value) {
    return
  }
  relayConfigurator.addWriteRead(value.value)
}

const message = useMessage()
function handleSave() {
  relayConfigurator.replaceableSynchronizer.save()
  message.success(t('relay_configurator_save_message'))
}
function handleSync() {
  relayConfigurator.replaceableSynchronizer.synchronizer.sync()

  message.success(t('relay_configurator_sync_message'))
}
const updateTime = computed(() => {
  const updateAt = relayConfigurator.getUpdateAt()
  if (!updateAt) return null
  return updateAt
})
function handelRefresh() {
  relayConfigurator.refresh()
}
</script>

<template>
  <RelayConnectListVue :urls="urls" :title="t('relay_configuration')">
    <template #header-extra>
      <n-icon class="mr-2" @click="handelRefresh">
        <ReloadCircleSharp />
      </n-icon>
      <n-icon class="mr-1"><EditCalendarRound /></n-icon>
      <DateTimeVue v-if="updateTime" :secondTimestamp="updateTime" />
      <span v-else>No</span>
    </template>
    <template #right="{ url }">
      <RelayWritableButtonVue
        :active="relayConfigurator.hasWriteByUrl(url)"
        class="mr-1"
        @switch="() => switchWrite(url)"
      />
      <RelayReadableButtonVue
        :active="relayConfigurator.hasReadByUrl(url)"
        class="mr-2"
        @switch="() => switchRead(url)"
      />
      <ButtonCloseVue text @click="() => relayConfigurator.remove(url)" />
    </template>
    <template #action>
      <!-- <n-checkbox v-model:checked="value"> 复选框 </n-checkbox> -->
      <n-space>
        <n-input
          v-model:value="value"
          type="text"
          placeholder="eg: wss://nostr.wine"
        />
        <n-button @click="addRelay" type="primary" :disabled="!value">
          {{ t('add') }}
        </n-button>
        <TooltipVue
          :tooltip="
            !relayConfigurator.replaceableSynchronizer.hasChange()
              ? t('currently_not_modified')
              : t('tips.save_changes')
          "
        >
          <n-button
            @click="handleSave"
            type="primary"
            :disabled="!relayConfigurator.replaceableSynchronizer.hasChange()"
          >
            {{ t('save') }}
          </n-button>
        </TooltipVue>

        <TooltipVue
          :tooltip="
            relayConfigurator.replaceableSynchronizer.hasChange()
              ? t('relay_configurator_sync_has_change_tip')
              : t('relay_configurator_sync_no_change_tip')
          "
        >
          <n-button
            @click="handleSync"
            type="primary"
            :disabled="relayConfigurator.replaceableSynchronizer.hasChange()"
          >
            {{ t('sync') }}
          </n-button>
        </TooltipVue>
        <BroadcastVue />
      </n-space>
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
