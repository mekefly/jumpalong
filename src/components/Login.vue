<script lang="ts" setup>
import { t } from "@/i18n";
import LoginFormVue from "./LoginForm.vue";
import RegistrationFormVue from "./RegistrationForm.vue";

const emit = defineEmits<{
  (e: "next"): void;
}>();
</script>

<template>
  <div class="px-2 box-border">
    <n-tabs
      default-value="signin"
      size="large"
      animated
      style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin" :tab="t('login')">
        <LoginFormVue @next="() => emit('next')">
          <template #prev-step>
            <slot name="prev-step"></slot>
          </template>
        </LoginFormVue>
      </n-tab-pane>
      <n-tab-pane name="signup" :tab="t('logon')">
        <RegistrationFormVue @next="() => emit('next')">
          <template #prev-step>
            <slot name="prev-step"></slot>
          </template>
        </RegistrationFormVue>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped></style>
