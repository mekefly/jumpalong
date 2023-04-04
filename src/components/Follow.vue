<script lang="ts" setup>
import { userKey } from "@/nostr/user";
import { NList } from "naive-ui";
import contactConfiguration, {
  getContactListLineByPubkey,
} from "../api/Contact";
import ContactListItemVue from "./FollowItem.vue";
const props = defineProps<{ pubkey: string; urls?: Set<string> }>();
const { pubkey, urls } = toRefs(props);

const contactListLine = computed(() => {
  return getContactListLineByPubkey(pubkey.value, { urls: urls?.value });
});
const contactList = computed(() => {
  if (pubkey.value === userKey.value.publicKey) {
    return contactConfiguration.getContactConfiguration();
  }
  return contactListLine.value.feat.getContactList();
});
</script>

<template>
  <div class="p-4 box-border">
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
