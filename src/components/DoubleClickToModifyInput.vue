<script lang="ts" setup>
import { t } from "@/i18n";

const props = defineProps<{ value: string }>();
const emit = defineEmits<{
  (e: "updateValue", v: string): void;
  (e: "update:value", v: string): void;
}>();
const readonly = ref(true);
const inputRef = ref<HTMLDivElement | null>(null);

function handleDblclick() {
  readonly.value = false;
  setTimeout(() => {
    inputRef.value?.focus();
  }, 10);
}
</script>

<template>
  <div class="w-full flex h-full" @dblclick="handleDblclick">
    <div class="w-full flex h-full" v-if="readonly">
      <span
        v-if="props.value === '' || props.value === undefined"
        class="opacity-0"
      >
        {{ t("empty_text") }}
      </span>
      <span v-else>{{ props.value }}</span>
    </div>
    <NInput
      ref="inputRef"
      autofocus
      :value="props.value"
      @updateValue="
        (x) => {
          emit('update:value', x);
          emit('updateValue', x);
        }
      "
      v-else
      @blur="() => (readonly = true)"
    >
    </NInput>
  </div>
</template>

<style scoped></style>
