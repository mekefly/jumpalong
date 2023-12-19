<script lang="ts" setup>
// let's query for an event that exists

import Router from "./components/Router.vue";
import { t } from "./i18n";

const logger = loggerScope;
logger.info();

const router = useRouter();
const loading = useLoadingBar();
router.beforeEach(() => {
  loading.start();
});
router.afterEach(() => {
  loading.finish();
});
const message = useMessage();
onErrorCaptured(function (err, instance, info) {
  const errStr = String(err);
  if (String(err).startsWith("refuse:")) {
    message.error(t("deny_authorization"));
    logger.warn(err);
    return false;
  } else if (errStr.startsWith("NotFoundError:")) {
    message.error(t("NotFoundError"));
    logger.warn(err);
    return false;
  }
  return true;
});
</script>

<template>
  <Router></Router>
</template>

<style scoped></style>
