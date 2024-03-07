<script lang="ts" setup>
import { useBlackData, useBlacklistState } from "./ContentBlacklistView";
const { checkedRowKeys, columns } = useBlacklistState();
const { blackData } = useBlackData();
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="blackData"
    :pagination="false"
    :bordered="false"
    v-model:checked-row-keys="checkedRowKeys"
  />
</template>

<style scoped></style>
