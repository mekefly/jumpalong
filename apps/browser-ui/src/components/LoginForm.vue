<script lang="ts" setup>
// import { decodeToPrikey } from '../utils/nostr'
import { useSetAutocomplete } from './Login'
// import { useNostrContainerFactory } from './NostrContainerProvade'
import { Prikey, LoginStaff } from '../nostr-runtime'
import { useEventLine } from './ProvideEventLine'

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'beforeNext'): void
}>()

let line = useEventLine(LoginStaff)

const message = useMessage()

const prikeyValue = ref()

const prikeyInput = useSetAutocomplete('current-password')
const pubkeyInput = useSetAutocomplete('username')
// const getLoginApi = useNostrContainerFactory(TYPES.LoginApi)

const prikey = computed(() => {
  if (!prikeyValue.value) {
    return
  }
  try {
    return Prikey.fromString(prikeyValue.value)
  } catch (error) {
    return null
  }
})
const pubkey = computed(() => prikey.value && prikey.value.getPubkey())

function handelLogin() {
  if (!prikeyValue.value) {
    message.error('请输入私钥')
    return
  }
  if (!prikey.value) {
    message.error('您输入的既不是nsec,也不是hex')
    return
  }
  emit('beforeNext')
  line.loginPrikey(prikey.value)
  emit('next')
}
</script>

<template>
  <n-form>
    <n-form-item-row :label="t('pubkey')">
      <n-input
        ref="pubkeyInput"
        :placeholder="t('pubkey')"
        show-password-on="click"
        :value="pubkey?.toHex()"
        :disabled="true"
      />
    </n-form-item-row>
    <n-form-item-row :label="t('prikey')">
      <n-input
        ref="prikeyInput"
        :placeholder="t('prikey')"
        show-password-on="click"
        v-model:value="prikeyValue"
        type="password"
      />
    </n-form-item-row>

    <slot name="prev-step"></slot>
    <n-button
      class="mt-2"
      type="primary"
      block
      strong
      @click="handelLogin"
      :disabled="!prikey"
    >
      {{ t('login') }}
    </n-button>
  </n-form>
</template>

<style scoped></style>
