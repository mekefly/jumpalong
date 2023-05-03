<script lang="ts" setup>
import { useNostrContainerGet } from "@/components/NostrContainerProvade";
import { useRichTextEditBoxOpt } from "@/components/RichTextEditBox";
import RichTextEditBoxVue from "@/components/RichTextEditBox.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import { t } from "@/i18n";
import { TYPES } from "@/nostr/nostr";
import { useHandleSendMessage } from "@/utils/use";
import PostList from "../components/PostList.vue";

const logger = loggerScope;
logger.info();

const message = useMessage();

//需要为显示区域和编辑区域架设一个隧道
useRichTextEditBoxOpt("home");
const contactConfiguration = useNostrContainerGet(TYPES.ContactConfiguration);

const pubkeys = computed(() => {
  const pubkeys = Object.keys(contactConfiguration.getContactConfiguration());
  return pubkeys;
});
const handleSendEvent = useHandleSendMessage(1);
const value = ref("MyFeed");
</script>

<template>
  <div class="flex flex-col h-full overflow-auto">
    <ScrollbarVue class="flex-shrink flex-1 h-0" refreshable loadable>
      <n-tabs
        default-value="MyFeed"
        justify-content="space-evenly"
        type="line"
        animated
        v-model:value="value"
      >
        <n-tab-pane
          name="MyFeed"
          :tab="t('my_feed')"
          display-directive="show:lazy"
        >
          <PostList
            :active="value === 'MyFeed'"
            v-if="pubkeys.length > 0"
            :pubkeys="pubkeys"
          />
          <n-empty v-else :description="t(`You can't find anything`)">
            <template #extra>
              <n-button size="small">
                {{ t("did_not_follow_anyonew") }}
              </n-button>
            </template>
          </n-empty>
        </n-tab-pane>
        <n-tab-pane
          name="GlobalFeed"
          :tab="t('global')"
          display-directive="show:lazy"
        >
          <PostList
            :active="value === 'GlobalFeed'"
            :filters="[
              {
                kinds: [1],
              },
              {
                kinds: [30023],
              },
            ]"
          />
        </n-tab-pane>
      </n-tabs>
    </ScrollbarVue>
    <RichTextEditBoxVue @send="handleSendEvent" class="flex-shrink-1" />
  </div>
</template>

<style scoped></style>
