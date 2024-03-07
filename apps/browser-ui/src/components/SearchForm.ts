import { timeout } from "@/utils/utils";

export function usePageViewTeleport(
  name: string,
  defaultId: string,
  toViewId: string
) {
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

  const teleportTo = ref(defaultId);
  watch(
    isView,
    async () => {
      const s = isView.value;
      if (s) {
        await timeout(0);
        teleportTo.value = toViewId;
      } else {
        await timeout(0);
        teleportTo.value = defaultId;
      }
    },
    {
      immediate: true,
    }
  );

  return {
    teleportTo,
    isView,
  };
}
