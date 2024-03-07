<script lang="ts" setup>
import { useEmojiClassificationTable, useJsonDataList } from "./EmojiBox";
import EmojiBoxItemVue from "./EmojiBoxItem.vue";
import ScrollbarVue from "./Scrollbar.vue";
const props = defineProps<{ show: boolean }>();
const { show } = toRefs(props);
const emit = defineEmits<{
  (e: "click", emoji: string): void;
}>();

const searchValue = ref("");

const { data, isLoading } = useJsonDataList();
const { emojiClassificationTable: map } = useEmojiClassificationTable(
  data,
  searchValue
);

const mapKeys = computed(() => Object.keys(map.value));

function handelClick(emoji: string) {
  emit("click", emoji);
}
</script>

<template>
  <n-collapse-transition :show="show">
    <div class="flex flex-col w-full h-96 max-h-full overflow-hidden relative">
      <n-tabs default-value="Emoji" class="flex w-full h-full">
        <n-tab-pane
          class="flex-shrink flex-1 h-0 flex flex-col"
          name="Emoji"
          tab="Emoji"
        >
          <n-spin class="w-full h-full" v-if="isLoading"> </n-spin>
          <div class="py-4 flex-shrink-0">
            <n-input
              class="flex-shrink-0"
              size="large"
              round
              placeholder="Search"
              v-model:value="searchValue"
            />
          </div>

          <div
            v-if="mapKeys.length === 0"
            class="flex-shrink flex-1 w-full h-0 flex justify-center items-center"
          >
            <n-result
              status="418"
              title="什么都没找到"
              description="这是一个悲剧"
            >
            </n-result>
          </div>
          <n-card
            v-else
            class="flex-shrink flex-1 w-full h-0 flex"
            :contentStyle="{
              height: '100%',
              width: '100%',
            }"
          >
            <ScrollbarVue class="w-full h-full">
              <EmojiBoxItemVue
                @click="handelClick"
                v-for="key in mapKeys"
                :key="key"
                :type="key"
                :emojiList="map[key]"
              />
            </ScrollbarVue>
          </n-card>
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-collapse-transition>
</template>

<style scoped></style>
