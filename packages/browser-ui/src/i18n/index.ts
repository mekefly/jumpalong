import { setAdds } from "@/utils/utils";
import { createI18n, I18n } from "vue-i18n";
import { I18nLocalConfig } from "./type";

const defaultLocale = "en-US";
export const supportLocales = new Set([defaultLocale, "zh-CN"]);
type LocaleType = string;

const localConfig = useLocalStorage<Record<string, I18nLocalConfig>>(
  "__localConfigs",
  () => {
    return {};
  }
);

const locale = getLocale();
const i18n = setupI18n({ locale: locale });

export default i18n;
export const t: (typeof i18n)["global"]["t"] = ((...rest: any[]) =>
  i18n.global.t(...(rest as any as [any, any]))) as any;

(window as any).t = t;

export function setupI18n(options: { locale: LocaleType }) {
  const i18n: I18n<
    { en_US: I18nLocalConfig["message"] },
    {},
    {},
    LocaleType,
    true
  > = createI18n({
    ...options,

    globalInjection: true,
    fallbackLocale: defaultLocale,
    messages: {} as any,
  });
  setI18nLanguage(i18n, options.locale as any);

  return i18n;
}
export function getSupportLocales() {
  setAdds(supportLocales, Object.keys(localConfig.value));

  return supportLocales;
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
  if (!hasSupportLocales(locale)) {
    logger.warn(`Not found lang:${locale}`);
    return;
  }
  setI18nLanguage(i18n, locale);
  localStorage.setItem("lang", locale);
}

export async function loadLocaleMessages<I extends I18n<any, any, any, any>>(
  i18n: I,
  locale: LocaleType
) {
  // load locale messages with dynamic import
  const localeConfigModule = await getLocalConfig(locale);

  if (!localeConfigModule) {
    return Promise.reject("Not Floud");
  }

  // set locale and locale
  setLocalConfig(i18n, localeConfigModule);

  return nextTick();
}
export async function getLocalConfig(name: string) {
  return getLocalStorageConfig(name) ?? (await importConfig(name));
}
export async function importConfig(locale: string) {
  try {
    const v = (
      (await import(
        /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.ts`
      )) as { default: I18nLocalConfig }
    ).default;
    return v;
  } catch (error) {
    return undefined;
  }
}
export function getLocalStorageConfig(
  name: string
): I18nLocalConfig | undefined {
  return localConfig.value[name];
}
export async function setLocalStorageConfig(localeConfig: I18nLocalConfig) {
  const name = localeConfig.name;
  if (!name) {
    return;
  }
  localConfig.value[name] = localeConfig;
}
export async function deleteLocalStorageConfig(name: string) {
  delete localConfig.value[name];
}

export async function setLocalConfig<I extends I18n<any, any, any, any>>(
  i18n: I,
  i18nLocalConfig: I18nLocalConfig
) {
  const locale = i18nLocalConfig.name;
  if (!locale) {
    return;
  }
  supportLocales.add(locale);

  i18nLocalConfig.message &&
    i18n.global.setLocaleMessage(locale, i18nLocalConfig.message);
  i18nLocalConfig.datetimeFormat &&
    i18n.global.setDateTimeFormat(locale, i18nLocalConfig.datetimeFormat);
  i18nLocalConfig.numberFormat &&
    i18n.global.setNumberFormat(locale, i18nLocalConfig.numberFormat);
}

export function getLocale(): LocaleType {
  let lang = localStorage.getItem("lang");
  if (lang) {
    if (hasSupportLocales(lang)) {
      return lang as LocaleType;
    }
    localStorage.removeItem("lang");
  }
  for (const lang of [
    navigator.language ?? "",
    ...(navigator.languages ?? []),
  ]) {
    for (const SUPPORT_LOCALE of supportLocales) {
      if (SUPPORT_LOCALE.includes(lang as any)) return SUPPORT_LOCALE;
    }
  }
  return defaultLocale;
}

function hasSupportLocales(locale: string) {
  return supportLocales.has(locale);
}
