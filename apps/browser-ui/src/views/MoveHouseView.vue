<script lang="ts" setup>
import AddRelayVue from "@/components/AddRelay.vue";
import DrawerProvideVue from "@/components/DrawerProvide.vue";
import RelayConnectListCardVue from "@/components/RelayConnectListCard.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import UserLinkVue from "@/components/UserLink.vue";
import { t } from "@/i18n";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { createDoNotRepeatStaff } from "@/nostr/staff";
import createEventSourceTracers, {
  getSourceUrls,
} from "@/nostr/staff/createEventSourceTracers";
import { usePubkey } from "@/utils/nostrApiUse";
import { useCacheStorage } from "@/utils/use";
import { createTaskQueue } from "@/utils/utils";
import { useThemeVars } from "naive-ui";

const pullUrls = ref(relayConfigurator.getReadList());
const pushUrls = ref(relayConfigurator.getWriteList());
const isPull = ref(false);
const isPush = ref(false);

const kinds = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 40, 41, 42, 43, 44, 1984, 9734, 9735, 10000, 10001,
  10002, 30000, 30001, 30008, 30009, 30023, 30078,
];

const checkedKinds = useCacheStorage("checkedKinds", kinds);

const pubkey = usePubkey();
const includeUser = computed(() => (pubkey.value ? [pubkey.value] : []));
const checkedUsers = computed(() => [...includeUser.value]);
const countMap = ref(new Map<number, number>());
const filters = computed(() => [
  { kinds: checkedKinds.value, authors: checkedUsers.value },
]);
const allPullLine = computed(() => {
  countMap.value.clear();

  return rootEventBeltline
    .createChild()
    .addStaff(createDoNotRepeatStaff())
    .addFilters(filters.value)
    .addStaff({
      push(e) {
        const kind = e.kind;
        countMap.value.set(kind, (countMap.value.get(kind) ?? 0) + 1);
      },
    })
    .addExtends(rootEventBeltline);
});
function handelPull() {
  isPull.value = true;
  allPullLine.value.addExtends(
    rootEventBeltline
      .createChild()
      .addStaff(createEventSourceTracers())
      .addFilters(filters.value)
      .addRelayUrls(pullUrls.value)
  );
}
const taskQueue = createTaskQueue(10);
const total = computed(() => {
  let total = 0;
  for (const [k, v] of countMap.value) {
    total += v;
  }
  return total;
});
const statistics = ref(new Map<string, Statistics>());
type Statistics = {
  ok: number;
  error: number;
  ignore: number;
};
function createStatistics(): Statistics {
  return {
    ok: 0,
    error: 0,
    ignore: 0,
  };
}
function getStatisticsByUrl(url: string, map: Map<string, Statistics>) {
  const v = map.get(url);
  if (!v) {
    const vv = createStatistics();
    statistics.value.set(url, vv);
    return vv;
  }
  return v;
}

function handelPush() {
  const map = reactive(new Map());
  statistics.value = map;
  isPush.value = true;

  const line = rootEventBeltline
    .createChild()
    .addFilters(filters.value)
    .addStaff({
      push(e) {
        taskQueue.unShift(() => {
          allPullLine.value.getRelayEmiter().on(
            "ok",
            e.id,
            ({ ok, url }) => {
              const statistics = getStatisticsByUrl(url, map);
              if (ok) {
                statistics.ok++;
              } else {
                statistics.error++;
              }
            },
            { overtime: 60_000 }
          );
          for (const url of pushUrls.value) {
            //消息就是从这个url拿下来的，自然不需要向这里发布
            if (getSourceUrls(e.id)?.has(url)) {
              getStatisticsByUrl(url, map).ignore++;
              continue;
            }
            taskQueue.unShift(() => {
              allPullLine.value.publish(e, new Set<string>().add(url), {
                autoPublishToTagR: false,
              });
            });
          }
        });
      },
    })
    .addExtends(allPullLine.value);
}
const themeVar = useThemeVars();
const message = useMessage();

const activeList = ref(null as null | Set<string>);
function handelAddurl(url: string) {
  activeList.value?.add(url);
  message.success(t("successfully_added"));
}
const showAddRelay = ref(false);
function handelAddRelayToPull() {
  activeList.value = pullUrls.value;
  showAddRelay.value = true;
}
function handelAddRelayToPush() {
  activeList.value = pushUrls.value;
  showAddRelay.value = true;
}
</script>

<template>
  <DrawerProvideVue #default="{ id }">
    <AddRelayVue
      v-model:show="showAddRelay"
      @add-relay="handelAddurl"
      :disabledList="activeList ?? undefined"
    ></AddRelayVue>
    <div :id="id">
      <ScrollbarVue>
        <n-space vertical>
          <n-card :title="t('kind')">
            <template #header-extra>{{ total }}</template>
            <n-checkbox-group
              v-model:value="checkedKinds"
              @update:value="
                () => {
                  isPull = false;
                  isPush = false;
                }
              "
            >
              <n-thing v-for="kind in kinds">
                <template #header>
                  <n-checkbox :value="kind" :label="t(`kind${kind}`)" />
                </template>
                <template #header-extra>
                  {{ countMap.get(kind) ?? 0 }}
                </template>
              </n-thing>
            </n-checkbox-group>
          </n-card>
          <n-card :title="t('include_user')">
            <n-checkbox-group v-model:value="checkedUsers">
              <div class="grid grid-cols-2"></div>
              <n-checkbox v-for="userPubkey in includeUser" :value="userPubkey">
                <UserLinkVue :withPrefix="false" :value="userPubkey">
                </UserLinkVue>
              </n-checkbox>
            </n-checkbox-group>
          </n-card>
          <RelayConnectListCardVue :urls="pullUrls" :title="t('pull')">
            <template #action>
              <n-space>
                <n-button :disabled="isPull" type="primary" @click="handelPull">
                  {{ t("pull") }}
                </n-button>

                <n-button type="primary" @click="handelAddRelayToPull">
                  {{ t("add_relay") }}
                </n-button>
              </n-space>
            </template>
          </RelayConnectListCardVue>

          <RelayConnectListCardVue :urls="pushUrls" :title="t('push')">
            <template #action>
              <n-space>
                <n-button
                  :disabled="isPush || total === 0"
                  type="primary"
                  @click="handelPush"
                >
                  {{ t("push") }}({{ total }})
                </n-button>
                <n-button type="primary" @click="handelAddRelayToPush">
                  {{ t("add_relay") }}
                </n-button>
              </n-space>
            </template>
          </RelayConnectListCardVue>
          <n-card :title="t('result')">
            <template #header-extra>{{ total }}</template>
            <n-empty
              v-if="statistics.size === 0"
              :description="t('empty_text')"
            >
            </n-empty>
            <n-thing v-for="[url, v] in statistics">
              <template #header>{{ url }}</template>
              <template #header-extra>
                <span :style="{ color: themeVar.successColor }">
                  {{ v.ok }}
                </span>
                /
                <span :style="{ color: themeVar.primaryColor }">
                  {{ v.ignore }}
                </span>
                /
                <span :style="{ color: themeVar.errorColor }">
                  {{ v.error }}
                </span>
              </template>
            </n-thing>
          </n-card>
        </n-space>
      </ScrollbarVue>
    </div>
  </DrawerProvideVue>
</template>

<style scoped></style>
