<script lang="ts" setup>
import { useRichTextEditBoxOpt } from "@/components/RichTextEditBox";
import RichTextEditBoxVue from "@/components/RichTextEditBox.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import { t } from "@/i18n";
import { useHandleSendMessage } from "@/utils/use";
import contactConfiguration from "../api/Contact";
import PostList from "../components/PostList.vue";

logger.for("home.vue").info("home.vue");

//需要为显示区域和编辑区域架设一个隧道
const v = useRichTextEditBoxOpt("home");
console.debug("HomeView:useRichTextEditBoxOpt", v.id);

const pubkeys = computed(() => {
  const pubkeys = Object.keys(
    contactConfiguration.getData().contactConfiguration
  );
  return pubkeys;
});
const handleSendEvent = useHandleSendMessage(1);
</script>

<template>
  <div class="flex flex-col h-full overflow-auto">
    <ScrollbarVue class="flex-shrink flex-1 h-0">
      <n-tabs
        default-value="MyFeed"
        justify-content="space-evenly"
        type="line"
        animated
      >
        <n-tab-pane
          name="MyFeed"
          :tab="t('my_feed')"
          display-directive="show:lazy"
        >
          <PostList v-if="pubkeys.length > 0" :pubkey="pubkeys" />
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
          <PostList />
        </n-tab-pane>
      </n-tabs>
    </ScrollbarVue>
    <RichTextEditBoxVue @send="handleSendEvent" class="flex-shrink-1" />
  </div>
</template>

<style scoped></style>
