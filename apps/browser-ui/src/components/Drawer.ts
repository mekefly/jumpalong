import { createInjection } from "@/utils/use";
import { createId } from "@/utils/utils";
export const [provideDrawerState, useDrawerState] = createInjection(() => {
  return {
    id: `d-${createId()}`,
  };
});
