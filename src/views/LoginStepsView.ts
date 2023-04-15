import contactConfiguration from "@/api/Contact";
import { testAndVerifyNewUser } from "@/api/login";
import { getFollowChannelConfiguration } from "@/nostr/FollowChannel";
import { ReplaceableEventSyncAbstract } from "@/nostr/ReplaceableEventSyncAbstract";

export const loginOperations: Array<() => void> = [];

loginOperations.push(() => {
  //对新用户执行的操作
  if (testAndVerifyNewUser()) {
    contactConfiguration.follow(
      "076fae9a020673caf9db66734884aa4a77f49ba394274896e439e1c6ff178289",
      "wss://nos.lol", //作者
      "你好"
    );
    // Nostr
    getFollowChannelConfiguration().joinChannel(
      "25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb", //nostr群
      {
        relays: ["wss://nos.lol"],
      }
    );
    // Jumpalong
    getFollowChannelConfiguration().joinChannel(
      "22dcc0565a6c698199767e80b0526769cf3c04460b7ffc22a4b4cfbfdd642b53", //nostr群
      {
        relays: ["wss://nos.lol"],
      }
    );
  }
});
loginOperations.push(() => {
  ReplaceableEventSyncAbstract.syncAll();
});

export function useLoginStepsState() {
  const route = useRoute();
  const router = useRouter();
  //1-n include n
  const current = computed(() => (route.meta.step as number) ?? 0);
  const name = computed(() => (route.name as string) ?? "");
  const numberOfSteps = computed(() => route.matched[0]?.children.length ?? 1);
  const withPrevStep = computed(() => current.value > 1);
  const withNestStep = computed(() => current.value < numberOfSteps.value);

  function nextStep() {
    if (!withNestStep.value) {
      complete();
      return;
    }
    pushToStep(current.value + 1);
  }
  function prevStep() {
    if (!withPrevStep.value) {
      return;
    }
    pushToStep(current.value - 1);
  }
  function pushToStep(step: number) {
    router.push({ path: `/login-step-${step}` });
  }

  const loadingBar = useLoadingBar();
  async function complete() {
    loginOperations.push(() => {
      localStorage.removeItem("newUserFlag");
    });

    loginOperations.forEach((f) => f());

    const redirected = route.query.redirected as string;

    loadingBar.start();
    setTimeout(() => {
      if (!redirected) {
        router.push("/");
        return;
      }

      router.push(redirected);
    }, 2000);
  }

  return {
    nextStep,
    prevStep,
    withPrevStep,
    withNestStep,
    current,
    name,
    numberOfSteps,
    complete,
    loginOperations,
  };
}
