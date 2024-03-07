<script lang="ts" setup>
import {
  InsertDropdownOptionOpt,
  provideSMSButtonState,
} from "./SMSButtonProvide";
const props = defineProps<{
  insertDropdownOptionList?: Array<InsertDropdownOptionOpt>;
}>();

const state = provideSMSButtonState();
watchEffect(() => {
  for (const insertDropdownOption of props.insertDropdownOptionList ?? []) {
    const v = state.insertDropdownOptionOptList.value.find(
      (value) => value.key === insertDropdownOption.key
    );
    if (v) continue;
    state.insertDropdownOption(insertDropdownOption);
  }
});
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>
