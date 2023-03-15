import { darkTheme, lightTheme } from "naive-ui";
import { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";
import { ref } from "vue";

const themeList = [lightTheme, darkTheme];
export const theme = ref<BuiltInGlobalTheme | null>(lightTheme);

let index = 0;
export function switchTheme() {
  index++;
  index = index % themeList.length;

  theme.value = themeList[index];
}
