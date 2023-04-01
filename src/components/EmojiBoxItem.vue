<script lang="ts" setup>
import { useLazyShow } from "@/utils/use";
import { Emoji } from "./EmojiBox";

const props = defineProps<{ type: string; emojiList: Emoji[] }>();
const { type, emojiList } = toRefs(props);

const [target, isShow] = useLazyShow(10);
const emit = defineEmits<{
  (e: "click", emoji: string): void;
}>();
</script>

<template>
  <div ref="target" class="target">
    <n-divider> {{ type }} </n-divider>
    <n-spin v-if="!isShow" class="w-full h-52"> </n-spin>
    <n-space v-else>
      <n-button
        quaternary
        @click="() => emit('click', emoji.emoji)"
        v-for="(emoji, index) in emojiList"
        :data-type="type"
        :data-index="index"
        :data-emoji="emoji.emoji"
      >
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="text-xl">
              {{ emoji.emoji }}
            </span>
          </template>
          {{ emoji.name }}
        </n-tooltip>
      </n-button>
    </n-space>
  </div>
</template>

<style scoped></style>
