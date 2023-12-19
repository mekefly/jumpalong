<script lang="ts" setup>
import { RequestAuthorizationOption } from "@/api/NostrConnect";
import { t } from "@/i18n";
import { nostrApi, TYPES } from "@/nostr/nostr";
import { usePubkey } from "@/utils/nostrApiUse";
import Drawer from "./Drawer.vue";
import { useNostrContainerGet } from "./NostrContainerProvade";
import Papaw from "./Papaw.vue";
import PubkeyLink from "./PubkeyLink.vue";
import Scrollbar from "./Scrollbar.vue";

const pubkey = usePubkey();
const nostrConnect = useNostrContainerGet(TYPES.NostrConnect);

const line = computed(() => {
  if (pubkey.value) {
    return nostrConnect.createNostrConnectEventLine({ pubkey: pubkey.value });
  } else {
    return;
  }
});
const set = ref<Set<string>>(new Set());
const reqList = ref<RequestAuthorizationOption[]>([]);
const opt = ref<undefined | RequestAuthorizationOption>();
watchEffect(() => {
  line.value?.feat.onRequestAuthorization((_opt) => {
    const id = (_opt.requistOpt as any).id;
    if (set.value.has(id)) return;
    set.value.add((_opt.requistOpt as any).id);
    reqList.value.push(_opt);
  });
});
const show = ref(false);
watchEffect(() => {
  const length = reqList.value.length;

  if (opt.value || length > 0) {
    opt.value ?? (opt.value = reqList.value.pop());
    show.value = true;
  } else {
    show.value = false;
  }
});
const duration = ref<undefined | number>();
function handleAllow() {
  opt.value?.allow(duration.value);
  opt.value = undefined;
}
function handleCancellation() {
  const _opt = opt.value;
  if (_opt) {
    opt.value?.refuse(duration.value);
    opt.value = undefined;
  }
}

function getDecryptValue(pubkey: string, ciphertext: string) {
  return asyncComputed(
    async () => await nostrApi.nip04.decrypt(pubkey, ciphertext)
  );
}
</script>

<template>
  <Drawer :show="show" :placement="'top'" :height="400" closable>
    <template #header>
      {{ opt && t(opt?.requistOpt.method) }}
      <span v-if="reqList.length > 0"> ({{ reqList.length }}) </span>
    </template>
    <template #default>
      <Scrollbar>
        <span v-if="opt">{{ opt.event.pubkey.slice(0, 10) }}</span>
        <div v-if="opt?.requistOpt.method === 'describe'">
          {{ t("want_to_obtain_descriptive_information") }}
        </div>

        <div v-if="opt?.requistOpt.method === 'connect'">
          {{ t("want_to_establish_a_connection_with_you") }}
        </div>

        <div v-if="opt?.requistOpt.method === 'get_relays'">
          {{ t("want_to_obtain_your_relays") }}
        </div>

        <div v-if="opt?.requistOpt.method === 'get_public_key'">
          {{ t("want_to_obtain_your_public_key") }}
        </div>

        <div v-if="opt?.requistOpt.method === 'nip04_encrypt'">
          {{ t("want_to_encrypt_the_following_content") }}

          <p>
            {{ t("send_to") }}<PubkeyLink :pubkey="opt.requistOpt.params[0]" />
          </p>
          <p>{{ opt.requistOpt.params[1] }}</p>
        </div>
        <div v-if="opt?.requistOpt.method === 'nip04_decrypt'">
          {{ t("want_to_decrypt_the_following_content") }}

          <p>
            {{ t("sender") }}<PubkeyLink :pubkey="opt.requistOpt.params[0]" />
          </p>
          <p>{{ getDecryptValue(...opt.requistOpt.params) }}</p>
        </div>

        <div v-if="opt?.requistOpt.method === 'sign_event'">
          {{ t("want_to_sign_the_following_event") }}
          <Papaw :event="(opt.requistOpt.params[0] as any)"></Papaw>
        </div>

        <p class="mt-4">
          {{ t("not_asking_anymore") }}
        </p>
        <n-radio-group v-model:value="duration" name="radiogroup">
          <n-space>
            <n-radio
              v-for="item in [
                [15 * 60 * 1000, `15${t('minutes')}`],
                [24 * 3600 * 1000, `1${t('day')}`],
                [7 * 24 * 3600 * 1000, `7${t('day')}`],
                [30 * 24 * 3600 * 1000, `30${t('day')}`],
              ]"
              :key="item[0]"
              :value="item[0]"
            >
              {{ item[1] }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </Scrollbar>
    </template>
    <template #footer>
      <div class="flex w-full">
        <NSpace class="w-full" vertical>
          <n-space class="">
            <n-button @click="handleAllow">{{ t("allow") }} </n-button>
            <n-button @click="handleCancellation">{{ t("refuse") }}</n-button>
          </n-space>
        </NSpace>
      </div>
    </template>
  </Drawer>

  <slot></slot>
</template>

<style scoped></style>
