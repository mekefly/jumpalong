<script lang="ts" setup>
import { useIsLogin } from './ProvideEventLine'

let router = useRouter()
let isLogin = useIsLogin()
function handlePositiveClick() {
  router.push('login')
}
function handleNegativeClick() {}
</script>

<template>
  <slot v-if="isLogin"></slot>

  <n-dialog
    v-else
    :title="t('warning')"
    type="warning"
    content="您没有登录，是否跳转到登录页面"
    :negative-text="t('no')"
    :positive-text="t('yes')"
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  />
</template>

<style scoped></style>
