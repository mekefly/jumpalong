<script lang="ts" setup>
import Scrollbar from 'naive-ui/es/scrollbar/src/Scrollbar'
import RelayConfigurator from '../components/RelayConfigurator.vue'
import RelayConnected from '../components/RelayConnected.vue'
import RelayOther from '../components/RelayOther.vue'
import MustLogin from './MustLogin.vue'
</script>

<template>
  <!-- <MustLogin> -->
  <Scrollbar class="h-full w-full">
    <div>
      <RelayConfigurator />
    </div>
    <div class="mt-2">
      <RelayConnected />
    </div>
    <div class="mt-2">
      <RelayOther />
    </div>
  </Scrollbar>
  <!-- </MustLogin> -->
</template>

<style scoped></style>
