import { darkTheme, GlobalTheme, lightTheme } from "naive-ui";
import { ref } from "vue";

const themeList = [lightTheme, darkTheme];
export const theme = ref<GlobalTheme | null>(lightTheme);

let index = 0;
export function switchTheme() {
  index++;
  index = index % themeList.length;

  theme.value = themeList[index];
}
