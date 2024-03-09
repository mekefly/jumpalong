<script lang="ts" setup>
import {
  LoginStaff,
  Pubkey,
  ContactConfigurationSynchronizer,
  RelayConfiguratorSynchronizer,
  toDeCodeNprofile,
} from '@/nostr-runtime'
import { computed } from 'vue'
import Profile from '../components/Profile.vue'
import {
  useEventLine,
  useIsMe,
  usePubkey,
} from '../components/ProvideEventLine'
import { useZaps } from '../components/ZapsPrivider'
import { NButton } from 'naive-ui'
import UserInformationButton from '../components/UserInformationButton.vue'

const route = useRoute()
const zaps = useZaps()
const currentPubkey = usePubkey()

const line = useEventLine(
  // RelayConf
  RelayConfiguratorSynchronizer.Staff,
  ContactConfigurationSynchronizer.Staff,
  LoginStaff
)

const contactConfiguration = computed(() => line.contactConfiguration)

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
  return contactConfiguration.value.isFollow(pubkey.value)
})
async function handelClick() {
  if (!pubkey.value) {
    return
  }
  if (isFollow.value) {
    await contactConfiguration.value.unFollow(pubkey.value)
  } else {
    await contactConfiguration.value.follow(pubkey.value)
  }
}
function handleReward() {
  if (!pubkey.value) {
    return
  }
  zaps?.reward(pubkey.value)
}
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
