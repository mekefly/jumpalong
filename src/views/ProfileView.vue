<script lang="ts" setup>
import { NButton } from "naive-ui";
import { getPublicKey, nip19 } from "nostr-tools";
import { followContact, localContacts, unFollowContact } from "../api/Contact";
import { getUserMetadataByPubkey, userKey, UserMetaData } from "../api/user";
import profile from "../assets/profile-2-400x400.png";
import ProfileMoreInfo from "../components/ProfileMoreInfo.vue";
import UserInformationButton from "../components/UserInformationButton.vue";

const hash = computed(
  () => (useRoute().params.hash ?? userKey.value.publicKey) as string
);

const metadata = ref({} as UserMetaData);

const profilePointer = computed(() => {
  try {
    const decodeValue = nip19.decode(hash.value);
    switch (decodeValue.type) {
      case "nprofile":
        return decodeValue.data as nip19.ProfilePointer;
      case "npub":
        return { pubkey: decodeValue.data as string };
      case "nsec":
        return { pubkey: getPublicKey(decodeValue.data as string) };
      default:
        break;
    }
  } catch (error) {
    if (hash.value.length === 64) {
      return { pubkey: hash.value };
    }
  }
});
const isItMe = computed(
  () => profilePointer.value?.pubkey === userKey.value.publicKey
);

const isFollow = computed(() => {
  if (!profilePointer.value?.pubkey || !localContacts.value?.contacts)
    return false;

  return !!localContacts.value.contacts[profilePointer.value.pubkey];
});
watch(
  profilePointer,
  async () => {
    if (!profilePointer.value) return;
    metadata.value = await getUserMetadataByPubkey(
      profilePointer.value.pubkey,
      profilePointer.value.relays
        ? {
            relayUrls: new Set(profilePointer.value.relays),
          }
        : undefined
    );
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <div class="">
      <NAvatar round :size="100" :src="metadata.picture ?? profile" />
    </div>

    <h1 class="flex items-center">
      {{ metadata.name ?? profilePointer?.pubkey.slice(0, 10) }}

      <n-button
        class="ml-4"
        v-if="!isFollow && !isItMe"
        strong
        round
        type="primary"
        @click="() => followContact(profilePointer?.pubkey)"
      >
        Flower
      </n-button>
      <n-button
        class="ml-4"
        v-if="isFollow && !isItMe"
        strong
        round
        type="tertiary"
        @click="() => unFollowContact(profilePointer?.pubkey)"
      >
        Unflower
      </n-button>

      <div class="ml-4" v-if="profilePointer?.pubkey">
        <UserInformationButton :pubkey="profilePointer.pubkey" />
      </div>
    </h1>
    <div>
      {{ metadata.about }}
    </div>

    <ProfileMoreInfo v-if="profilePointer" :pubkey="profilePointer?.pubkey" />
  </div>
</template>

<style scoped></style>
