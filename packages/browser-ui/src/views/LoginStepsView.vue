<script lang="ts" setup>
import LoginCompleteHook from "@/components/LoginCompleteHook.vue";
import LoginCompleteHookProvide from "@/components/LoginCompleteHookProvide.vue";
import { t } from "@/i18n";

import { useLoginStepsState } from "./LoginStepsView";
const {
  withPrevStep,
  withNestStep,
  prevStep,
  nextStep,
  current,
  name,
  numberOfSteps,
} = useLoginStepsState();
async function handelNext(next: () => any) {
  await next?.();
  await nextStep();
}
</script>

<template>
  <login-complete-hook-provide>
    <router-view v-slot="{ Component }">
      <login-complete-hook :map-key="String(current)">
        <keep-alive>
          <component :is="Component">
            <n-steps class="m-1" size="small" :current="(current as number)">
              <n-step
                v-for="(_, index) in Array.from({ length: numberOfSteps })"
                :key="index"
                :title="index === current - 1 ? t(name) : ''"
                description=""
              />
            </n-steps>
            <template #prev-step="{ disabled }">
              <n-button
                :disabled="disabled"
                v-if="withPrevStep"
                class="w-full"
                @click="prevStep"
              >
                {{ t("previous_step") }}
              </n-button>
            </template>
            <template #next-step="{ disabled, next }">
              <n-button
                :type="withNestStep ? 'primary' : 'success'"
                :disabled="disabled"
                class="w-full"
                @click="() => handelNext(next)"
              >
                {{ withNestStep ? t("next_step") : t("complete") }}
              </n-button>
            </template>
          </component>
        </keep-alive>
      </login-complete-hook>
    </router-view>
  </login-complete-hook-provide>
</template>

<style scoped></style>
