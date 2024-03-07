<script lang="ts" setup>
import PostList from '../components/PostList.vue'
import Scrollbar from '../components/Scrollbar.vue'
import { useActivated } from '../utils/use'
import { useToBackViewState } from './ToBackView'
const route = useRoute()

const router = useRouter()
const value = computed(() => route.params.value as string)
const { setTitle } = useToBackViewState() ?? {}
const active = useActivated()

setTitle?.(value.value)

router.beforeEach(() => {
  setTitle?.('')
})
</script>

<template>
  <div v-if="active" class="h-full flex flex-col flex-grow overflow-hidden">
    <Scrollbar class="" refreshable loadable>
      <PostList
        :active="true"
        :filter="{
          ['#t']: [value],
          kinds: [1],
          limit: 5,
        }"
      />
    </Scrollbar>
  </div>
</template>

<style scoped></style>
