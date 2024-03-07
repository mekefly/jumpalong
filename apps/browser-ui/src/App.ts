import { darkTheme, lightTheme } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { ref, watchEffect } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const themeList = [lightTheme, darkTheme]
export const theme = ref<BuiltInGlobalTheme>(lightTheme)

let index = useLocalStorage('theme', 0)
export function switchTheme() {
  ;(index.value as any)++
  index.value = index.value % themeList.length
}

watchEffect(() => {
  theme.value = themeList[index.value]
})
