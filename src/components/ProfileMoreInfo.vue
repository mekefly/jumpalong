<script lang="ts" setup>
import { t } from "@/i18n";
import Follow from "./Follow.vue";
import FollowerVue from "./Follower.vue";
import PostListVue from "./PostList.vue";
import ProfileMoreInfoRelayListVue from "./ProfileMoreInfoRelayList.vue";

const props = defineProps<{ pubkey: string; urls?: Set<string> }>();
const { pubkey } = toRefs(props);
const pubkeys = computed(() => [pubkey.value]);
const activePage = ref("homepage");
</script>

<template>
  <n-tabs type="line" v-model:value="activePage" animated>
    <n-tab-pane display-directive="show" name="homepage" :tab="t('homepage')">
      <PostListVue
        :active="activePage === 'homepage'"
        :pubkey="pubkeys"
        :urls="props.urls"
      />
    </n-tab-pane>
    <n-tab-pane display-directive="show" name="follow" :tab="t('follow')">
      <Follow :active="activePage === 'follow'" :pubkey="pubkey" />
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
