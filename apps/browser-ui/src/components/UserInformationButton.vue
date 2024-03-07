<script lang="ts" setup>
import { nip19 } from 'nostr-tools'
import { renderIcon, useClipboardDialog } from '../utils/naiveUi'
import MoreIconVue from './icon/MoreIcon.vue'
import PencilVue from './icon/Pencil.vue'
import ShareSocialVue from './icon/ShareSocial.vue'
import UserDataEditingVue from './UserDataEditing.vue'
import {
  useEventLine,
  usePubkey,
  useIsMe,
} from '../components/ProvideEventLine'
import {
  LoginStaff,
  NostrApiMode,
  Pubkey,
  RelayConfiguratorSynchronizerStaff,
} from '@jumpalong/nostr-runtime'

const props = defineProps<{
  pubkey: Pubkey
}>()

const { pubkey } = toRefs(props)

const line = useEventLine(RelayConfiguratorSynchronizerStaff, LoginStaff)
const clipboard = useClipboardDialog()
const isItMe = useIsMe(pubkey)
const showModal = ref(false)
const pubkeyHex = computed(() => pubkey.value.toHex())

// const recommendUser = useRecommendUser()
// const recommendUserMetadata = useRecommendUserMetadata()
console.log('isItMe', isItMe.value, 'pubkey', pubkey.value)

const options = computed<any>(() =>
  [
    isItMe.value && {
      label: t('edit_user_profile'),
      key: 'editProfile',
      icon: renderIcon(PencilVue),
      props: {
        onclick() {
          showModal.value = !showModal.value
        },
      },
    },
    {
      label: t('copy'),
      key: 'clipboard',
      icon: renderIcon(ShareSocialVue),
      children: [
        {
          label: `${t('copy')} npub`,
          key: 'copy-npub',
          props: {
            onclick() {
              const k = nip19.npubEncode(pubkeyHex.value)
              clipboard(k)
            },
          },
        },
        {
          label: `${t('copy')} nprofile`,
          key: 'copy-npro',
          props: {
            onclick() {
              const k = nip19.nprofileEncode({
                pubkey: pubkeyHex.value,
                relays: [...line.relayConfigurator.getWriteList()],
              })
              clipboard(k)
            },
          },
        },
        isItMe.value &&
          line.getNostrApiMode() === NostrApiMode.PrivateKey &&
          (line.getNostrApi() as any)?.getPrivateKey &&
          typeof (line.getNostrApi() as any).getPrivateKey === 'function' && {
            label: `${t('copy')} nsec`,
            key: 'copy-nsec',
            props: {
              onclick() {
                const k = nip19.nsecEncode(
                  (line.getNostrApi() as any).getPrivateKey()
                )
                clipboard(k)
              },
            },
          },
        {
          label: `${t('copy')} publicKey hex`,
          key: 'copy-hex',
          props: {
            onclick() {
              clipboard(pubkeyHex.value)
            },
          },
        },
      ].filter(v => !!v),
    },
    {
      label: t('recommend_user'),
      key: 'recommendUser',
      props: {
        onclick() {
          // recommendUser(pubkey.value)
        },
      },
    },
    {
      label: t('recommend_metadata'),
      key: 'recommendUserMetadata',
      props: {
        onclick() {
          // recommendUserMetadata(pubkey.value)
        },
      },
    },
  ].filter(v => !!v)
)
</script>

<template>
  <NDropdown placement="bottom-start" trigger="click" :options="options">
    <NButton circle type="info">
      <MoreIconVue />
    </NButton>
  </NDropdown>
  <n-modal v-model:show="showModal">
    <UserDataEditingVue @close="() => (showModal = false)" />
  </n-modal>
</template>

<style scoped></style>
