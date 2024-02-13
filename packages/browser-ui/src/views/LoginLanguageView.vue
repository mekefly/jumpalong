<script lang="ts" setup>
import I18nSwitchButtonVue from '../components/I18nSwitchButton.vue'
import LoginCardVue from '../components/LoginCard.vue'
import ThemeButtonVue from '../components/ThemeButton.vue'
</script>

<template>
  <LoginCardVue>
    <template #header>
      <slot></slot>
    </template>

    <n-space vertical class="mt-6">
      <div class="w-full flex justify-center">
        <ThemeButtonVue />
      </div>
      <div class="w-full flex justify-center">
        <I18nSwitchButtonVue class="w-full" />
      </div>
      <slot name="prev-step"></slot>
      <slot name="next-step"></slot>
    </n-space>
  </LoginCardVue>
</template>

<style scoped></style>
