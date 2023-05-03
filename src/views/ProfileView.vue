<script lang="ts" setup>
import { getUserMetadataLineByPubkey } from "@/api/user";
import profile from "@/assets/profile-2-400x400.png";
import EllipsisVue from "@/components/Ellipsis.vue";
import { useNostrContainerGet } from "@/components/NostrContainerProvade";
import ProfileMoreInfoVue from "@/components/ProfileMoreInfo.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import UserInformationButtonVue from "@/components/UserInformationButton.vue";
import { relayConfigurator, TYPES } from "@/nostr/nostr";
import { toDeCodeNprofile } from "@/utils/nostr";
import { usePubkey } from "@/utils/nostrApiUse";
import { useScale } from "@/utils/use";
import { nip19 } from "nostr-tools";
import { computed } from "vue";
const route = useRoute();

const currentPubkey = usePubkey({ intercept: true });
const contactConfiguration = useNostrContainerGet(TYPES.ContactConfiguration);
const nprofile = computed(() =>
  currentPubkey.value
    ? nip19.nprofileEncode({
        pubkey: currentPubkey.value,
        relays: Array.from(relayConfigurator.getWriteList()),
      })
    : ""
);
const hash = computed(() => (route.params.value as string) ?? nprofile.value);

const profilePointer = computed(() => {
  return toDeCodeNprofile(hash.value);
});

const isItMe = computed(
  () => profilePointer.value?.pubkey === currentPubkey.value
);
const pubkey = computed(() => profilePointer.value?.pubkey);
const urls = computed(
  () => profilePointer.value?.relays && new Set(profilePointer.value?.relays)
);

const metadata = computed(() => {
  if (!pubkey.value) return null;
  return getUserMetadataLineByPubkey(pubkey.value, {
    urls: urls.value,
  }).feat.useMetadata();
});

const isFollow = computed(() => {
  if (!pubkey.value) return false;
  return contactConfiguration.isFollow(pubkey.value);
});
async function handelClick() {
  if (!pubkey.value) {
    return;
  }
  if (isFollow.value) {
    await contactConfiguration.unFollow(pubkey.value);
  } else {
    await contactConfiguration.follow(pubkey.value);
  }
}
const [target] = useScale(0.3);
</script>

<template>
  <div v-if="pubkey" class="w-full h-full flex flex-col">
    <ScrollbarVue class="flex-shrink flex-1 h-0" refreshable loadable>
      <div class="flex flex-col">
        <div ref="target" class="h-0 w-full relative flex-shrink-0" :style="{}">
          <n-image
            v-if="metadata?.banner ?? metadata?.picture"
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
            :src="metadata?.picture ?? profile"
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
            <EllipsisVue>
              {{ metadata?.name ?? profilePointer?.pubkey.slice(0, 10) }}
            </EllipsisVue>
          </h1>
          <div
            class="w-full"
            :style="{
              'word-break': 'break-all',
              'text-overflow': 'ellipsis',
              'word-wrap': 'break-word',
            }"
          >
            {{ metadata?.about }}
          </div>
        </div>
      </div>
      <ProfileMoreInfoVue v-if="pubkey" :pubkey="pubkey" :urls="urls" />
    </ScrollbarVue>
  </div>
</template>

<style scoped>
.banner :deep() img {
  height: 100%;
  width: 100%;
}
</style>
