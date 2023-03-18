<script lang="ts" setup>
import { getUserMetadataLineByPubkey } from "@/api/user";
import { toDeCodeNprofile } from "@/utils/nostr";

const props = defineProps<{
  value: string;
}>();
const { value } = toRefs(props);

const profilePointer = computed(() => toDeCodeNprofile(value.value));
const line = computed(() => {
  if (!profilePointer.value) return;

  return getUserMetadataLineByPubkey(
    profilePointer.value.pubkey,
    new Set(profilePointer.value.relays)
  );
});
const metadata = computed(() => line.value?.feat.useMetadata());
const name = computed(() => {
  if (!metadata.value) return value.value.slice(0, 10);
  for (const key of ["name", "display_name", "displayName", "username"]) {
    const n = (metadata.value as any)[key];
    if (n?.length ?? 0 > 0) {
      return n;
    }
  }
  return value.value.slice(0, 10);
});
</script>

<template>
  <RouterLink :to="{ name: 'profile', params: { value: value } }">
    <span> @{{ name ?? value.slice(0, 10) }} </span>
  </RouterLink>
</template>

<style scoped></style>
