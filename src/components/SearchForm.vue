<script lang="ts" setup>
import { rootEventBeltline } from "@/nostr/nostr";
import { nip19 } from "nostr-tools";
import { getChannelMetadataBeltlineByChannelId } from "../api/channel";
import { createStaff, StaffState } from "../nostr/staff";
import { createDoNotRepeatStaff } from "../nostr/staff/createDoNotRepeatStaff";
import { renderIcon, renderWithClick } from "../utils/naiveUi";

import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { parseMetadata } from "@/nostr/staff/createUseChannelMetadata";
import { debounce } from "@/utils/utils";
import { deserializeTagEOfEventIds } from "../nostr/tag";
import ChannelAlert28RegularVue from "./icon/ChannelAlert28Regular.vue";
import LocalPostOfficeOutlinedVue from "./icon/LocalPostOfficeOutlined.vue";
import MdSearchVue from "./icon/MdSearch.vue";
import UserVue from "./icon/User.vue";
import UsersVue from "./icon/Users.vue";

const router = useRouter();
const searchValue = ref("");
const beltline = ref(createBeltline());
const options = computed(() =>
  beltline.value
    .map((event) => {
      switch (event.kind) {
        case 0:
          return {
            label: renderWithClick(parseMetadata(event).name ?? "", () => {
              router.push(`/profile/${event.pubkey}`);
            }),
            icon: renderIcon(UserVue),
            key: event.id,
          };
        case 1:
          return {
            label:
              event.content.length > 30
                ? `${event.content.slice(0, 30)}...`
                : event.content,
            icon: renderIcon(LocalPostOfficeOutlinedVue),
            key: event.id,
          };
        case 42:
          return {
            label:
              event.content.length > 30
                ? `${event.content.slice(0, 30)}...`
                : event.content,
            icon: renderIcon(ChannelAlert28RegularVue),
            key: event.id,
          };
        case 40:
          return {
            label: renderWithClick(parseMetadata(event).name ?? "", () => {
              router.push(`/channel/message/${event.id}`);
            }),
            icon: renderIcon(UsersVue),
            key: event.id,
          };
        case 41:
          const eventIds = deserializeTagEOfEventIds(event.tags);
          const { value: eventId = "", done } = eventIds.values().next();
          return {
            label: renderWithClick(parseMetadata(event)?.name ?? "", () => {
              router.push(`/channel/message/${eventId}`);
            }),
            icon: renderIcon(UsersVue),
            key: event.id,
          };

        default:
          break;
      }
    })
    .filter(Boolean)
    .slice(0, 20)
);
function createSeachStaff(seachValue: string) {
  if (seachValue.length === 63 && seachValue.startsWith("note")) {
    const nip19Resout = nip19.decode(seachValue);
    const eventId = nip19Resout.data;
    if (typeof eventId === "string") {
      return createStaff({
        initialization() {
          const metadataLine = getChannelMetadataBeltlineByChannelId(eventId);

          this.beltline.addChild(metadataLine);
          this.beltline.addFilter({
            ids: [eventId],
          });
        },
        push(event) {
          switch (event.kind) {
            case 40:
              if (event.id === eventId) {
                return StaffState.NEXT;
              }
              break;
            default:
              return StaffState.BREAK;
              break;
          }
        },
      });
    }
  }
  return createStaff({
    push(event) {
      switch (event.kind) {
        case 0:
        case 1:
        case 42:
        case 40:
        case 41:
          if (event.content.toLowerCase().includes(seachValue.toLowerCase()))
            return StaffState.NEXT;
          break;

        default:
          return StaffState.BREAK;
          break;
      }
    },
  });
}
function createBeltline() {
  return createEventBeltlineReactive()
    .addFilter({
      kinds: [1, 42, 40, 41, 0],
    })
    .addStaff(createDoNotRepeatStaff())
    .addStaff(createSeachStaff(searchValue.value))
    .addStaffOfSortByCreateAt()

    .addExtends(rootEventBeltline);
}

const debounceSearch = debounce(search);
// watch(searchValue, debounce(search));
function search() {
  beltline.value = createBeltline();
}
function handleSelect() {}
</script>

<template>
  <div>
    <n-dropdown
      trigger="focus"
      :options="options as any"
      @select="handleSelect"
      animated
    >
      <n-input
        @keyup.enter="search"
        placeholder="搜索"
        v-model:value="searchValue"
      >
        <template #suffix>
          <NButton quaternary @click="debounceSearch">
            <template #icon>
              <n-icon>
                <MdSearchVue />
              </n-icon>
            </template>
          </NButton>
        </template>
      </n-input>
    </n-dropdown>
  </div>
</template>

<style scoped></style>
