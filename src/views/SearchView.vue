<script lang="ts" setup>
import { getEventLineById } from "@/api/event";
import { getUserMetadataLineByPubkey } from "@/api/user";
import PapawVue from "@/components/Papaw.vue";
import RelayUrlShowVue from "@/components/RelayUrlShow.vue";
import SearchChannelItemVue from "@/components/SearchChannelItem.vue";
import UserInfoVue from "@/components/UserInfo.vue";
import { EventBeltline } from "@/nostr/eventBeltline";
import { rootEventBeltline } from "@/nostr/nostr";
import { createDoNotRepeatStaff } from "@/nostr/staff";
import { toDeCodeNevent, toDeCodeNprofile } from "@/utils/nostr";
import { Event } from "nostr-tools";

const router = useRouter();
const route = useRoute();
const value = computed(() => route.params["value"] as string);
const profilePointer = computed(() => {
  return value.value && toDeCodeNprofile(value.value);
});
const neventOpt = computed(() => {
  return value.value && toDeCodeNevent(value.value);
});
type GroupEvents = Partial<Record<0 | 1 | 2 | 3 | "channel", EventBeltline>>;
const groupEvents = ref<GroupEvents>({});

const searchRootLine = rootEventBeltline
  .createChild()
  .addStaff(createDoNotRepeatStaff());
function createListBeltline() {
  return searchRootLine.createChild().addStaff(createDoNotRepeatStaff());
}
watch(
  value,
  () => {
    groupEvents.value = {};
    if (!value.value || value.value.length === 0) return;

    if (profilePointer.value) {
      //search人
      //远程和本地搜索
      const relays = profilePointer.value.relays;
      const line = getUserMetadataLineByPubkey(
        profilePointer.value.pubkey,
        relays && new Set(relays)
      );
      searchRootLine.addChild(line); //交给searchRoot去管理
      groupEvents.value[0] = line;
    } else if (neventOpt.value) {
      //search 事件
      //远程和本地搜索event
      const opt = neventOpt.value;
      const relays = neventOpt.value.relays;
      const line = getEventLineById(
        opt.id,
        relays && { urls: new Set(relays) }
      );
      searchRootLine.addChild(line); //交给searchRoot去管理
      line.feat.onHasEventOnce((e) => {
        classify(e, groupEvents.value as any);
      });
    } else {
      //search any
      const searchLine = rootEventBeltline
        .createChild()
        .addStaff(createDoNotRepeatStaff()) //去重复
        .addStaff({
          push(e) {
            classify(e, groupEvents.value as any);
          },
        });
      searchRootLine.addChild(searchLine); //交给searchRoot去管理

      //本地搜索
      const searchLocal = searchLine
        .createChild()
        .addFilter({ search: value.value } as any)
        .addExtends(rootEventBeltline);
      //汇总生产线
      searchLine.addExtends(searchLocal);
      // remote
      const searchRemote = searchLine
        .createChild()
        .addFilter({ search: value.value, limit: 50 } as any)
        .addReadUrl();
      //汇总生产线
      searchLine.addExtends(searchRemote);
    }
  },
  {
    immediate: true,
  }
);

function classify<E extends GroupEvents>(e: Event, groupEvents: E) {
  switch (e.kind) {
    case 0:
    case 1:
    case 2:
    case 3:
      (
        groupEvents[e.kind] ?? (groupEvents[e.kind] = createListBeltline())
      ).pushEvent(e);
      break;
    case 40:
    case 41:
      (
        groupEvents["channel"] ??
        (groupEvents["channel"] = createListBeltline())
      ).pushEvent(e);
      break;
    default:
      break;
  }
}
</script>

<template>
  <n-space vertical>
    <div class="flex items-center justify-center">
      <div id="search-input"></div>
    </div>
    <n-card class="w-full" title="群聊" v-if="groupEvents['channel']">
      <n-list class="w-full" hoverable clickable>
        <n-list-item
          v-for="event in groupEvents['channel'].getList()"
          :key="event.id"
        >
          <SearchChannelItemVue :event="event" />
        </n-list-item>
      </n-list>
    </n-card>
    <n-card title="用户" v-if="groupEvents[0]">
      <UserInfoVue
        v-for="event in groupEvents[0].getList()"
        :key="event.id"
        :pubkey="event.pubkey"
        :created_at="event.created_at"
      >
      </UserInfoVue>
    </n-card>
    <n-card title="relay" v-if="groupEvents[2]">
      <RelayUrlShowVue
        v-for="event in groupEvents[2].getList()"
        :key="event.id"
        :url="event.content"
      />
    </n-card>
    <n-card title="消息" v-if="groupEvents[1]">
      <PapawVue
        v-for="event in groupEvents[1].getList()"
        :key="event.id"
        :event="event"
      />
    </n-card>
  </n-space>
</template>

<style scoped></style>
