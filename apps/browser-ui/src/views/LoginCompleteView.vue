<script lang="ts" setup>
import { LoginUtilsStaff, NostrApiStaff } from '@jumpalong/nostr-runtime'
import FloatingCardVue from '../components/LoginCard.vue'
import {
  useLoginCompleteHook,
  useLoginCompleteHooks,
} from '../components/LoginCompleteHook'
import { useEventLine } from '../components/ProvideEventLine'
import TestNostrApi from '../components/TestNostrApi.vue'
import TooltipVue from '../components/Tooltip.vue'
import Copy16FilledVue from '../components/icon/Copy16Filled.vue'
// import { nostrApi } from "@/nostr/nostr";
// import { usePrikey } from "@/utils/nostrApiUse";
import { useClipboardDialog } from '../utils/naiveUi'
import { useAsyncComputed } from '../utils/use'

let line = useEventLine(NostrApiStaff, LoginUtilsStaff)

const clipboard = useClipboardDialog()

const prikey = useAsyncComputed(async () =>
  (await line.getPrikeyOrNull())?.getNsec()
)

function handleClipboard() {
  if (!prikey.value) return
  clipboard(prikey.value)
}
const value = ref()

const router = useRouter()
const route = useRoute()
const hook = useLoginCompleteHook()
const loadingBar = useLoadingBar()

//完成时调用
hook?.setHook(async () => {
  const redirected = route.query.redirected as string

  loadingBar.start()
  setTimeout(() => {
    if (!redirected) {
      router.push({
        name: 'article',
        params: {
          value: t('help_article'),
        },
      })
      return
    }

    router.push(redirected)
  }, 2000)
})

const hooks = useLoginCompleteHooks()
async function handleNext() {
  loadingBar.start()

  await hooks?.runHook()
}
</script>

<template>
  <FloatingCardVue>
    <template #header>
      <slot></slot>
    </template>

    <n-space class="mt-6" vertical>
      <n-input
        v-if="prikey"
        placeholder=""
        v-model:value="prikey"
        type="password"
        show-password-on="click"
      >
        <template #suffix>
          <n-icon class="px-2" @click="handleClipboard">
            <Copy16FilledVue class="hover:text-[#2ed573]" />
          </n-icon>
        </template>
      </n-input>
      <n-alert class="mt-2" :title="t('note')" type="warning">
        {{ t('keep_private_key_prompt') }}
      </n-alert>

      <TestNostrApi :nostr="line.nostrApi"></TestNostrApi>
      <n-checkbox class="mt-2" v-model:checked="value">
        {{ t('i_have_saved_my_private_key_properly') }}
      </n-checkbox>

      <slot name="prev-step"></slot>
      <TooltipVue :tooltip="t('tick_prompt')">
        <slot name="next-step" :next="handleNext" :disabled="!value"></slot>
      </TooltipVue>
    </n-space>
  </FloatingCardVue>
</template>

<style scoped></style>
