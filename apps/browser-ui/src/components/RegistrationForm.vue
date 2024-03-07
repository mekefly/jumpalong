<script lang="ts" setup>
// import { relayConfigurator, rootEventBeltline, TYPES } from "@/nostr/nostr";
// import { useOnOK } from "../utils/use";
// import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools";
import { Prikey, LoginStaff } from '@jumpalong/nostr-runtime'
import { useSetAutocomplete } from './Login'
import { useLoginCompleteHook } from './LoginCompleteHook'
// import {
//   useNostrContainerAsyncGet,
//   useNostrContainerFactory,
// } from './NostrContainerProvade'
import UserMetadataEditingVue from './UserMetadataEditing.vue'
import { useEventLine } from './ProvideEventLine'

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'beforeNext'): void
}>()

const message = useMessage()
// const getFollowChannel = useNostrContainerFactory(
//   TYPES.FollowChannelSynchronizer
// );
// const contactConfiguration = await useNostrContainerAsyncGet(
//   TYPES.ContactConfigurationSynchronizer
// );
// const getNostrApi = useNostrContainerFactory(TYPES.LoginApi);
let line = useEventLine(LoginStaff)

const prikeyInput = useSetAutocomplete('new-password')
const pubkeyInput = useSetAutocomplete('username')

const prikey: Ref<Prikey> = ref<Prikey>(Prikey.create()) as any
const pubkey = computed(() => prikey.value.getPubkey())
const nsec = computed(() => prikey.value.getNsec())
const npub = computed(() => pubkey.value.getNpub())
const userMetadata = ref({} as any)

function handleRegister() {
  emit('beforeNext')
  line.registerPrikey(prikey.value)
  emit('next')
}

const hook = useLoginCompleteHook()
hook?.setHook(async () => {
  //在点击完成注册按钮时将会执行
  if (line.testAndVerifyNewUser()) {
    //是新用户的话执行
    await send()

    //对新用户执行的操作
    // contactConfiguration.follow(
    //   '076fae9a020673caf9db66734884aa4a77f49ba394274896e439e1c6ff178289',
    //   'wss://nos.lol', //作者
    //   '你好'
    // )
    // // Nostr
    // getFollowChannel().joinChannel(
    //   '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb', //nostr群
    //   {
    //     relays: ['wss://nos.lol'],
    //   }
    // )
    // // Jumpalong
    // getFollowChannel().joinChannel(
    //   '22dcc0565a6c698199767e80b0526769cf3c04460b7ffc22a4b4cfbfdd642b53', //Jumpalong群
    //   {
    //     relays: ['wss://nos.lol'],
    //   }
    // )
  }

  line.clearNewUserFlag()
})
// const onOK = useOnOK()
async function send() {
  // rootEventBeltline.publish(
  //   {
  //     content: JSON.stringify(userMetadata.value),
  //     kind: 0,
  //     tags: [
  //       ['t', 'jumpalong'], //给注册用户加个客户端标识
  //     ],
  //   },
  //   relayConfigurator.getWriteList(),
  //   {
  //     addUrl: true,
  //     onOK,
  //   }
  // )
}
</script>

<template>
  <n-form>
    <n-form-item-row :label="t('pubkey')">
      <n-input ref="pubkeyInput" placeholder="" v-model:value="npub" disabled />
    </n-form-item-row>
    <n-form-item-row :label="t('prikey')">
      <n-input
        ref="prikeyInput"
        placeholder=""
        show-password-on="click"
        v-model:value="nsec"
        type="password"
        disabled
      />
    </n-form-item-row>
    <UserMetadataEditingVue :userMetadata="userMetadata" />
    <div class="mt-4">
      <slot name="prev-step"></slot>
    </div>
    <n-button class="mt-2" type="primary" block strong @click="handleRegister">
      {{ t('logon') }}
    </n-button>
  </n-form>
</template>

<style scoped></style>
