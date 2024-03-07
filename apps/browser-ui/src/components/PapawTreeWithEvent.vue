<script lang="ts" setup>
import { providePapawTreeState, usePapawTreeState } from "./PapawTreeWithEvent";
const props = defineProps<{
  id: string;
}>();
const { id } = toRefs(props);

const show = ref(false);
const parentState = usePapawTreeState();

if (!parentState) {
  providePapawTreeState(ref(new Set<string>().add(id.value)));
  show.value = true;
} else {
  show.value = !parentState.withEventSet.value.has(id.value);
}
if (show.value) {
  parentState?.withEventSet.value.add(id.value);
}
</script>

<template>
  <slot v-if="show"></slot>
  <slot name="else"></slot>
</template>

<style scoped></style>
