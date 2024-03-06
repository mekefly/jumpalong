<script lang="ts" setup>
import i18n, {
  getSupportLocales,
  setLang,
  t,
  loadLocaleMessages,
} from '../i18n'
import { useAsyncComputed, useAsyncData } from '../utils/use'

const languageOptions = useAsyncData(() => {
  return Promise.all(
    Array.from(getSupportLocales(), async locale => {
      await loadLocaleMessages(i18n, locale)

      return {
        label: i18n.global.tc('local-name', locale) ?? t(locale),
        key: locale,
      }
    })
  )
})

function handleLanguageSelect(key: string) {
  setLang(key as any)
}
const locale = computed(() => i18n.global.locale)
</script>

<template>
  <n-dropdown
    trigger="hover"
    :options="languageOptions"
    @select="handleLanguageSelect"
  >
    <n-button quaternary>{{
      i18n.global.tc('local-name', locale) ?? t(locale)
    }}</n-button>
  </n-dropdown>
</template>

<style scoped></style>
