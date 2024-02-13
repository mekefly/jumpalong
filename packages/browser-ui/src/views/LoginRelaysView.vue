<script lang="ts" setup>
import RelayConfigVue from '@/components/RelayConfig.vue'
import ScrollbarVue from '@/components/Scrollbar.vue'
import TooltipVue from '@/components/Tooltip.vue'
import { useEventLine } from '../components/ProvideEventLine'
import {
  LoginStaff,
  RelayConfiguratorSynchronizerStaff,
} from '@jumpalong/nostr-runtime'

console.log('event-line', inject(Symbol.for('event-line')))

let nostrApiLine = useEventLine(LoginStaff)
let relayConfiguratorLine = useEventLine(RelayConfiguratorSynchronizerStaff)
let relayConfigurator = relayConfiguratorLine.relayConfigurator

const isNewUser = ref(nostrApiLine.testAndVerifyNewUser())
const isNewUserChangeRelayConfig = computed(
  () => isNewUser.value && relayConfigurator.hasChange()
)
const numberOfrelayConfigurator = computed(
  () => Object.keys(relayConfigurator.getConfiguration()).length
)

const nextTips = computed(() => {
  if (numberOfrelayConfigurator.value === 0) {
    return t('please_configure_relay')
  } else if (isNewUserChangeRelayConfig.value) {
    return t('please_save_the_configuration')
  } else {
    return t('next_step_tip')
  }
})

function handelReload() {
  location.reload()
}
</script>

<template>
  <ScrollbarVue class="p-4 box-border w-full h-full">
    <slot></slot>
    <n-space vertical class="mt-6">
      <slot name="prev-step"></slot>
      <TooltipVue :tooltip="nextTips">
        <slot
          name="next-step"
          :disabled="
            isNewUserChangeRelayConfig || numberOfrelayConfigurator === 0
          "
        ></slot>
      </TooltipVue>

      <n-alert class="mt-4" :title="t('welcome')" type="info" closable>
        {{ t('login_welcome') }}
      </n-alert>

      <n-alert
        v-if="!isNewUser"
        :title="t('configuring_relay_prompts')"
        type="warning"
        closable
      >
        {{ t('configuring_relay_prompts_text') }}
      </n-alert>
      <n-alert
        v-if="!isNewUser"
        :title="t('synchronization_guide')"
        type="info"
        closable
      >
        <div v-for="text in t('synchronization_guide_text').split('\n')">
          {{ text }}
        </div>
      </n-alert>

      <n-alert v-if="!isNewUser" :title="t('note')" type="info" closable>
        {{ t('discard_changes0') }}
        <n-button text @click="handelReload">
          {{ t('discard_changes1') }}
        </n-button>
        {{ t('discard_changes2') }}
      </n-alert>

      <n-alert v-if="!isNewUser" :title="t('note')" type="info" closable>
        {{ t('sync_note') }}
      </n-alert>

      <n-alert
        v-if="isNewUser"
        :title="t('configuring_a_simple_tutorial')"
        type="info"
        closable
      >
        <div
          v-for="text in t('configuring_a_simple_tutorial_text').split('\n')"
        >
          {{ text }}
        </div>
      </n-alert>

      <n-alert
        v-if="isNewUser"
        :title="t('detailed_tutorials')"
        type="info"
        closable
      >
        <p
          v-text="t('detailed_tutorials_text')"
          :style="{ whiteSpace: 'pre-line' }"
        ></p>
      </n-alert>

      <n-alert
        v-if="isNewUser"
        :title="t('what_is_nostr')"
        type="info"
        closable
      >
        {{ t('what_is_nostr_text') }}
      </n-alert>
      <RelayConfigVue class="h-full mt-4" />
    </n-space>
  </ScrollbarVue>
</template>

<style scoped></style>
