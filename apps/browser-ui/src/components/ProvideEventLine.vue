<script lang="ts" setup>
import { provideEventLineScoped } from './ProvideEventLine'
import ProvideActive from '../components/ProvideActive.vue'
import { defineComponent } from 'vue'

const props = defineProps<{
  active?: boolean | undefined
  name?: string
}>()

let C = defineComponent({
  setup(_props, { slots }) {
    logger.info(provideEventLineScoped(props.name))

    return slots.default
  },
})
</script>

<template>
  <ProvideActive :name="name" :active="active">
    <C>
      <slot></slot>
    </C>
  </ProvideActive>
</template>

<style scoped></style>
