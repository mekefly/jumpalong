<script lang="ts" setup>
import { NSpace } from "naive-ui";
import RelayConfigurator from "../components/RelayConfigurator.vue";
import RelayConnected from "../components/RelayConnected.vue";
import RelayOther from "../components/RelayOther.vue";
</script>

<template>
  <n-space vertical>
    <RelayConfigurator />
    <RelayConnected />
    <RelayOther />
  </n-space>
</template>

<style scoped></style>
