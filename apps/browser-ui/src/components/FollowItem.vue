<script lang="ts" setup>
import { UserApiStaff, Pubkey } from '../nostr-runtime'
import profile from '../assets/profile-2-400x400.png'
import { useLazyComponent } from '../utils/use'
import Ellipsis from './Ellipsis.vue'
import { useEventLine } from './ProvideEventLine'

const props = defineProps<{
  pubkey: string
  name?: string
  about?: string
}>()
const { pubkey: pubkeyHex, name, about } = toRefs(props)
const pubkey = computed(() => Pubkey.fromHex(pubkeyHex.value))
const line = useEventLine(UserApiStaff)
const router = useRouter()

const [metadataLine, target] = useLazyComponent(() => {
  return line.getUserMetadataLineByPubkey(pubkey.value)
})
const metadata = computed(() => metadataLine.value?.getMetadata())
</script>

<template>
  <n-list-item class="cursor-pointer overflow-hidden">
    <div ref="target" class="flex items-center">
      <n-avatar
        class="ml-4"
        size="small"
        :src="metadata?.picture ?? profile"
        round
        @click="() => router.push(`/profile/${pubkeyHex}`)"
      />
      <div class="flex flex-col ml-4 flex-1 shrink-1 w-full">
        <Ellipsis
          class="text-xl"
          @click="() => router.push(`/profile/${pubkeyHex}`)"
        >
          {{ name ?? metadata?.name ?? pubkeyHex.slice(0, 10) }}
        </Ellipsis>
        <Ellipsis v-if="metadata?.about" :style="{ fontSize: '10px' }">
          {{ about ?? metadata.about }}
        </Ellipsis>
      </div>
      <div class="flex-shrink-0 ml-2">
        <slot name="right" :pubkey="pubkeyHex"></slot>
      </div>
    </div>
  </n-list-item>
</template>

<style scoped></style>
