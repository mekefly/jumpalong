<script lang="ts" setup>
import { t } from "@/i18n";
import { debounce } from "@/utils/utils";
import { NSpace } from "naive-ui";
import { relayConfigurator } from "../nostr/nostr";
import AddButton from "./AddButton.vue";
import AccountTreeRoundVue from "./icon/AccountTreeRound.vue";
import SyncAltVue from "./icon/SyncAlt.vue";
import RelayConnectListVue from "./RelayConnectList.vue";

const searchValue = ref("");
const otherList = ref<string[]>([]);
const list = computed(() => relayConfigurator.getOtherList());
function filterOtherList() {
  if (searchValue.value === "") {
    otherList.value = Array.from(list.value);
    return;
  }
  otherList.value = Array.from(list.value).filter((item) =>
    item.includes(searchValue.value)
  );
}
filterOtherList();
const filterOtherListDebounce = debounce(filterOtherList, 1000);

watch([searchValue, list], filterOtherListDebounce, { deep: true });

const message = useMessage();
</script>

<template>
  <RelayConnectListVue loadable :urls="otherList" :title="t('more')">
    <template #header-extra>
      <div class="flex items-center justify-center flex-shrink flex-grow">
        <div class="flex-shrink-0 flex justify-center items-center">
          <n-icon class="mr-1">
            <AccountTreeRoundVue />
          </n-icon>
          <span>
            {{ otherList.length }}
          </span>
        </div>
        <div class="flex-shrink ml-2 flex-grow w-32 sm:w-auto">
          <n-input
            round
            :placeholder="t('search')"
            v-model:value="searchValue"
            @keyup.enter="filterOtherList"
            @change="filterOtherList"
          >
            <template #suffix>
              <n-icon>
                <MdSearch />
              </n-icon>
            </template>
          </n-input>
        </div>
      </div>
    </template>

    <template #right="{ url }">
      <n-space justify="end" align="center">
        <AddButton
          :disabled="
            relayConfigurator.hasReadByUrl(url) ||
            relayConfigurator.hasWriteByUrl(url)
          "
          @click="() => relayConfigurator.addWriteRead(url)"
        />
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              text
              @click="
                () => {
                  relayConfigurator.sync({
                    onlyUrl: url,
                    onEvent(e, url) {
                      message.success(`已从${url}获取到了您的配置`, {
                        duration: 60_000,
                        closable: true,
                      });
                    },
                    onPush() {
                      message.success(`该中继不存在您的配置，已发布到${url}`);
                    },
                  });
                  message.info(`已发起请求${url}同步`);
                }
              "
            >
              <n-icon>
                <SyncAltVue />
              </n-icon>
            </n-button>
          </template>
          从此中继同步relay信息
        </n-tooltip>
      </n-space>
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
