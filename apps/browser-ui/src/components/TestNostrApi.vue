<script lang="ts" setup>
// import { t } from "@/i18n";
// import { ApiListType, apiNameList } from "@/nostr/nostrApi/NostrApi";
import { NCheckbox } from 'naive-ui'
import {
  WindowNostr,
  testNostrApi,
  testWindowNostr,
  ApiListType,
  apiNameList,
  NostrApi,
  CommonNostrApiImpl,
} from '@/nostr-runtime'
import { defineModel } from 'vue'
import AbsentPrompt from './AbsentPrompt.vue'
import { useAbsentPromptDialog } from '../utils/naiveUi'
const props = defineProps<{
  disabled?: boolean
  nostr?: Partial<WindowNostr> | NostrApi
}>()
const emits = defineEmits<{
  (e: 'test'): void
}>()

const isTest = ref(false)
const withNameApi = ref<ApiListType>([])
const dialog = useAbsentPromptDialog()
const message = useMessage()
async function handelTest() {
  emits('test')
  isTest.value = true
  withNameApi.value = []
  dialog({
    type: 'info',
    title: t('note'),
    name: 'test-api',
    content: t('authorized_form_test_note'),
    positiveText: t('yes'),
    onPositiveClick: () => {
      props.nostr instanceof CommonNostrApiImpl
        ? testNostrApi(withNameApi.value, props.nostr as CommonNostrApiImpl)
        : testWindowNostr(withNameApi.value, props.nostr as WindowNostr),
        message.success(t('success'))
    },
  })
}
</script>

<template>
  <n-checkbox-group v-if="isTest" :value="withNameApi">
    <n-space>
      <n-checkbox
        v-for="apiName in apiNameList"
        :value="apiName"
        :label="apiName"
      />
    </n-space>
  </n-checkbox-group>

  <n-button
    @click="handelTest"
    :disabled="disabled"
    class="w-full"
    :type="'primary'"
  >
    {{ t('test-api') }}
  </n-button>
</template>

<style scoped></style>
