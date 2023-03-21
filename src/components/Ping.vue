<script lang="ts" setup>
import { config } from "@/nostr/nostr";
import { removeLocalStorage, useCache } from "@/utils/cache";
import { useElementIntoScreen } from "@/utils/use";
import { debounce, ping } from "@/utils/utils";
import { InjectionKey } from "vue";
import NetworkCheckRoundVue from "./icon/NetworkCheckRound.vue";
import WarningAmberRoundVue from "./icon/WarningAmberRound.vue";
import Timer10SelectTwotone from "./icon/Timer10SelectTwotone.vue";

const props = defineProps<{ url: string }>();
const url = toRef(props, "url");

let wrongUrl = ref(false);
let isOvertime = ref(false);
let delay = ref<null | number>(null);

const overtime = ref(5000);
const min = ref(500);

const target = ref(null);
const intoScreen = useElementIntoScreen(target);

let isLoading = ref(false);
function toPing(noCache = false) {
  if (!url.value) return;
  if (delay.value) return;
  isLoading.value = true;

  try {
    let u = new URL(url.value).host;

    if (noCache) {
      removeLocalStorage(`ping:${u}`);
    }
    useCache(
      `ping:${u}`,
      () => {
        return ping(u, overtime.value);
      },
      {}
    )
      .then((n) => {
        delay.value = n;
        isLoading.value = false;
      })
      .catch((e) => {
        isLoading.value = false;
        isOvertime.value = true;
      });
  } catch (error) {
    wrongUrl.value = true;
    isLoading.value = false;
  }
}
const debounceToPng = debounce(toPing);
const isAutoPingKey = Symbol() as InjectionKey<Ref<boolean>>;
const isAutoPing = inject(isAutoPingKey, () => null, true);

watchEffect(() => {
  if (!(intoScreen.value && (isAutoPing?.value ?? config.autoPing))) return;
  debounceToPng();
});

const statusColor = computed(() => {
  if (!delay.value) {
    return 0;
  }

  if (delay.value >= overtime.value) {
    return 255;
  }
  if (delay.value <= min.value) {
    return 0;
  }

  return Math.floor((delay.value / (overtime.value - min.value)) * 255);
});

function rePing() {
  delay.value = null;
  toPing(true);
}
</script>

<template>
  <div
    :key="url"
    ref="target"
    class="rounded-full text-center felx items-center justify-center"
  >
    <n-button
      text
      quaternary
      round
      @click.stop="rePing"
      :loading="isLoading"
      size="tiny"
    >
      <span
        v-if="delay"
        :style="{
          fontSize: '0.5em',
          color: `rgb(${statusColor},${255 - statusColor},0)`,
        }"
      >
        {{ delay }}
      </span>
      <n-icon v-else-if="wrongUrl" color="red">
        <WarningAmberRoundVue />
      </n-icon>
      <n-icon v-else-if="isOvertime" color="orange">
        <Timer10SelectTwotone />
      </n-icon>
      <n-icon v-else-if="!isLoading" color="#3742fa">
        <NetworkCheckRoundVue />
      </n-icon>
    </n-button>
  </div>
</template>

<style scoped></style>
