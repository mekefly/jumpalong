<script lang="ts" setup>
import { Pubkey, UserMetaData } from '@jumpalong/nostr-runtime'
import profile from '../assets/profile-2-400x400.png'
import EllipsisVue from '../components/Ellipsis.vue'
import CloudLightning from '../components/icon/CloudLightning.vue'
import { useUserMetadata } from '../state/metadata'
import ProfileMoreInfoVue from '../components/ProfileMoreInfo.vue'
import ScrollbarVue from '../components/Scrollbar.vue'
import { useScale } from '../utils/use'

let props = defineProps<{
  pubkey: Pubkey
  urls?: Set<string>
}>()
let { pubkey, urls } = toRefs(props)

const metadata = useUserMetadata<UserMetaData>(pubkey)
const [target] = useScale(0.3)
</script>

<template>
  <div v-if="pubkey" class="w-full h-full flex flex-col">
    <ScrollbarVue class="flex-shrink flex-1 h-0" refreshable loadable>
      <div class="flex flex-col">
        <div ref="target" class="h-0 w-full relative flex-shrink-0" :style="{}">
          <n-image
            v-if="metadata?.banner ?? metadata?.picture"
            :src="metadata?.banner ?? metadata?.picture"
            object-fit="cover"
            class="w-full h-full banner"
          />
          <NAvatar
            class="absolute bottom-0 left-2"
            :style="{
              transform: `translate(0,50%)`,
            }"
            round
            :size="100"
            :src="metadata?.picture ?? profile"
          />
        </div>
        <div>
          <div class="flex items-center justify-end px-8 mt-4">
            <n-space>
              <slot name="right"></slot>
            </n-space>
          </div>

          <h1 class="flex items-center">
            <EllipsisVue>
              {{ metadata?.name ?? pubkey.slice(0, 10) }}
            </EllipsisVue>
          </h1>

          <n-button text v-if="metadata?.lud16" class="flex items-center mb-2">
            <!-- @click="handleReward" -->
            <n-icon> <CloudLightning /> </n-icon>
            <span class="ml-1">
              {{ metadata?.lud16 }}
            </span>
          </n-button>

          <div
            class="w-full"
            :style="{
              'word-break': 'break-all',
              'text-overflow': 'ellipsis',
              'word-wrap': 'break-word',
            }"
          >
            {{ metadata?.about }}
          </div>
        </div>
      </div>
      <ProfileMoreInfoVue v-if="pubkey" :pubkey="pubkey.toHex()" :urls="urls" />
    </ScrollbarVue>
  </div>
</template>

<style scoped></style>
