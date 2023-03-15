<script lang="ts" setup>
import contactConfiguration from "../api/Contact";
import EditNewMessage from "../components/EditNewMessage.vue";
import PostList from "../components/PostList.vue";

logger.for("home.vue").info("home.vue");

const pubkeys = computed(() => {
  const pubkeys = Object.keys(
    contactConfiguration.getData().contactConfiguration
  );
  return pubkeys;
});
</script>

<template>
  <n-tabs
    default-value="MyFeed"
    justify-content="space-evenly"
    type="line"
    animated
  >
    <n-tab-pane name="MyFeed" tab="我关注的" display-directive="show:lazy">
      <PostList v-if="pubkeys.length > 0" :pubkey="pubkeys" />
      <n-empty v-else description="你什么也找不到">
        <template #extra>
          <n-button size="small"> 您没有关注任何人 </n-button>
        </template>
      </n-empty>
    </n-tab-pane>
    <n-tab-pane name="GlobalFeed" tab="全局" display-directive="show:lazy">
      <PostList />
    </n-tab-pane>
  </n-tabs>
  <EditNewMessage />
</template>

<style scoped></style>
