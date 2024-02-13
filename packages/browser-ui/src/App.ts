import { darkTheme, lightTheme } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { ref, watchEffect } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const themeList = [lightTheme, darkTheme]
export const theme = ref<BuiltInGlobalTheme>(lightTheme)

let index = useLocalStorage('theme', 0)
export function switchTheme() {
  console.log('switchTheme', index.value)
  ;(index.value as any)++
  index.value = index.value % themeList.length
}
console.log('watchEffect', watchEffect)

watchEffect(() => {
  console.log('watch', theme.value)

  theme.value = themeList[index.value]
  console.log('watch', theme.value)
})
