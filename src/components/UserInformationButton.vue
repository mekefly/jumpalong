<script lang="ts" setup>
import { nip19 } from "nostr-tools";
import { relayConfigurator } from "../api/relays";
import { userKey } from "../api/user";
import { renderIcon, useClipboard } from "../utils/naiveUi";
import PencilVue from "./icon/Pencil.vue";
import ShareSocialVue from "./icon/ShareSocial.vue";

const { pubkey } = defineProps<{
  pubkey: string;
}>();

const clipboard = useClipboard();

const isItMe = computed(() => pubkey === userKey.value.publicKey);
const showModal = ref(false);

const options = ref<any>(
  [
    isItMe.value && {
      label: "编辑用户资料",
      key: "editProfile",
      icon: renderIcon(PencilVue),
      props: {
        onclick() {
          showModal.value = !showModal.value;
        },
      },
    },
    {
      label: "复制",
      key: "clipboard",
      icon: renderIcon(ShareSocialVue),
      children: [
        {
          label: "复制npub",
          key: "copy-npub",
          props: {
            onclick() {
              const k = nip19.npubEncode(userKey.value.publicKey);
              clipboard(k);
            },
          },
        },
        {
          label: "复制nprofile",
          key: "copy-npro",
          props: {
            onclick() {
              const k = nip19.nprofileEncode({
                pubkey: userKey.value.publicKey,
                relays: [...relayConfigurator.getWriteList()],
              });
              clipboard(k);
            },
          },
        },
        isItMe.value && {
          label: "复制私钥",
          key: "copy-nsec",
          props: {
            onclick() {
              const k = nip19.nsecEncode(userKey.value.privateKey);
              clipboard(k);
            },
          },
        },
        {
          label: "复制publicKey hex",
          key: "copy-hex",
          props: {
            onclick() {
              clipboard(userKey.value.publicKey);
            },
          },
        },
      ].filter((v) => !!v),
    },
  ].filter((v) => !!v)
);
</script>

<template>
  <NDropdown placement="bottom-start" trigger="click" :options="options">
    <NButton tertiary circle>
      <MoreIcon />
    </NButton>
  </NDropdown>
  <n-modal v-model:show="showModal">
    <UserDataEditing @close="() => (showModal = false)" />
  </n-modal>
</template>

<style scoped></style>
