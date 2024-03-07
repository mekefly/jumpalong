import { createInjection } from "@/utils/use";

export const [provideLoginCompleteHooks, useLoginCompleteHooks] =
  createInjection(() => {
    const loginCompleteHook = ref(new Map<string, () => Promise<void>>());
    return {
      loginCompleteHook,
      async runHook() {
        for (const [key, value] of loginCompleteHook.value.entries()) {
          await value();
        }
      },
    };
  });

export const [provideLoginCompleteHook, useLoginCompleteHook] = createInjection(
  (key: ComputedRef<string>) => {
    const loginCompleteHooks = useLoginCompleteHooks();
    return {
      setHook(callback: () => Promise<void>) {
        if (!loginCompleteHooks) {
          return;
        }
        loginCompleteHooks.loginCompleteHook.value.set(key.value, callback);
      },
    };
  }
);
