<script lang="ts" setup>
import { Event } from "nostr-tools";
import DislikeFilledVue from "./icon/DislikeFilled.vue";
import DislikeOutlinedVue from "./icon/DislikeOutlined.vue";
import LikeFilledVue from "./icon/LikeFilled.vue";
import LikeOutlinedVue from "./icon/LikeOutlined.vue";

defineProps<{
  reaction: string;
  events: Event[];
  active: boolean;
  size: number;
}>();
defineEmits<{
  (e: "handelSwitchActive", reaction: string): void;
}>();
</script>

<template>
  <n-tag
    round
    :checked="active"
    @updateChecked="() => $emit('handelSwitchActive', reaction)"
    checkable
  >
    <span>{{ active ? events.length + 1 : events.length }}</span>
    <template #icon>
      <n-icon
        v-if="reaction === '+' || reaction === '-'"
        :size="size"
        :color="active ? '#fffff' : undefined"
      >
        <div v-if="reaction === '+'">
          <LikeFilledVue v-if="active" />
          <LikeOutlinedVue v-else />
        </div>
        <div v-else-if="reaction === '-'">
          <DislikeFilledVue v-if="active" />
          <DislikeOutlinedVue v-else />
        </div>
      </n-icon>

      <span
        v-else
        :style="{
          fontSize: `${size * 0.9}px`,
        }"
      >
        {{ reaction }}
      </span>
    </template>
  </n-tag>
</template>

<style scoped></style>
