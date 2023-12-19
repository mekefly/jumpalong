<script lang="ts" setup>
import { getTempPubkey } from "@/api/NostrConnect";
import ContactListItem from "@/components/FollowItem.vue";
import { useNostrContainerGet } from "@/components/NostrContainerProvade";
import { t } from "@/i18n";
import { TYPES } from "@/nostr/nostr";
const nostrConnectedSynchronizer = await useNostrContainerGet(
  TYPES.NostrConnectedSynchronizer
);

const list = computed(() => nostrConnectedSynchronizer.getNostrConnectedList());
function handleDisconnect(pubkey: string) {
  nostrConnectedSynchronizer.disConnect(pubkey);
}
</script>

<template>
  <div class="my-2 mx-2">
    <p>{{ t("device_pubkey") }} {{ getTempPubkey().slice(0, 10) }}</p>

    <div class="h-48 flex justify-center items-center" v-if="list.size === 0">
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
            {{ t("disconnect") }}
          </n-button>
        </template>
      </ContactListItem>
    </n-list>
  </div>
</template>

<style scoped></style>
