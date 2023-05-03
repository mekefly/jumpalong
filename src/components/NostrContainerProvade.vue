<script lang="ts" setup>
import { initializeRuntime } from "@/nostr/nostrRuntime";
import { provideNostrContainer } from "./NostrContainerProvade";

const nostr = initializeRuntime();
(window as any).nostrApi = nostr;

provideNostrContainer(nostr.nostrContainer);
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>
