<script lang="ts" setup>
import {
  CategorizedBookmarksSynchronizerDataType,
  getCategorizedBookmarksSynchronizer,
} from "@/nostr/Synchronizer/CategorizedBookmarksSynchronizer";
import { Event } from "nostr-tools";

const props = defineProps<{
  event: Event;
  data: CategorizedBookmarksSynchronizerDataType;
  collect: Set<string>;
  uncollect: Set<string>;
}>();
const { collect, uncollect, data } = toRefs(props);

const collectSynchronizer = getCategorizedBookmarksSynchronizer();

const isCollect = computed(
  () => !!props.event && collectSynchronizer.hasByData(props.event, props.data)
);

function handleUpdate() {
  if (checked.value) {
    uncollect.value.add(data.value.name);
    collect.value.delete(data.value.name);
  } else {
    collect.value.add(data.value.name);
    uncollect.value.delete(data.value.name);
  }
}
const checked = computed(() => {
  if (collect.value.has(data.value.name)) {
    return true;
  } else if (uncollect.value.has(data.value.name)) {
    return false;
  } else {
    return isCollect.value;
  }
});
</script>

<template>
  <n-list-item>
    <span>
      {{ `${data.name}(${data.size})` }}
    </span>

    <template #suffix>
      <n-space>
        <n-checkbox
          :checked="checked"
          @update:checked="handleUpdate"
        ></n-checkbox>
      </n-space>
    </template>
  </n-list-item>
</template>

<style scoped></style>
