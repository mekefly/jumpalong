<script lang="ts" setup>
import RichTextEditBoxVue from "@/components/RichTextEditBox.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import { rootEventBeltline } from "@/nostr/nostr";
import relayConfigurator from "@/nostr/relayConfigurator";
import { EventTemplate } from "nostr-tools";
import contactConfiguration from "../api/Contact";
import PostList from "../components/PostList.vue";

logger.for("home.vue").info("home.vue");

const { success, error } = useMessage();

const pubkeys = computed(() => {
  const pubkeys = Object.keys(
    contactConfiguration.getData().contactConfiguration
  );
  return pubkeys;
});

function handleSendEvent(event: EventTemplate) {
  event.kind = 1;
  rootEventBeltline.publish(event, relayConfigurator.getWriteList(), {
    addUrl: true,
    onOK({ ok, url }) {
      if (ok) {
        success(`已发布到${url}`);
      }
      {
        error(`没有发布到${url}`);
      }
    },
  });
}
</script>

<template>
  <div class="flex flex-col h-full overflow-auto">
    <ScrollbarVue>
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
    </ScrollbarVue>
    <!-- <EditNewMessage /> -->
    <RichTextEditBoxVue @send="handleSendEvent" class="flex-shrink-0" />
  </div>
</template>

<style scoped></style>
