import { createI18n, I18n } from "vue-i18n";
import { I18nMessages } from "./type";

export const SUPPORT_LOCALES = ["en-US", "zh-CN"] as const;
type LocaleType = (typeof SUPPORT_LOCALES)[number];

const locale = getLocale();
const i18n = setupI18n({ locale: locale as any });

export default i18n;
export const t: (typeof i18n)["global"]["t"] = ((...rest: any[]) =>
  i18n.global.t(...(rest as any as [any, any]))) as any;

(window as any).t = t;

export function setupI18n(options: { locale: LocaleType }) {
  const i18n: I18n<{ en_US: I18nMessages }, {}, {}, LocaleType, true> =
    createI18n({
      ...options,
      globalInjection: true,
      fallbackLocale: SUPPORT_LOCALES[0],
      messages: {} as any,
    });
  setI18nLanguage(i18n, options.locale as any);

  return i18n;
}

export function setI18nLanguage(
  i18n: I18n<any, any, any, any>,
  locale: LocaleType
) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector("html")?.setAttribute("lang", locale);
  loadLocaleMessages(i18n, locale);
}

export function setLang(locale: LocaleType) {
  if (SUPPORT_LOCALES.includes(locale)) {
    setI18nLanguage(i18n, locale);
    localStorage.setItem("lang", locale);
  }
}

export async function loadLocaleMessages<I extends I18n<any, any, any, any>>(
  i18n: I,
  locale: LocaleType
) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.ts`
  );

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}

export function getLocale(): LocaleType {
  let lang = localStorage.getItem("lang");
  if (lang) {
    if (SUPPORT_LOCALES.includes(lang as any)) {
      return lang as LocaleType;
    }
    localStorage.removeItem("lang");
  }
  for (const lang of [
    navigator.language ?? "",
    ...(navigator.languages ?? []),
  ]) {
    for (const SUPPORT_LOCALE of SUPPORT_LOCALES) {
      if (SUPPORT_LOCALE.includes(lang as any)) return SUPPORT_LOCALE;
    }
  }
  return SUPPORT_LOCALES[0];
}
