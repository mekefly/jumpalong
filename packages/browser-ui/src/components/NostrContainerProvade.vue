<script lang="ts" setup>
import { createNostrContainer } from "@/nostr/nostrRuntime";
import { provideNostrContainer } from "./NostrContainerProvade";

const nostr = createNostrContainer();
(window as any).nostrApi = nostr;

provideNostrContainer(nostr);
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>
