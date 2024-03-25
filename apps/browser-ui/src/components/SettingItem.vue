<script setup lang="ts">
import {
  NDivider,
  NInput,
  NInputNumber,
  NListItem,
  NSlider,
  NSwitch,
  NThing,
} from 'naive-ui'
import type { SettingOptions } from '../../../../libraries/nostr/src/config/DefineConfigStaff'
import DefineConfigStaff from '../../../../libraries/nostr/src/config/DefineConfigStaff'
import ArrowForwardIosRoundVue from '../components/icon/ArrowForwardIosRound.vue'
import { useConfig, useEventLine } from '../components/ProvideEventLine'
import { defineEmits } from 'vue'

const props = defineProps<{
  options: SettingOptions
}>()
const emits = defineEmits<{
  pushSetting: [path: string]
}>()
const dialog = useDialog()
const router = useRouter()
const config = useConfig()
const line = useEventLine(DefineConfigStaff)
const value = ref(
  props.options.configName && (config as any)[props.options.configName]
)
const settingValue = computed({
  get() {
    return value.value
  },
  set(v) {
    if (!props.options.configName) return
    value.value = v
    line.assignConfig({
      [props.options.configName]: v,
    })
  },
})
const displayType = computed(
  () => props.options.displayType ?? typeof settingValue.value
)
const title = computed(() =>
  t(
    props.options.i18n ||
      props.options.configName ||
      (props.options.path as any)
  )
)
function handleOpenUrl(url?: string) {
  if (!url) return
  window.open(url)
}
const description = computed(
  () => props.options.description && t(props.options.description)
)
</script>

<template>
  <n-list-item>
    <!-- 拖动条 -->
    <n-thing
      v-if="options.displayType === 'range'"
      :title="title"
      :description="description"
    >
      <template #footer>
        <n-slider
          v-model:value="settingValue"
          :min="options.range && options.range[0]"
          :max="options.range && options.range[1]"
        />
      </template>
    </n-thing>
    <NThing
      v-else-if="displayType === 'number'"
      :title="title"
      :description="description"
    >
      <template #footer>
        <n-input-number
          v-model:value="(config  as any)[options.configName ??'']"
        ></n-input-number>
      </template>
    </NThing>
    <NThing
      v-else-if="displayType === 'boolean'"
      :title="title"
      :description="description"
    >
      <template #header-extra>
        <NSwitch v-model:value="settingValue"></NSwitch>
      </template>
    </NThing>
    <NDivider
      v-else-if="displayType === 'line'"
      :title-placement="'left'"
      :title="title"
      :description="description"
    />
    <NThing v-else-if="displayType === 'string'">
      <NInput v-model:value="settingValue"></NInput>
    </NThing>

    <NThing
      v-else-if="displayType === 'text'"
      :title="title"
      @click="handleOpenUrl(options.url)"
      :description="description"
    >
      {{ options.text }}
      <template #footer v-if="options.url">
        {{ options.url }}
      </template>
      <template #header-extra v-if="options.url">
        <n-icon><ArrowForwardIosRoundVue /></n-icon>
      </template>
    </NThing>
    <NThing
      v-else-if="displayType === 'router-push'"
      :title="title"
      @click="() => options.routerPush && router.push(options.routerPush)"
      :description="description"
    >
      <template #header-extra>
        <n-icon><ArrowForwardIosRoundVue /></n-icon>
      </template>
    </NThing>
    <NThing
      v-else-if="displayType === 'dialog'"
      :title="title"
      @click="
        () => {
          dialog.create(options.dialogOptions as any)
        }
      "
      :description="description"
    >
    </NThing>
    <NThing
      v-else-if="displayType === 'setting-path'"
      :title="title"
      @click="
        () => {
          emits(
            'pushSetting',
            options.settingPath ||
              `${
                options.path?.endsWith('/') ? options.path : `${options.path}/`
              }${options.configName}`
          )
        }
      "
      :description="description"
    >
      <template #header-extra>
        <n-icon><ArrowForwardIosRoundVue /></n-icon>
      </template>
    </NThing>
  </n-list-item>
</template>
