<script lang="ts" setup>
import { t } from "@/i18n";
import { useElementIntoScreen } from "../utils/use";
import { throttle } from "../utils/utils";

const emit = defineEmits<{
  (e: "autoloadMore"): void;
  (e: "loadMore"): void;
}>();

const target = ref<HTMLDivElement | null>(null);
const intoScreen = useElementIntoScreen(target);

watch(intoScreen, () => {
  if (intoScreen.value) {
    emit("autoloadMore");
  }
});
const dobu = throttle(() => emit("loadMore"));
function handleClick() {
  dobu();
}
</script>

<template>
  <div ref="target">
    <n-empty :description="t('loading')">
      <template #icon>
        <NSpin />
      </template>
      <template #extra>
        <n-button @click="handleClick" size="small">
          {{ t("load_more") }}
        </n-button>
      </template>
    </n-empty>
  </div>
</template>

<style scoped></style>
