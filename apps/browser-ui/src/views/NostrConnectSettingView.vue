<script lang="ts" setup>
import ContactListItem from '@/components/FollowItem.vue'
import { assertSigner } from '../components/ProvideNostrConnect'
import { NSpace, NButton } from 'naive-ui'
import { useClipboardDialog } from '../utils/naiveUi'
import { usePubkey } from '../components/ProvideEventLine'
import PubkeyLink from '../components/PubkeyLink.vue'

const { remoteSigner } = assertSigner()

const list = computed(() => remoteSigner.getAllowList())
function handleDisconnect(pubkey: string) {
  remoteSigner.disConnect(pubkey)
}

const clipboard = useClipboardDialog()
async function handelBunker() {
  clipboard(await remoteSigner.createBunker())
}
const pubkey = usePubkey()
</script>

<template>
  <div class="my-2 mx-2">
    <h3>
      {{ t('signer_pubkey') }}:
      {{ remoteSigner.remoteSignerPubkey.slice(0, 10) }}
    </h3>
    <h3 v-if="pubkey">
      {{ t('remote-user') }}: <PubkeyLink :pubkey="pubkey"></PubkeyLink>
    </h3>
    <NSpace vertical>
      <NButton @click="handelBunker"> {{ t('copy-bunker') }} </NButton>
    </NSpace>

    <div class="h-48 flex justify-center items-center" v-if="list.length === 0">
      <n-empty :description="t('empty')"></n-empty>
    </div>
    <n-list v-else>
      <ContactListItem
        class="mx-2"
        v-for="pubkey of list"
        :key="pubkey"
        :pubkey="pubkey"
      >
        <template #right>
          <n-button
            round
            size="medium"
            type="primary"
            @click="handleDisconnect(pubkey)"
          >
            {{ t('disconnect') }}
          </n-button>
        </template>
      </ContactListItem>
    </n-list>
  </div>
</template>

<style scoped></style>
