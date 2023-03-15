import { NIcon, useMessage } from "naive-ui";
import { Component, h } from "vue";
import { clipboardText } from "./utils";

export function useClipboard() {
  const message = useMessage();
  return function clipboard(msg: string) {
    try {
      if (!msg) {
        message.error("复制失败");
      }
      clipboardText(msg);
      message.success("已复制到剪切板!");
    } catch (error) {
      message.error("复制失败");
    }
  };
}
export const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
export const renderWithClick = (str: string, click: () => void) => {
  return () => h("span", { onClick: click }, { default: () => str });
};
