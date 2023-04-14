<script lang="ts" setup>
import Copy16FilledVue from "@/components/icon/Copy16Filled.vue";
import FloatingCardVue from "@/components/LoginCard.vue";
import TooltipVue from "@/components/Tooltip.vue";
import { t } from "@/i18n";
import { usePrikey } from "@/utils/nostrApiUse";
import { useClipboardDialog } from "../utils/naiveUi";

const clipboard = useClipboardDialog();

const prikey = usePrikey();

function handleClipboard() {
  if (!prikey.value) return;
  clipboard(prikey.value);
}
const value = ref();
</script>

<template>
  <FloatingCardVue>
    <template #header>
      <slot></slot>
    </template>

    <n-space class="mt-6" vertical>
      <n-input
        v-if="prikey"
        placeholder=""
        v-model:value="prikey"
        type="password"
        show-password-on="click"
      >
        <template #suffix>
          <n-icon class="px-2" @click="handleClipboard">
            <Copy16FilledVue class="hover:text-[#2ed573]" />
          </n-icon>
        </template>
      </n-input>
      <n-alert class="mt-2" :title="t('note')" type="warning">
        {{ t("keep_private_key_prompt") }}
      </n-alert>
      <n-checkbox class="mt-2" v-model:checked="value">
        {{ t("i_have_saved_my_private_key_properly") }}
      </n-checkbox>

      <slot name="prev-step"></slot>
      <TooltipVue :jtooltip="t('tick_prompt')">
        <slot name="next-step" :disabled="!value"></slot>
      </TooltipVue>
    </n-space>
  </FloatingCardVue>
</template>

<style scoped></style>
