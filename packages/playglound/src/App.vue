<script setup lang="ts">
import {
  EventLineFactory,
  GlobalUrlsStaff,
  PoolStaff,
} from '@jumpalong/nostr-runtime'
import '@jumpalong/logger'

let l = new EventLineFactory().add(PoolStaff).add(GlobalUrlsStaff).out()
console.log('line', l)

console.log('l', l.fetchGlobalUrls())
</script>

<template></template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
