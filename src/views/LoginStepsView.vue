<script lang="ts" setup>
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
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component">
        <n-steps size="small" :current="(current as number)">
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
        <template #next-step="{ disabled }">
          <n-button
            :type="withNestStep ? 'primary' : 'success'"
            :disabled="disabled"
            class="w-full"
            @click="nextStep"
          >
            {{ withNestStep ? t("next_step") : t("complete") }}
          </n-button>
        </template>
      </component>
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
