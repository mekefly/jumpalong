<script lang="ts" setup>
// import { useNostrContainerAsyncGet } from '@/components/NostrContainerProvade'
// import { useRichTextEditBoxOpt } from '@/components/RichTextEditBox'
// import RichTextEditBoxVue from '@/components/RichTextEditBox.vue'
// import ScrollbarVue from '@/components/Scrollbar.vue'
import PostList from '../components/PostList.vue'
import {
  useEventLine,
  useGlobalUrl,
  useIsLogin,
} from '../components/ProvideEventLine'
import ProvideEventLine from '../components/ProvideEventLine.vue'
import RichTextEditBox from '../components/RichTextEditBox.vue'
import Scrollbar from '../components/Scrollbar.vue'
import { t } from '../i18n'
import { GlobalUrlsStaff, Synchronizer } from '@jumpalong/nostr'
// import { TYPES } from '@/nostr/nostr'
import { useHandleSendMessage } from '../utils/use'
import { useRichTextEditBoxOpt } from '../components/RichTextEditBox'
import MustLogin from '../components/MustLogin.vue'
// import PostList from '../components/PostList.vue'
let line = useEventLine(
  Synchronizer.ContactConfigurationSynchronizer.Staff,
  GlobalUrlsStaff
)

$LoggerScope('disabled')
logger.info('homeView', logger)
// let xx = useEventLine(RelayConfiguratorSynchronizerStaff)
// console.log(xx.relayConfigurator)

//需要为显示区域和编辑区域架设一个隧道
useRichTextEditBoxOpt('home')

const pubkeys = computed(() => {
  const pubkeys = Object.keys(
    line.contactConfiguration.getContactConfiguration()
  )
  return pubkeys
})
const handleSendEvent = useHandleSendMessage(1)
const value = ref('GlobalFeed')
let isLogin = useIsLogin()
let globalUrl = useGlobalUrl()
let notLoginUrls = computed(() => {
  return !isLogin.value && globalUrl.value
    ? new Set([...globalUrl.value].slice(0, 10))
    : undefined
})
</script>

<template>
  <div class="flex flex-col h-full overflow-auto">
    <Scrollbar class="flex-shrink flex-1 h-0" refreshable loadable>
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
          <MustLogin>
            <ProvideEventLine name="MyFeed" :active="value === 'MyFeed'">
              <PostList
                :active="value === 'MyFeed'"
                v-if="pubkeys.length > 0"
                :pubkeys="pubkeys"
              />
              <n-empty v-else :description="t(`You can't find anything`)">
                <template #extra>
                  <n-button size="small">
                    {{ t('did_not_follow_anyonew') }}
                  </n-button>
                </template>
              </n-empty>
            </ProvideEventLine>
          </MustLogin>
        </n-tab-pane>
        <n-tab-pane
          name="GlobalFeed"
          :tab="t('global')"
          display-directive="show:lazy"
        >
          <ProvideEventLine name="GlobalFeed" :active="value === 'GlobalFeed'">
            <PostList
              v-if="isLogin"
              :active="value === 'GlobalFeed'"
              :filters="[
                {
                  kinds: [1, 30023],
                  limit: 1,
                },
              ]"
            />
            <PostList
              v-else-if="notLoginUrls"
              :urls="notLoginUrls"
              :active="value === 'GlobalFeed'"
              :filters="[
                {
                  kinds: [1, 30023],
                  limit: 1,
                },
              ]"
            />
          </ProvideEventLine>
        </n-tab-pane>
      </n-tabs>
    </Scrollbar>
    <RichTextEditBox @send="handleSendEvent" class="flex-shrink-1" />
  </div>
</template>

<style scoped></style>
