<script lang="ts" setup>
import { getUserMetadataLineByPubkey } from "@/api/user";
import { NButton } from "naive-ui";
import { getPublicKey, nip19 } from "nostr-tools";
import { computed } from "vue";
import contactConfiguration from "../api/Contact";
import profile from "../assets/profile-2-400x400.png";
import ProfileMoreInfo from "../components/ProfileMoreInfo.vue";
import UserInformationButton from "../components/UserInformationButton.vue";
import { userKey } from "../nostr/user";
const route = useRoute();

const hash = computed(
  () => (route.params.hash ?? userKey.value.publicKey) as string
);

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
const pubkey = computed(() => profilePointer.value?.pubkey);

const metadata = computed(() => {
  if (!pubkey.value) return null;
  return getUserMetadataLineByPubkey(pubkey.value).feat.useMetadata();
});

const isFollow = computed(() => {
  if (!pubkey.value) return false;
  return contactConfiguration.isFollow(pubkey.value);
});
</script>

<template>
  <div v-if="pubkey">
    <div class="">
      <NAvatar round :size="100" :src="metadata?.picture ?? profile" />
    </div>

    <h1 class="flex items-center">
      {{ metadata?.name ?? profilePointer?.pubkey.slice(0, 10) }}

      <n-button
        class="ml-4"
        v-if="!isFollow && !isItMe"
        strong
        round
        type="primary"
        @click="() => contactConfiguration.follow(profilePointer?.pubkey)"
      >
        Flower
      </n-button>
      <n-button
        class="ml-4"
        v-if="isFollow && !isItMe"
        strong
        round
        type="tertiary"
        @click="() => contactConfiguration.unFollow(profilePointer?.pubkey)"
      >
        Unflower
      </n-button>

      <div class="ml-4" v-if="profilePointer?.pubkey">
        <UserInformationButton :pubkey="pubkey" />
      </div>
    </h1>
    <div>
      {{ metadata?.about }}
    </div>

    <ProfileMoreInfo v-if="pubkey" :pubkey="pubkey" />
  </div>
</template>

<style scoped></style>
