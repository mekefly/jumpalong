<script lang="ts" setup>
import { debounce } from '@jumpalong/shared'
import AccountTreeRoundVue from './icon/AccountTreeRound.vue'
import RelayAddButtonVue from './RelayAddButton.vue'
import RelayConnectListVue from './RelayConnectListCard.vue'
import SyncButtonVue from './SyncButton.vue'
import { useEventLine } from './ProvideEventLine'
import {
  GlobalDiscoveryUserStaff,
  GlobalUrlsStaff,
  LoginStaff,
} from '@jumpalong/nostr-runtime'
import MdSearch from './icon/MdSearch.vue'
import { asyncWitchComputed, useAsyncData } from '../utils/use'

let globalUrlsLine = reactive(useEventLine(GlobalUrlsStaff))
let GlobalDiscoveryUserLine = useEventLine(GlobalDiscoveryUserStaff)
let loginLine = useEventLine(LoginStaff)

globalUrlsLine.fetchGlobalUrls()
const searchValue = ref('')
const otherList = ref<string[]>([])

const pubkey = useAsyncData(() => loginLine.getPubkeyOrNull())
// let flag = useUpdateFlag()

const list = asyncWitchComputed([pubkey], async ([pubkey]) => {
  if (!pubkey) {
    return
  }
  return [
    ...(pubkey
      ? await GlobalDiscoveryUserLine.autoGlobalDiscoveryUserByPubkey(
          pubkey,
          9999999
        )
      : await GlobalDiscoveryUserLine.autoGetGlobalUrls()),
  ]
})

// setInterval(() => {
//   flag.refreshWithDep(GlobalDiscoveryUserLine.getGlobalUrls().size)
// }, 1000)
function filterOtherList() {
  if (!list.value) return
  if (searchValue.value === '') {
    otherList.value = list.value
    return
  }
  otherList.value = Array.from(list.value).filter(item =>
    item.includes(searchValue.value)
  )
}
filterOtherList()
const filterOtherListDebounce = debounce(filterOtherList, 1000)

watch([searchValue, list], filterOtherListDebounce, { deep: true })
</script>

<template>
  <RelayConnectListVue :urls="otherList" :title="t('more')">
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
