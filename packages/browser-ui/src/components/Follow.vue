<script lang="ts" setup>
import { TYPES } from "@/nostr/nostr";
import { usePubkey } from "@/utils/nostrApiUse";
import { useElementIntoScreen } from "@/utils/use";
import { NList } from "naive-ui";
import ContactListItemVue from "./FollowItem.vue";
import {
  useNostrContainerAsyncGet,
  useNostrContainerGet,
} from "./NostrContainerProvade";

const evaluating = ref(false);
const props = defineProps<{
  pubkey: string;
  urls?: Set<string>;
  active: boolean;
}>();
const { pubkey, urls, active } = toRefs(props);

const contactConfiguration = await useNostrContainerAsyncGet(
  TYPES.ContactConfigurationSynchronizer
);
const contactApi = useNostrContainerGet(TYPES.ContactApi);

const contactListLine = computed(() => {
  evaluating.value = !evaluating.value;
  return contactApi.getContactListLineByPubkey(pubkey.value, {
    urls: urls?.value,
  });
});

const currentPubkey = usePubkey();
const contactList = computed(() => {
  if (!currentPubkey.value) {
    return [];
  }
  if (pubkey.value === currentPubkey.value) {
    return Object.values(contactConfiguration.getContactConfiguration());
  }
  return contactListLine.value.feat.getContactList();
});

const divRef = ref(undefined);
useElementIntoScreen(divRef, {
  active: active,
});
</script>

<template>
  <div ref="divRef" class="p-4 box-border">
    <n-list>
      <ContactListItemVue
        v-for="contact of contactList"
        :key="contact.pubkey"
        :contact="contact"
        :pubkey="contact.pubkey"
        :name="contact.name"
      />
    </n-list>
  </div>
</template>

<style scoped></style>
