<script lang="ts" setup>
import { t } from "@/i18n";
import Contacts from "./ContactList.vue";
import PostListVue from "./PostList.vue";

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
      <Contacts :active="activePage === 'homepage'" :pubkey="pubkey" />
    </n-tab-pane>
    <n-tab-pane display-directive="show" name="follower" :tab="t('follower')">
      七里香
    </n-tab-pane>
    <n-tab-pane display-directive="show" name="中继" :tab="t('relay')">
      七里香
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
