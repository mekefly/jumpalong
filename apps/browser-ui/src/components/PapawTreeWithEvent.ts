import { createInjection } from "@/utils/use";

export const [providePapawTreeState, usePapawTreeState] = createInjection(
  (withEventSet: Ref<Set<string>>) => {
    return { withEventSet };
  }
);
