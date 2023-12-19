<script lang="ts" setup>
import { t } from "@/i18n";
import { lightTheme } from "naive-ui";
import { switchTheme, theme } from "../app";

const nextThemeColor = computed(() =>
  theme.value?.name === lightTheme?.name ? t("dark") : t("bright")
);
</script>

<template>
  <n-button quaternary @click="switchTheme">
    {{ nextThemeColor }}
  </n-button>
</template>

<style scoped></style>
