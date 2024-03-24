<script lang="ts" setup>
import { RelayConfiguratorSynchronizer } from '../nostr-runtime'
import { Event } from 'nostr-tools'
import DrawerVue from './Drawer.vue'
import { useEventLine } from './ProvideEventLine'
import ScrollbarVue from './Scrollbar.vue'

const props = defineProps<{ event: Event }>()
const event = toRef(props, 'event')
let l = useEventLine(RelayConfiguratorSynchronizer.Staff)
// const sourceUrls = computed(() => getSourceUrls(event.value.id));
const active = ref(false)

const router = useRouter()
function handleSave() {
  router.push({
    name: 'relays',
  })
}
</script>

<template>
  <div class="flex" @click="() => (active = !active)">
    <!-- <div
      v-for="url in sourceUrls"
      class="h-2 w-2 rounded-full mr-1"
      :style="{
        backgroundColor: getUrlColor(url),
      }"
    ></div> -->
  </div>
  <DrawerVue v-model:show="active" :height="'100%'" closable>
    <ScrollbarVue>
      <!-- <RelayConnectListVue :urls="sourceUrls ?? []" title="">
        <template #right="{ url }">
          <RelayAddButtonVue :url="url" />
        </template>
      </RelayConnectListVue> -->
    </ScrollbarVue>
    <template #header>
      <n-collapse-transition :show="l.relayConfigurator.hasChange()">
        <n-button @click="handleSave" type="primary">
          {{ t('save') }}
        </n-button>
      </n-collapse-transition>
    </template>
  </DrawerVue>
</template>

<style scoped></style>
