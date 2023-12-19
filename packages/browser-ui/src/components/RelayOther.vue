<script lang="ts" setup>
import { t } from "@/i18n";
import { debounce } from "@/utils/utils";
import { relayConfigurator } from "../nostr/nostr";
import AccountTreeRoundVue from "./icon/AccountTreeRound.vue";
import RelayAddButtonVue from "./RelayAddButton.vue";
import RelayConnectListVue from "./RelayConnectListCard.vue";
import SyncButtonVue from "./SyncButton.vue";

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
      <RelayAddButtonVue class="mr-2" :url="url" />
      <SyncButtonVue :url="url" />
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
