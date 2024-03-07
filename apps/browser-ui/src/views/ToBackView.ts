import { createInjection } from "@/utils/use";

export const [proviteToBackViewState, useToBackViewState] = createInjection(
  () => {
    const title = ref("");
    return {
      title,
      setTitle(_title: string) {
        title.value = _title;
      },
    };
  }
);
