<script lang="ts" setup>
import { t } from "@/i18n";
import { getNostrApiMode, NostrApiMode } from "@/nostr/nostrApi/NostrApiMode";
import { useRecommendUser, useRecommendUserMetadata } from "@/state/nostr";
import { usePubkey } from "@/utils/nostrApiUse";
import { nip19 } from "nostr-tools";
import { nostrApi, relayConfigurator } from "../nostr/nostr";
import { renderIcon, useClipboardDialog } from "../utils/naiveUi";
import MoreIconVue from "./icon/MoreIcon.vue";
import PencilVue from "./icon/Pencil.vue";
import ShareSocialVue from "./icon/ShareSocial.vue";
import UserDataEditingVue from "./UserDataEditing.vue";

const props = defineProps<{
  pubkey: string;
}>();

const { pubkey } = toRefs(props);

const clipboard = useClipboardDialog();

const currentPubkey = usePubkey();
const isItMe = computed(() => pubkey.value === currentPubkey.value);
const showModal = ref(false);

const recommendUser = useRecommendUser();
const recommendUserMetadata = useRecommendUserMetadata();

const options = ref<any>(
  [
    isItMe.value && {
      label: t("edit_user_profile"),
      key: "editProfile",
      icon: renderIcon(PencilVue),
      props: {
        onclick() {
          showModal.value = !showModal.value;
        },
      },
    },
    {
      label: t("copy"),
      key: "clipboard",
      icon: renderIcon(ShareSocialVue),
      children: [
        {
          label: `${t("copy")} npub`,
          key: "copy-npub",
          props: {
            onclick() {
              const k = nip19.npubEncode(pubkey.value);
              clipboard(k);
            },
          },
        },
        {
          label: `${t("copy")} nprofile`,
          key: "copy-npro",
          props: {
            onclick() {
              const k = nip19.nprofileEncode({
                pubkey: pubkey.value,
                relays: [...relayConfigurator.getWriteList()],
              });
              clipboard(k);
            },
          },
        },
        isItMe.value &&
          getNostrApiMode() === NostrApiMode.PrivateKey &&
          (nostrApi as any)?.getPrivateKey &&
          typeof (nostrApi as any).getPrivateKey === "function" && {
            label: `${t("copy")} nsec`,
            key: "copy-nsec",
            props: {
              onclick() {
                const k = nip19.nsecEncode((nostrApi as any).getPrivateKey());
                clipboard(k);
              },
            },
          },
        {
          label: `${t("copy")} publicKey hex`,
          key: "copy-hex",
          props: {
            onclick() {
              clipboard(pubkey.value);
            },
          },
        },
      ].filter((v) => !!v),
    },
    {
      label: t("recommend_user"),
      key: "recommendUser",
      props: {
        onclick() {
          recommendUser(pubkey.value);
        },
      },
    },
    {
      label: t("recommend_metadata"),
      key: "recommendUserMetadata",
      props: {
        onclick() {
          recommendUserMetadata(pubkey.value);
        },
      },
    },
  ].filter((v) => !!v)
);
</script>

<template>
  <NDropdown placement="bottom-start" trigger="click" :options="options">
    <NButton circle type="info">
      <MoreIconVue />
    </NButton>
  </NDropdown>
  <n-modal v-model:show="showModal">
    <UserDataEditingVue @close="() => (showModal = false)" />
  </n-modal>
</template>

<style scoped></style>
