import { t } from "@/i18n";
import { NIcon, NInput, useMessage } from "naive-ui";
import { Component, h } from "vue";
import { clipboardText } from "./utils";

export function useClipboardDialog() {
  const message = useMessage();
  const dialog = useDialog();
  return function clipboard(msg: string) {
    let type: "success" | "error" = "success";
    try {
      if (!msg) {
        message.error(t("empty_text"));
        return;
      }
      clipboardText(msg);
      type = "success";
    } catch (error) {
      type = "error";
    }
    dialog[type]({
      title: t(type),
      content: () => h(NInput, { value: msg, type: "textarea" }),
      positiveText: t("yes"),
      negativeText: t("no"),
      onPositiveClick: () => {},
      onNegativeClick: () => {},
    });
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
