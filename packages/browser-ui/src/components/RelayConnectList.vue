<script lang="ts" setup>
import RelayUrlShowVue from './RelayUrlShow.vue'

const props = defineProps<{
  urls: Iterable<string>
  title?: string
  loadable?: boolean
}>()
const { urls, loadable } = toRefs(props)

const isEmpty = computed(
  () => props.urls[Symbol.iterator]().next().done === true
)
</script>

<template>
  <n-list class="w-full transparent">
    <div
      class="w-full h-28 flex justify-center items-center"
      v-if="props.loadable && isEmpty"
    >
      <n-spin size="large" />
    </div>

    <n-empty v-else-if="isEmpty" size="large" :description="t('empty_text')" />

    <n-list-item class="flex" v-for="url in props.urls" :key="url">
      <RelayUrlShowVue :url="url"> </RelayUrlShowVue>
      <template #suffix>
        <div class="flex items-center flex-shrink-0 w-max">
          <slot name="right" :url="url"></slot>
        </div>
      </template>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
