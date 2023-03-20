import { timeout } from "@/utils/utils";

export function usePageViewTeleport(name: string) {
  const route = useRoute();
  const isView = ref(true);
  watch(
    () => route.name,
    async () => {
      if (route.name === name) {
        isView.value = true;
      } else {
        isView.value = false;
      }
    },
    {
      immediate: true,
    }
  );
  const teleportDisabled = ref(true);
  watch(
    isView,
    async () => {
      if (!isView.value) {
        teleportDisabled.value = true;
      } else {
        await timeout(0);
        if (isView.value) {
          teleportDisabled.value = false;
        }
      }
    },
    {
      immediate: true,
    }
  );
  return {
    teleportDisabled,
    isView,
  };
}
