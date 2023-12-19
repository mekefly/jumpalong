import { darkTheme, lightTheme } from "naive-ui";
import { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";
import { ref } from "vue";

const themeList = [lightTheme, darkTheme];
export const theme = ref<BuiltInGlobalTheme | null>(lightTheme);

let index = useLocalStorage("theme", 0);
export function switchTheme() {
  (index.value as any)++;
  index.value = index.value % themeList.length;
}
watch(
  index,
  () => {
    theme.value = themeList[index.value];
  },
  {
    immediate: true,
  }
);
