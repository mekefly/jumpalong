<script lang="ts" setup>
import { useElementIntoScreen } from "@/utils/use";
import { NList } from "naive-ui";
import { getFollowerLineByPubkey } from "../api/Contact";
import ContactListItemVue from "./FollowItem.vue";
import { useLoad } from "./Refresh";
const props = defineProps<{
  pubkey: string;
  active?: boolean;
  urls?: Set<string>;
}>();
const { pubkey, active } = toRefs(props);

const flowerLine = computed(() => getFollowerLineByPubkey(pubkey.value));
const eventList = computed(() => {
  return flowerLine.value.getList();
});

useLoad(flowerLine, active);

const divRef = ref(undefined);
useElementIntoScreen(divRef, {
  active: toRef(props, "active"),
});
</script>

<template>
  <div ref="divRef" class="p-4 box-border">
    <n-list>
      <ContactListItemVue
        v-for="event of eventList"
        :key="event.pubkey"
        :pubkey="event.pubkey"
      />
    </n-list>
  </div>
</template>

<style scoped></style>
