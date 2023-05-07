<script lang="ts" setup>
import PubkeyLinkVue from "@/components/PubkeyLink.vue";
import { t } from "@/i18n";
import { TreeOption } from "naive-ui";
import { useCache } from "../utils/cache";
import { RelayMetaData, useAllNips } from "./RelayInfoView";

const { error } = useMessage();
const dialog = useDialog();

const route = useRoute();

const url = computed(() => {
  const url = route.params["url"] as string | undefined;
  if (url) {
    const newUrl = new URL(url);
    newUrl.protocol = "http://";
    return newUrl.toString();
  }

  return url;
});

const errorMsg = ref<null | any>(null);
const data = ref<RelayMetaData | null>(null);

watch(
  url,
  async () => {
    errorMsg.value = null;
    req()
      .then((v) => {
        data.value = v;
      })
      .catch((e) => {
        errorMsg.value = e;
      });
  },
  { immediate: true }
);
async function req() {
  if (!url.value) {
    return null;
  }

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // const proxyurl = "https://secret-ocean-49799.herokuapp.com/";
  return await useCache(
    `fetch:${proxyurl}${url.value}:get:application/nostr+json`,
    async () => {
      return await fetch(`${proxyurl}${url.value}`, {
        headers: {
          accept: "application/nostr+json",
        },
      })
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          try {
            return JSON.parse(text);
          } catch (e) {
            if (text.includes("/corsdemo")) {
              error(text, {
                duration: 200000,
                closable: true,
              });

              dialog.warning({
                title: t("warning"),
                content: t("relay_info_view_verified"),
                positiveText: t("yes"),
                negativeText: t("no"),
                onPositiveClick: () => {
                  window.open("https://cors-anywhere.herokuapp.com/corsdemo");
                },
                onNegativeClick: () => {},
              });
            }
            return Promise.reject(text);
          }
        });
    },
    { cacheError: false }
  );
}

const allNips = useAllNips();
watch(data, () => {
  const supported_nips = data.value?.supported_nips;
  if (supported_nips) {
    supported_nips.forEach((nip) => {
      allNips.value.add(nip);
    });
  }
});
const supported_nips = computed(() => {
  return new Set(data.value?.supported_nips);
});

function open(nip: number) {
  const url = `https://github.com/nostr-protocol/nips/blob/master/${nip
    .toString()
    .padStart(2, "0")}.md`;

  window.open(url);
}
const treeData = computed(() => createData(data.value));

function createData(baseKey: any): TreeOption[] | undefined {
  if (!baseKey) return [];
  if (Array.isArray(baseKey)) {
    return baseKey.map((v) => {
      return {
        whateverLabel: v,
        whateverKey: v,
      };
    });
  } else if (typeof baseKey === "object") {
    return Object.entries(baseKey).map(([key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        return {
          whateverLabel: `${key}: ${value}`,
          whateverKey: key,
        };
      }
      return {
        whateverLabel: key,
        whateverKey: key,
        whateverChildren: createData(value),
      };
    });
  } else {
    return [];
  }
}
</script>

<template>
  <div v-if="errorMsg === null && !data" size="large">
    <n-space vertical>
      <n-spin v-if="errorMsg === null && !data" size="large">
        <div class="h-[80vh]"></div>
        <template #description> {{ t("loading") }} </template>
      </n-spin>
    </n-space>
  </div>
  <n-result
    v-if="errorMsg"
    status="404"
    :title="`404 ${t('resource_does_not_exist')}`"
    description="生活总归带点荒谬"
  >
  </n-result>

  <div v-if="data">
    <n-space vertical>
      <h1 v-if="data.name">{{ data?.name }}</h1>
      <n-card title="基本信息">
        <p v-if="data?.description">描述 ：{{ data?.description }}</p>
        <p v-if="data?.pubkey">
          管理者 ：<PubkeyLinkVue :pubkey="data.pubkey" />
        </p>
      </n-card>

      <n-card title="支持的nip情况">
        <n-space>
          <n-tag
            v-for="nip in allNips"
            :bordered="false"
            :type="supported_nips.has(nip) ? 'success' : 'error'"
            @click="() => open(nip)"
          >
            nip-{{ nip }}
          </n-tag>
        </n-space>
      </n-card>
      <n-card title="更多信息">
        <n-tree
          block-line
          :data="treeData"
          key-field="whateverKey"
          label-field="whateverLabel"
          children-field="whateverChildren"
          selectable
        />
      </n-card>
    </n-space>
  </div>
</template>

<style scoped></style>
