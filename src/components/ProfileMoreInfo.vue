<script lang="ts" setup>
import Contacts from "./ContactList.vue";
import PostList from "./PostList.vue";

const props = defineProps<{ pubkey: string }>();
const { pubkey } = toRefs(props);
const pubkeys = computed(()=>[pubkey.value])
</script>

<template>
  <n-tabs type="line" animated>
    <n-tab-pane display-directive="show" name="主页" tab="主页"
      ><PostList :pubkey="pubkeys"
    /></n-tab-pane>
    <n-tab-pane display-directive="show" name="关注" tab="关注">
      <Contacts :pubkey="pubkey" />
    </n-tab-pane>
    <n-tab-pane display-directive="show" name="关注者" tab="关注者">
      七里香
    </n-tab-pane>
    <n-tab-pane display-directive="show" name="中继" tab="中继">
      七里香
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
