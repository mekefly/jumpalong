import { createInjectionState } from "@/utils/use";
export const [useProvideNewMessage, useNewMessageState] = createInjectionState(
  (v: { jumpList: Ref<Array<() => void>> }) => {
    return v as { jumpList: Ref<Array<() => void>> };
  }
);
