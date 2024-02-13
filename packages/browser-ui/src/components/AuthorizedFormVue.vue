<script lang="ts" setup>
import { LoginStaff, WindowNostr } from '@jumpalong/nostr-runtime'
import AiddrLink from './NaddrLink.vue'
import { useEventLine } from './ProvideEventLine'
import TestNostrApi from './TestNostrApi.vue'
let line = useEventLine(LoginStaff)

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'beforeNext'): void
}>()

const isFloudNostr = computed(() => {
  return Boolean((window as any).nostr)
})

const recommendedList = ref([
  ['horse', 'https://github.com/fiatjaf/horse'],
  ['nos2x', 'https://github.com/fiatjaf/nos2x'],
  ['Alby', 'https://getalby.com/'],
  ['Blockcore', 'https://www.blockcore.net/wallet'],
  ['nos2x-fox', 'https://diegogurpegui.com/nos2x-fox/'],
  ['Flamingo', 'https://www.getflamingo.org/'],
])

function handleNext() {
  emit('beforeNext')
  line.windowNostrLogin()
  emit('next')
}

function open(url: string) {
  window.open(url)
}
const nostr = ref((window as any).nostr as Partial<WindowNostr>)
</script>

<template>
  <n-space class="flex flex-col" vertical>
    <n-alert
      v-if="!isFloudNostr"
      class="mt-2"
      :title="t('note')"
      type="warning"
    >
      <p>
        {{ t('authorized_form_not_floud_nostr_tip') }}
      </p>

      <n-space>
        <n-button
          text
          v-for="[name, url] in recommendedList"
          @click="open(url)"
        >
          {{ name }}
        </n-button>
      </n-space>
    </n-alert>

    <n-alert class="mt-2" :title="t('note')" type="info">
      <AiddrLink :addr="t('help_article')">
        {{ t('help') }}
      </AiddrLink>
    </n-alert>
    <TestNostrApi :nostr="nostr" :disabled="!isFloudNostr"></TestNostrApi>

    <slot name="prev-step"></slot>

    <n-button
      @click="handleNext"
      :disabled="!isFloudNostr"
      class="w-full"
      :type="'primary'"
    >
      {{ t('next_step') }}
    </n-button>
  </n-space>
</template>

<style scoped></style>
