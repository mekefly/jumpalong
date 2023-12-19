import {
  type DefaultDateTimeFormatSchema,
  type DefaultLocaleMessageSchema,
  type DefaultNumberFormatSchema,
} from "vue-i18n";
export default function createI18nConfig<
  C extends {
    name: string;
    author: string;
    version: string;
    numberFormat: DefaultNumberFormatSchema;
    datetimeFormat: DefaultDateTimeFormatSchema;
    message: DefaultLocaleMessageSchema;
  }
>(config: C): C {
  return config;
}
