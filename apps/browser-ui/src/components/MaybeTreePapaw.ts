import { createInjection } from "@/utils/use";

export const [provideMaybeTreePapaw, useMaybeTreePapaw] = createInjection(
  (useTree: Ref<boolean>) => {
    return { useTree };
  }
);
