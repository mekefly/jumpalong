import { createInjection } from "@/utils/use";
export const [useProvideNewMessage, useNewMessageState] = createInjection(
  (v: { jumpList: Ref<Array<() => void>> }) => {
    return v as { jumpList: Ref<Array<() => void>> };
  }
);
