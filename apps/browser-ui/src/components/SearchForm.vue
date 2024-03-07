<script lang="ts" setup>
import { t } from "@/i18n";
import { useDelayedLoading } from "@/utils/use";
import { setAdds } from "@/utils/utils";
import { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";
import EllipsisVue from "./Ellipsis.vue";
import MdSearchVue from "./icon/MdSearch.vue";
import { usePageViewTeleport } from "./SearchForm";

const router = useRouter();
const route = useRoute();

const searchValue = ref("");

const history = useLocalStorage<string[]>("search-history", []);
const dropdownMixedOption = computed<DropdownMixedOption[]>(() => {
  const dropdownMixedOption: DropdownMixedOption[] = [];
  for (const item of history.value) {
    dropdownMixedOption.push({
      label: () =>
        h(
          EllipsisVue,
          {
            class: "flex-shrink flex w-sm max-w-screen",
            style: {
              width: `min-content`,
              maxWidth: "100vw",
            },
          },
          { default: () => item }
        ),
      value: item,
      key: item,
    });
  }

  return dropdownMixedOption;
});
function pushToSearch() {
  router.push({
    name: "search",
  });
}
function handelSearch(e: Event) {
  e?.preventDefault();
  search();
}
function search() {
  show.value = false;
  const searchV = searchValue.value.trim();

  if (!searchV) {
    pushToSearch();
    return;
  }
  const set = new Set<string>();
  set.add(searchV);
  setAdds(set, history.value);
  history.value = [...set].slice(0, 10);

  router.push({
    name: "search",
    params: {
      value: searchV,
    },
  });
}
const show = ref(false);

const delayedLoadingTeleport = useDelayedLoading();

const { isView: isSearchView, teleportTo } = usePageViewTeleport(
  "search",
  "#search-input-default",
  "#search-input"
);

function hanedleSelect(value: string) {
  show.value = false;
  searchValue.value = value;
  search();
}
</script>

<template>
  <div id="search-input-default"></div>
  <Teleport v-if="delayedLoadingTeleport" :to="teleportTo">
    <div
      class="flex-shrink flex-1"
      :class="{
        'hidden md:block': !isSearchView,
      }"
    >
      <n-dropdown
        :show="show"
        @clickoutside="() => (show = false)"
        :options="dropdownMixedOption"
        @select="hanedleSelect"
      >
        <n-input
          clearable
          round
          @keyup.enter="search"
          v-model:value="searchValue"
          @focus="() => (show = true)"
          @click="() => (show = true)"
          :placeholder="t('search')"
        >
          <template #suffix>
            <NButton
              class="ml-1"
              size="tiny"
              quaternary
              circle
              @click.stop="handelSearch"
            >
              <template #icon>
                <n-icon>
                  <MdSearchVue />
                </n-icon>
              </template>
            </NButton>
          </template>
        </n-input>
      </n-dropdown>
    </div>
  </Teleport>
  <div v-if="!isSearchView" class="md:hidden">
    <NButton quaternary circle @click="pushToSearch">
      <template #icon>
        <n-icon>
          <MdSearchVue />
        </n-icon>
      </template>
    </NButton>
  </div>
</template>

<style scoped></style>
