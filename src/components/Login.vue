<script lang="ts" setup>
import { PRIVATE_KEY } from "@/api/login";
import { t } from "@/i18n";
import { NostrApiMode, setNostrApiMode } from "@/nostr/NostrApi";
import { ReplaceableEventSyncAbstract } from "@/nostr/ReplaceableEventSyncAbstract";
import SynchronizerAbstract from "@/nostr/Synchronizer/SynchronizerAbstract";
import { useCacheStorage } from "@/utils/use";
import AuthorizedFormVue from "./AuthorizedFormVue.vue";
import LoginFormVue from "./LoginForm.vue";
import NostrConnectForm from "./NostrConnectForm.vue";
import RegistrationFormVue from "./RegistrationForm.vue";

const emit = defineEmits<{
  (e: "next"): void;
}>();

const activeName = useCacheStorage("__login-active-name", "signin");
function handleBeforeNext() {
  localStorage.removeItem(PRIVATE_KEY);
  setNostrApiMode(NostrApiMode.NotLogin);

  ReplaceableEventSyncAbstract.clearAll();
  SynchronizerAbstract.syncAll();
}
function handleNext() {
  emit("next");
}
</script>

<template>
  <div class="px-2 box-border">
    <n-tabs
      v-model:value="activeName"
      default-value="signin"
      size="large"
      animated
      style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin" :tab="t('login')" display-directive="show:lazy">
        <LoginFormVue @next="handleNext" @beforeNext="handleBeforeNext">
          <template #prev-step>
            <slot name="prev-step"></slot>
          </template>
        </LoginFormVue>
      </n-tab-pane>
      <n-tab-pane name="signup" :tab="t('logon')" display-directive="show:lazy">
        <RegistrationFormVue @next="handleNext" @beforeNext="handleBeforeNext">
          <template #prev-step>
            <slot name="prev-step"></slot>
          </template>
        </RegistrationFormVue>
      </n-tab-pane>

      <n-tab-pane
        name="authorized"
        :tab="t('authorized')"
        display-directive="show:lazy"
      >
        <AuthorizedFormVue @next="handleNext" @beforeNext="handleBeforeNext">
          <template #prev-step>
            <slot name="prev-step"></slot>
          </template>
        </AuthorizedFormVue>
      </n-tab-pane>

      <n-tab-pane
        name="nostr_connect"
        :tab="t('nostr_connect')"
        display-directive="show:lazy"
      >
        <NostrConnectForm @next="handleNext" @beforeNext="handleBeforeNext">
          <template #prev-step>
            <slot name="prev-step"></slot>
          </template>
        </NostrConnectForm>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped></style>
