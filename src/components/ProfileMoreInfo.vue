<script lang="ts" setup>
import { createPinEventLine } from "@/api/pin";
import { t } from "@/i18n";
import { getPinListSync } from "@/nostr/PinListSync";
import { usePubkey } from "@/utils/nostrApiUse";
import Follow from "./Follow.vue";
import FollowerVue from "./Follower.vue";
import PostListVue from "./PostList.vue";
import ProfileMoreInfoRelayListVue from "./ProfileMoreInfoRelayList.vue";
import { InsertDropdownOptionOpt } from "./SMSButtonProvide";
import SMSButtonProvide from "./SMSButtonProvide.vue";

const props = defineProps<{ pubkey: string; urls?: Set<string> }>();
const { pubkey } = toRefs(props);
const pubkeys = computed(() => [pubkey.value]);

const activePage = ref("homepage");

const pinListSync = getPinListSync();

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
const line = computed(() => createPinEventLine({ pubkey: pubkey.value }));

const tags = computed(() =>
  isMe.value
    ? [...pinListSync.getData().tagMap.values()]
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
      <div v-if="isMe">
        <SMSButtonProvide
          :insertDropdownOptionList="[unPininsertDropdownOption]"
        >
          <PostListVue :tags="tags" />
        </SMSButtonProvide>
      </div>
      <div v-else>
        <PostListVue :tags="tags"></PostListVue>
      </div>

      <n-divider v-if="tags.length > 0">{{ t("tip") }}</n-divider>

      <PostListVue
        :active="activePage === 'homepage'"
        :filters="[
          {
            kinds: [30023],
            authors: [pubkey],
          },
          {
            kinds: [1],
            authors: [pubkey],
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
