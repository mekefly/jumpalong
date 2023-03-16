<script lang="ts" setup>
import contactConfiguration from "@/api/Contact";
import { getUserMetadataLineByPubkey } from "@/api/user";
import ProfileMoreInfoVue from "@/components/ProfileMoreInfo.vue";
import UserInformationButtonVue from "@/components/UserInformationButton.vue";
import { relayConfigurator } from "@/nostr/nostr";
import { toDeCodeNprofile } from "@/utils/nostr";
import { nip19 } from "nostr-tools";
import { computed } from "vue";
import { userKey } from "../nostr/user";
const route = useRoute();
console.log("route.params", route.params);
// const router = useRouter();

const nprofile = nip19.nprofileEncode({
  pubkey: userKey.value.publicKey,
  relays: Array.from(relayConfigurator.getWriteList()),
});
const hash = computed(() => (route.params.value as string) ?? nprofile);

const profilePointer = computed(() => {
  return toDeCodeNprofile(hash.value);
});

const isItMe = computed(
  () => profilePointer.value?.pubkey === userKey.value.publicKey
);
const pubkey = computed(() => profilePointer.value?.pubkey);

const metadata = computed(() => {
  if (!pubkey.value) return null;
  return getUserMetadataLineByPubkey(
    pubkey.value,
    new Set(profilePointer.value?.relays)
  ).feat.useMetadata();
});

const isFollow = computed(() => {
  if (!pubkey.value) return false;
  return contactConfiguration.isFollow(pubkey.value);
});
</script>

<template>
  <div v-if="pubkey">
    <div class="">
      <NAvatar round :size="100" :src="metadata?.picture ?? ''" />
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
        <UserInformationButtonVue :pubkey="pubkey" />
      </div>
    </h1>
    <div>
      {{ metadata?.about }}
    </div>

    <ProfileMoreInfoVue v-if="pubkey" :pubkey="pubkey" />
  </div>
</template>

<style scoped></style>
