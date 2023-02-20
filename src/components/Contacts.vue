<script lang="ts" setup>
import { NAvatar, NList, NListItem } from "naive-ui";
import { getContactList, localContacts, pullMyContacts } from "../api/Contact";
import { userKey } from "../api/user";
import profile from "../assets/profile-2-400x400.png";
import Ellipsis from "../components/Ellipsis.vue";
const { pubkey } = defineProps<{ pubkey: string }>();

pullMyContacts();
const isItMe = computed(() => pubkey === userKey.value.publicKey);
const other: any = isItMe.value ? null : getContactList(pubkey);
const contacts = computed(
  () => (isItMe.value ? localContacts.value : other.value).contacts ?? {}
);
const contactPubkeyList = computed(() => Object.keys(contacts.value));
</script>

<template>
  <div class="p-4 box-border">
    <n-list>
      <n-list-item class="cursor-pointer" v-for="pk in contactPubkeyList">
        <div class="flex items-center">
          <n-avatar
            class="ml-4"
            size="small"
            :src="contacts[pk].picture ?? profile"
            round
            @click="() => $router.push(`/profile/${pk}`)"
          />
          <div class="flex flex-col ml-4 flex-1 shrink-1 w-full">
            <div class="text-xl">
              {{ contacts[pk].name ?? pk.slice(0, 10) }}
            </div>
            <Ellipsis v-if="contacts[pk].about" :style="{ fontSize: '10px' }">
              {{ contacts[pk].about }}
            </Ellipsis>
          </div>
        </div>
      </n-list-item>
    </n-list>
  </div>
</template>

<style scoped></style>
