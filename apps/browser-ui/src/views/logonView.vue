<script lang="ts" setup>
import LoginVue from '../components/Login.vue'
import LoginCardVue from '../components/LoginCard.vue'
import { useLoginStepsState } from './LoginStepsView'

const { nextStep } = useLoginStepsState()
function handleNext() {
  nextStep()
}
</script>

<template>
  <LoginCardVue>
    <template #header>
      <slot></slot>
    </template>

    <div class="mt-6">
      <LoginVue @next="handleNext">
        <template #prev-step>
          <slot name="prev-step"></slot>
        </template>
      </LoginVue>
    </div>
  </LoginCardVue>
</template>

<style scoped></style>
