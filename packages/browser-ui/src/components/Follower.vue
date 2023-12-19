<script lang="ts" setup>
import { TYPES } from "@/nostr/nostr";
import { useElementIntoScreen } from "@/utils/use";
import { NList } from "naive-ui";
import ContactListItemVue from "./FollowItem.vue";
import { useNostrContainerGet } from "./NostrContainerProvade";
import { useLoad } from "./Refresh";
const props = defineProps<{
  pubkey: string;
  active?: boolean;
  urls?: Set<string>;
}>();
const { pubkey, active } = toRefs(props);

const contactApi = useNostrContainerGet(TYPES.ContactApi);

const flowerLine = computed(() =>
  contactApi.getFollowerLineByPubkey(pubkey.value)
);
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
