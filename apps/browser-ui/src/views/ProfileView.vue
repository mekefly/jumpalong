<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { computed } from 'vue'
import Profile from '../components/Profile.vue'
import {
  useEventLine,
  useIsMe,
  usePubkey,
} from '../components/ProvideEventLine'
import UserInformationButton from '../components/UserInformationButton.vue'
import {
  ListEnum,
  LoginStaff,
  Pubkey,
  RelayConfiguratorSynchronizer,
  Synchronizer,
  toDeCodeNprofile,
} from '../nostr-runtime'

const route = useRoute()
// const zaps = useZaps()
const currentPubkey = usePubkey()

const line = useEventLine(
  // RelayConf
  RelayConfiguratorSynchronizer.Staff,
  Synchronizer.ListSynchronizerManager.Staff,
  LoginStaff
)

const contactConfiguration = computed(() =>
  line.listSynchronizerManager.getInitStandardListSynchronizer(ListEnum.Follow)
)

const hashValue = computed(() => route.params.value as string)

const profilePointer = computed(() => {
  return hashValue.value && toDeCodeNprofile(hashValue.value)
})

const pubkey = computed(() => {
  if (!profilePointer.value) {
    return currentPubkey.value
  }
  return Pubkey.fromHex(profilePointer.value.pubkey)
})
const isItMe = useIsMe(pubkey)
const urls = computed(() => {
  if (!profilePointer.value) {
    return line.relayConfigurator.getWriteList()
  }
  return new Set(profilePointer.value.relays)
})

const isFollow = computed(() => {
  if (!pubkey.value) return false
  return contactConfiguration.value.has({
    type: 'p',
    pubkey: pubkey.value.toHex(),
  })
})

async function handelClick() {
  if (!pubkey.value) {
    return
  }
  if (isFollow.value) {
    await contactConfiguration.value.delete({
      type: 'p',
      pubkey: pubkey.value.toHex(),
    })
  } else {
    await contactConfiguration.value.add({
      type: 'p',
      pubkey: pubkey.value.toHex(),
    })
  }
}
// function handleReward() {
//   if (!pubkey.value) {
//     return
//   }
//   zaps?.reward(pubkey.value)
// }
</script>

<template>
  <Profile v-if="pubkey" :pubkey="pubkey" :urls="urls">
    <template #right>
      <NButton
        class="ml-4"
        v-if="!isItMe"
        strong
        round
        :type="isFollow ? 'warning' : 'primary'"
        @click="handelClick"
      >
        {{ isFollow ? 'UnFollow' : 'Follow' }}
      </NButton>

      <div v-if="pubkey">
        <UserInformationButton :pubkey="pubkey" />
      </div>
    </template>
  </Profile>
</template>

<style scoped>
.banner :deep() img {
  height: 100%;
  width: 100%;
}
</style>
