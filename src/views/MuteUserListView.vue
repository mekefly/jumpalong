<script lang="ts" setup>
import ContactListItem from "@/components/FollowItem.vue";
import { useNostrContainerGet } from "@/components/NostrContainerProvade";
import { t } from "@/i18n";
import { TYPES } from "@/nostr/nostr";
import { useOnOK } from "@/utils/use";

const muteListEventSync = useNostrContainerGet(TYPES.MuteListSynchronizer);
const MuteList = computed(() => muteListEventSync.getMuteList());
const nutePubkeyIdList = computed(() => MuteList.value.publicList);
const onOK = useOnOK();
function handleRemoveMute(pubkey: string) {
  muteListEventSync.deletePubkey(pubkey, {
    onOK,
  });
}
</script>

<template>
  <div class="my-2 mx-2">
    <div
      class="h-48 flex justify-center items-center"
      v-if="nutePubkeyIdList.size === 0"
    >
      <n-empty :description="t('empty')"></n-empty>
    </div>
    <n-list v-else>
      <ContactListItem
        class="mx-2"
        v-for="pubkey of nutePubkeyIdList"
        :key="pubkey"
        :pubkey="pubkey"
      >
        <template #right>
          <n-button
            round
            size="medium"
            type="primary"
            @click="handleRemoveMute(pubkey)"
          >
            Remove</n-button
          >
        </template>
      </ContactListItem>
    </n-list>
  </div>
</template>

<style scoped></style>
