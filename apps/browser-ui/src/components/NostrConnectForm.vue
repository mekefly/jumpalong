<script lang="ts" setup>
import {
  NostrConnectNostrApiImpl,
  Pubkey,
  LoginStaff,
  NostrApiMode,
} from '../nostr-runtime'
import { useSetAutocomplete } from './Login'

// import { getTempPubkey } from "@/api/NostrConnect";
import { useCacheStorage } from '../utils/use'
import { useLoginCompleteHook } from './LoginCompleteHook'
import { useEventLine } from './ProvideEventLine'

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'beforeNext'): void
}>()
const hook = useLoginCompleteHook()
const message = useMessage()
const bunker = useCacheStorage('pubkey-input-value', '', {})
// const profilePointer = computed(() => toDeCodeNprofile(bunker.value))

const bunkerUrl = computed(() => {
  if (!bunker.value) return
  try {
    return new URL(bunker.value)
  } catch (error) {
    return
  }
})
const pubkey = computed(() => bunkerUrl.value?.pathname.slice(2))
const relays = computed(
  () => new Set(bunkerUrl.value?.searchParams.getAll('relay'))
)
const dialog = useDialog()

const line = useEventLine(LoginStaff)
async function handleNext() {
  if (!pubkey.value) return
  emit('beforeNext')

  const nostrApi = new NostrConnectNostrApiImpl(
    line,
    Pubkey.fromHex(pubkey.value),
    relays.value
  )

  //设置api
  // setNostrApiMode(NostrApiMode.NostrContent);
  // injectNostrApi({ nostrApi: nostrApi });

  //全部同步
  // setTimeout(() => {
  //   relayConfigurator.sync();
  // });

  //设置完成时调用
  hook?.setHook(async () => {
    if (!pubkey.value) return
    dialog.info({
      title: t('note'),
      content: t('nostr_connect_tip'),
      positiveText: t('yes'),
      onPositiveClick: () => {},
    })
  })

  try {
    await connect(pubkey.value, nostrApi)

    line.loginApi(NostrApiMode.NostrConnect, nostrApi)
    emit('next')
  } catch (error) {
    message.error(`连接失败:${String(error)}}`)
  }
}
async function connect(pubkey: string, nostrApi: NostrConnectNostrApiImpl) {
  await nostrApi.connect()

  //固定到存储，公钥登录，如果没有连接成功，那么刷新网页就会进入未登录状态
  localStorage.setItem('bunker', bunker.value)
}

const pubkeyInput = useSetAutocomplete('username')
</script>

<template>
  <n-space class="flex flex-col" vertical>
    <p>{{ t('device_pubkey') }} {{}}</p>

    <n-input
      ref="pubkeyInput"
      :placeholder="t('bunker')"
      show-password-on="click"
      v-model:value="bunker"
    />

    <slot name="prev-step"></slot>

    <n-button
      :disabled="!pubkey"
      @click="handleNext"
      class="w-full"
      :type="'primary'"
    >
      {{ t('next_step') }}
    </n-button>
  </n-space>
</template>

<style scoped></style>
