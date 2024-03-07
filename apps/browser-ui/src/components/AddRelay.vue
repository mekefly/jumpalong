<script lang="ts" setup>
import { t } from "@/i18n";
import { relayConfigurator } from "@/nostr/nostr";
import AddButtonVue from "./AddButton.vue";
import DrawerVue from "./Drawer.vue";
import RelayConnectListVue from "./RelayConnectList.vue";
import ScrollbarVue from "./Scrollbar.vue";

const props = defineProps<{
  show?: boolean;
  disabledList?: Set<string>;
}>();

const emit = defineEmits<{
  (e: "add-relay", url: string): void;
  (e: "update:show", v: boolean): void;
}>();
const otherList = computed(() => relayConfigurator.getOtherList());
const inputUrl = ref("");
</script>

<template>
  <DrawerVue
    :show="show"
    @update:show="(v) => emit('update:show', v)"
    closable
    height="100%"
    :title="t('add_relay')"
  >
    <ScrollbarVue>
      <n-thing class="my-2">
        <template #header>
          <n-input
            v-model:value="inputUrl"
            placeholder="eg: wss://relay.com"
            size="small"
          >
          </n-input>
        </template>
        <template #header-extra>
          <AddButtonVue
            @click="() => emit('add-relay', inputUrl)"
            :disabled="disabledList && disabledList.has(inputUrl)"
          ></AddButtonVue>
        </template>
      </n-thing>
      <RelayConnectListVue :urls="otherList" loadable>
        <template #right="{ url }">
          <AddButtonVue
            @click="() => emit('add-relay', url)"
            :disabled="disabledList && disabledList.has(url)"
          ></AddButtonVue>
        </template>
      </RelayConnectListVue>
    </ScrollbarVue>
  </DrawerVue>
</template>

<style scoped></style>
