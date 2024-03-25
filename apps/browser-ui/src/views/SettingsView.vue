<script lang="ts" setup>
import { NList, NPageHeader, NSpace } from 'naive-ui'
import ArrowForwardIosRoundVue from '../components/icon/ArrowForwardIosRound.vue'
import { useConfig, useEventLine } from '../components/ProvideEventLine'
import {
  PapawTreeLazyModeStaff,
  PingConfigStaff,
  TreeConfigStaff,
} from '../nostr-runtime'
import { clearCache, intelligentCleaning } from '../utils/cache/index'
import SettingItem from '../components/SettingItem.vue'

const line = useEventLine()
const route = useRoute()
const router = useRouter()
const hashPath = computed(() => route.params.path as string[] | undefined)

//引入config，否则可能配置文件可能没加载进来
useConfig(PingConfigStaff, PapawTreeLazyModeStaff, TreeConfigStaff)

const setting = line.setting
const currentPath = computed({
  get() {
    return typeof hashPath.value === 'string'
      ? hashPath.value
      : hashPath.value?.join() ?? '/'
  },
  set(value) {
    router.push('/settings' + (value.startsWith('/') ? value : `/${value}`))
  },
})
const settingOptions = computed(() => setting.getValue(currentPath.value))
const optionsSetPath = computed(
  () =>
    new Set(
      settingOptions.value
        .filter(item => item.displayType === 'setting-path')
        .map(
          options =>
            options.settingPath ||
            `${
              options.path?.endsWith('/') ? options.path : `${options.path}/`
            }${options.configName}`
        )
    )
)

const childrenPaths = computed(() =>
  setting.getChildrenPathName(currentPath.value).filter(path => {
    return !optionsSetPath.value.has(
      `${
        currentPath.value.endsWith('/')
          ? currentPath.value
          : `${currentPath.value}/`
      }${path}`
    )
  })
)

line.defineSetting('clear_local_storage', {
  path: 'storage',
  displayType: 'dialog',
  dialogOptions: {
    type: 'warning',
    title: t('warning'),
    content: t('clear_local_storage_warning'),
    positiveText: t('yes'),
    negativeText: t('no'),
    onPositiveClick: () => {
      localStorage.clear()
      location.reload()
    },
    onNegativeClick: () => {},
  },
})
line.defineSetting('IntelligentCleaning', {
  path: 'storage',
  displayType: 'dialog',
  i18n: 'clear_expired_cache',
  dialogOptions: {
    type: 'info',
    title: t('info'),
    content: t('are_you_sure'),
    positiveText: t('yes'),
    negativeText: t('no'),
    onPositiveClick: () => {
      intelligentCleaning()
      location.reload()
    },
  },
})
line.defineSetting('clear-cache', {
  path: 'storage',
  displayType: 'dialog',
  i18n: 'clear_all_caches',
  dialogOptions: {
    type: 'info',
    title: t('info'),
    content: t('are_you_sure'),
    positiveText: t('yes'),
    negativeText: t('no'),
    onPositiveClick: () => {
      clearCache()
      location.reload()
    },
    onNegativeClick: () => {},
  },
})
line.defineSetting('i18n-setting', {
  path: '/advanced',
  i18n: 'i18n-setting',
  displayType: 'router-push',
  routerPush: { name: 'language-settings' },
})
line.defineSetting('move-house', {
  path: '/advanced',
  i18n: 'move-house',
  displayType: 'router-push',
  description: t('move-house-description'),
  routerPush: { name: 'move-house' },
})
line.defineSetting('about', {
  path: '/',
  i18n: 'about',
  displayType: 'setting-path',
})
line.defineSetting('author', {
  path: '/about',
  i18n: 'author',
  displayType: 'text',
  text: 'Mekefly',
  url: 'https://github.com/Mekefly',
})
line.defineSetting('source-code', {
  path: '/about',
  i18n: 'source-code',
  displayType: 'text',
  url: 'https://github.com/mekefly/jumpalong',
})
line.defineSetting('hide-rules', {
  path: '/general',
  i18n: 'hide_rules',
  displayType: 'router-push',
  routerPush: { name: 'content-blacklist-view' },
})
line.defineSetting('mute-user', {
  path: '/general',
  i18n: 'mute_user',
  displayType: 'router-push',
  routerPush: { name: 'mute-user' },
})
line.defineSetting('nostr-connect-setting', {
  path: '/general',
  i18n: 'nostr_connect',
  displayType: 'router-push',
  routerPush: { name: 'nostr-connect-setting' },
})
function handleBack() {
  let l = line.setting.getParentPath(currentPath.value)
  if (!l) {
    router.back()
    return
  }
  currentPath.value = l
}
const settingsTitle = computed(() => {
  let path = currentPath.value
    .split('/')
    .map(item => t(item))
    .join('/')
  if (!path) return t('settings')
  return path
})
const Json = JSON
</script>

<template>
  <NSpace :size="'large'" vertical>
    <n-page-header :subtitle="settingsTitle" @back="handleBack"></n-page-header>
    <n-list clickable hoverable>
      <n-list-item
        v-for="path in childrenPaths"
        :key="path"
        @click="
          () => {
            currentPath = currentPath + path
          }
        "
      >
        <n-thing :title="t(path)"> </n-thing>
        <template #suffix>
          <n-icon><ArrowForwardIosRoundVue /></n-icon>
        </template>
      </n-list-item>
      <SettingItem
        v-for="options in settingOptions"
        :options="options"
        :key="Json.stringify(options)"
        @push-setting="currentPath = $event"
      />
    </n-list>
  </NSpace>
</template>

<style scoped></style>
