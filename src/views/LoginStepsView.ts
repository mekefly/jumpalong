import contactConfiguration from "@/api/Contact";
import { testAndVerifyNewUser } from "@/api/login";
import { getFollowChannelConfiguration } from "@/nostr/FollowChannel";

export const loginOperations: Array<() => void> = [];

loginOperations.push(() => {
  //对新用户执行的操作
  if (testAndVerifyNewUser()) {
    contactConfiguration.follow(
      "e0b1ecd7a7fc5f76ac5cf860b38d647db00c8067dabe29565e3ac827297cdda8",
      "wss://nos.lol", //作者
      "你好"
    );
    getFollowChannelConfiguration().joinChannel(
      "25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb", //nostr群
      {
        relays: ["wss://nos.lol"],
      }
    );
  }
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

  async function complete() {
    loginOperations.push(() => {
      //对新用户执行的操作
      if (testAndVerifyNewUser()) {
        //从现在开始不再是新注册用户了
        localStorage.removeItem("newUserFlag");
      }
    });

    loginOperations.forEach((f) => f());

    const redirected = route.query.redirected as string;

    if (!redirected) {
      router.push("/");
      return;
    }

    router.push(redirected);
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
