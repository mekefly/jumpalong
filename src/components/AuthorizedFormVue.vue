<script lang="ts" setup>
import { t } from "@/i18n";
import { nostrApi, relayConfigurator } from "@/nostr/nostr";
import {
  Nip04,
  NostrApi,
  NostrApiMode,
  setNostrApiMode,
} from "@/nostr/NostrApi";

import { injectWindowNostr } from "@/nostr/injectWindowNostr";
import { createEventTemplate } from "@/utils/nostr";
import AiddrLink from "./NaddrLink.vue";

const emit = defineEmits<{
  (e: "next"): void;
}>();

const isFloudNostr = computed(() => {
  return Boolean((window as any).nostr);
});

const recommendedList = ref([
  ["horse", "https://github.com/fiatjaf/horse"],
  ["nos2x", "https://github.com/fiatjaf/nos2x"],
  ["Alby", "https://getalby.com/"],
  ["Blockcore", "https://www.blockcore.net/wallet"],
  ["nos2x-fox", "https://diegogurpegui.com/nos2x-fox/"],
  ["Flamingo", "https://www.getflamingo.org/"],
]);

function handleNext() {
  setNostrApiMode(NostrApiMode.WindowNostr);
  injectWindowNostr();

  nostrApi.getPublicKey();
  setTimeout(() => {
    relayConfigurator.sync();
  });

  emit("next");
}
const isTest = ref(false);

const apiNameList = [
  "nostr",
  "getPublicKey",
  "getRelays",
  "signEvent",
  "nip04",
  "nip04.encrypt",
  "nip04.decrypt",
] as const;
type ApiListType = Array<(typeof apiNameList)[any]>;
const withNameApi = ref<ApiListType>([]);
const dialog = useDialog();
async function handelTest() {
  dialog.info({
    title: t("note"),
    content: t("authorized_form_test_note"),
    positiveText: t("yes"),
    onPositiveClick: testNostr,
  });
}
function testNostr() {
  isTest.value = true;
  withNameApi.value = [];

  const nostr = (window as any).nostr as Partial<NostrApi>;
  const _withNameApi: ApiListType = withNameApi.value;
  if (!nostr) return;

  _withNameApi.push("nostr");

  if (!nostr.getPublicKey) {
    return;
  }

  try {
    nostr.getPublicKey().then((pubkey) => {
      _withNameApi.push("getPublicKey");

      testNip04(nostr.nip04, _withNameApi, pubkey);
      testSignEvent(pubkey, _withNameApi, nostr);
    });
  } catch (error) {}

  if (nostr.getRelays) {
    try {
      nostr.getRelays().then(() => {
        _withNameApi.push("getRelays");
      });
    } catch (error) {}
  }
}
function testSignEvent(
  pubkey: string,
  _withNameApi: ApiListType,
  nostr: Partial<NostrApi>
) {
  if (nostr.signEvent) {
    try {
      nostr
        .signEvent(
          createEventTemplate({
            kind: 1,
            content: "33",
            pubkey,
          })
        )
        .then(() => {
          _withNameApi.push("signEvent");
        });
    } catch (error) {}
  }
}
async function testNip04(
  nip04: Partial<Nip04> | undefined,
  _withNameApi: ApiListType,
  pubkey: string
) {
  if (!nip04) return;
  try {
    _withNameApi.push("nip04");

    //加密
    if (!nip04.encrypt) {
      return;
    }
    const testText = "test";
    const plaintext = await nip04.encrypt(pubkey, testText);
    _withNameApi.push("nip04.encrypt");

    //解秘
    if (!nip04.decrypt) {
      return;
    }
    const text = await nip04.decrypt(pubkey, plaintext);

    if (text !== testText) {
      return;
    }
    _withNameApi.push("nip04.decrypt");
  } catch (error) {}
}
function open(url: string) {
  window.open(url);
}
</script>

<template>
  <n-space class="flex flex-col" vertical>
    <n-alert
      v-if="!isFloudNostr"
      class="mt-2"
      :title="t('note')"
      type="warning"
    >
      <p>
        {{ t("authorized_form_not_floud_nostr_tip") }}
      </p>

      <n-space>
        <n-button
          text
          v-for="[name, url] in recommendedList"
          @click="open(url)"
        >
          {{ name }}
        </n-button>
      </n-space>
    </n-alert>

    <n-alert class="mt-2" :title="t('note')" type="info">
      <AiddrLink :addr="t('help_article')">
        {{ t("help") }}
      </AiddrLink>
    </n-alert>

    <n-checkbox-group v-if="isTest" :value="withNameApi">
      <n-space>
        <n-checkbox
          v-for="apiName in apiNameList"
          :value="apiName"
          :label="apiName"
        />
      </n-space>
    </n-checkbox-group>

    <n-button
      @click="handelTest"
      :disabled="!isFloudNostr"
      class="w-full"
      :type="'primary'"
    >
      {{ t("test") }}
    </n-button>
    <slot name="prev-step"></slot>

    <n-button
      @click="handleNext"
      :disabled="!isFloudNostr"
      class="w-full"
      :type="'primary'"
    >
      {{ t("next_step") }}
    </n-button>
  </n-space>
</template>

<style scoped></style>
