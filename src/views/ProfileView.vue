<script lang="ts" setup>
import contactConfiguration from "@/api/Contact";
import { getUserMetadataLineByPubkey } from "@/api/user";
import ProfileMoreInfoVue from "@/components/ProfileMoreInfo.vue";
import UserInformationButtonVue from "@/components/UserInformationButton.vue";
import { relayConfigurator } from "@/nostr/nostr";
import { toDeCodeNprofile } from "@/utils/nostr";
import { useScale } from "@/utils/use";
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
watchEffect(() => {
  console.log("metadata", metadata.value);
});
function handelClick() {
  if (!pubkey.value) {
    return;
  }
  if (isFollow.value) {
    contactConfiguration.unFollow(pubkey.value);
  } else {
    contactConfiguration.follow(pubkey.value);
  }
}
const [target] = useScale(0.3);
</script>

<template>
  <div v-if="pubkey" class="w-full h-full">
    <div ref="target" class="h-0 w-full relative" :style="{}">
      <n-image
        :src="metadata?.banner ?? metadata?.picture"
        object-fit="cover"
        class="w-full h-full banner"
      />
      <NAvatar
        class="absolute bottom-0 left-2"
        :style="{
          transform: `translate(0,50%)`,
        }"
        round
        :size="100"
        :src="metadata?.picture ?? ''"
      />
    </div>
    <div>
      <div class="flex items-center justify-end px-8 mt-4">
        <n-space>
          <n-button
            class="ml-4"
            v-if="!isItMe"
            strong
            round
            :type="isFollow ? 'warning' : 'primary'"
            @click="handelClick"
          >
            {{ isFollow ? "UnFollow" : "Follow" }}
          </n-button>

          <div v-if="pubkey">
            <UserInformationButtonVue :pubkey="pubkey" />
          </div>
        </n-space>
      </div>

      <h1 class="flex items-center">
        {{ metadata?.name ?? profilePointer?.pubkey.slice(0, 10) }}
      </h1>
      <div>
        {{ metadata?.about }}
      </div>
    </div>

    <ProfileMoreInfoVue v-if="pubkey" :pubkey="pubkey" />
  </div>
</template>

<style scoped>
.banner :deep() img {
  height: 100%;
  width: 100%;
}
</style>
