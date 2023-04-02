<script lang="ts" setup>
import { provideDrawerState } from "./Drawer";

const { id } = provideDrawerState();
</script>

<template>
  <slot :id="id"> </slot>
</template>

<style scoped></style>
