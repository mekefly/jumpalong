<script lang="ts" setup>
import { t } from "@/i18n";
import { TYPES } from "@/nostr/nostr";
import { usePubkey } from "@/utils/nostrApiUse";
import Follow from "./Follow.vue";
import FollowerVue from "./Follower.vue";
import {
  useNostrContainerAsyncGet,
  useNostrContainerGet,
} from "./NostrContainerProvade";
import PostListVue from "./PostList.vue";
import ProfileMoreInfoRelayListVue from "./ProfileMoreInfoRelayList.vue";
import { InsertDropdownOptionOpt } from "./SMSButtonProvide";
import SMSButtonProvide from "./SMSButtonProvide.vue";

const props = defineProps<{ pubkey: string; urls?: Set<string> }>();
const { pubkey } = toRefs(props);

const pinListSync = await useNostrContainerAsyncGet(TYPES.PinListSynchronizer);
const createPinEventLine = useNostrContainerGet(TYPES.PinApi);

const pubkeys = computed(() => [pubkey.value]);

const activePage = ref("homepage");

const currentPublic = usePubkey();
const isMe = computed(() => currentPublic.value === pubkey.value);
const message = useMessage();
const unPininsertDropdownOption: InsertDropdownOptionOpt = {
  insertKey: "pin",
  key: "unpin",
  async handle(event) {
    pinListSync.unpin(event);
    message.info(t("request_initiated"));
  },
  label: t("unpin"),
};
const line = computed(() =>
  createPinEventLine.createPinEventLine({ pubkey: pubkey.value })
);

const tags = computed(() =>
  isMe.value
    ? [...pinListSync.getPinListSync().tagMap.values()]
    : line.value.feat.getLatestEvent()?.tags ?? []
);
</script>

<template>
  <n-tabs type="line" v-model:value="activePage" animated>
    <n-tab-pane
      display-directive="show:lazy"
      name="homepage"
      :tab="t('homepage')"
    >
      <div v-if="tags && tags.length > 0">
        <SMSButtonProvide
          v-if="isMe"
          :insertDropdownOptionList="[unPininsertDropdownOption]"
        >
          <PostListVue :tags="tags" />
        </SMSButtonProvide>
        <PostListVue v-else :tags="tags"></PostListVue>
        <n-divider>{{ t("pin") }}</n-divider>
      </div>

      <PostListVue
        :active="activePage === 'homepage'"
        :filters="[
          {
            kinds: [30023],
            authors: pubkeys,
          },
          {
            kinds: [1],
            authors: pubkeys,
          },
        ]"
        :urls="props.urls"
      />
    </n-tab-pane>
    <n-tab-pane display-directive="show:lazy" name="follow" :tab="t('follow')">
      <Follow :active="activePage === 'follow'" :pubkey="pubkey" :urls="urls" />
    </n-tab-pane>
    <n-tab-pane
      display-directive="show:lazy"
      name="follower"
      :tab="t('follower')"
    >
      <FollowerVue :active="activePage === 'follower'" :pubkey="pubkey" />
    </n-tab-pane>
    <n-tab-pane display-directive="show:lazy" name="中继" :tab="t('relay')">
      <ProfileMoreInfoRelayListVue
        :active="activePage === 'relay'"
        :pubkey="pubkey"
      />
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
