<script lang="ts" setup>
import { defaultCacheOptions } from "@/utils/cache";
import { setAdds } from "@/utils/utils";
import { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface";
import MdSearchVue from "./icon/MdSearch.vue";

const router = useRouter();
const searchValue = ref("");

const cacheOption = {
  ...defaultCacheOptions,
};
const history = useLocalStorage<string[]>("search-history", []);
const dropdownMixedOption = computed<DropdownMixedOption[]>(() => {
  const dropdownMixedOption: DropdownMixedOption[] = [];
  for (const item of history.value) {
    dropdownMixedOption.push({
      label: item,
      value: item,
    });
  }

  return dropdownMixedOption;
});
const message = useMessage();
function search() {
  const searchV = searchValue.value.trim();
  if (!searchV) {
    message.info("请输入一些内容再搜索吧！");
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
</script>

<template>
  <div class="flex-shrink flex-1 max-w-xs">
    <n-select
      class="w-full"
      v-model:value="searchValue"
      v-model:show="show"
      @keyup.enter="search"
      placeholder="Search"
      filterable
      tag
      :options="dropdownMixedOption"
    >
      <template #arrow>
        <div class="h-full w-full flex justify-center items-center">
          <NButton
            class="absolute"
            size="tiny"
            quaternary
            circle
            @click="search"
          >
            <template #icon>
              <n-icon>
                <MdSearchVue />
              </n-icon>
            </template>
          </NButton>
        </div>
      </template>
    </n-select>
  </div>
</template>

<style scoped></style>
