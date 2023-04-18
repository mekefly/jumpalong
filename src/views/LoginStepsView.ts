export function useLoginStepsState() {
  const route = useRoute();
  const router = useRouter();
  //1-n include n
  const current = computed(() => (route.meta.step as number) ?? 0);
  const name = computed(() => (route.name as string) ?? "");
  const numberOfSteps = computed(() => route.matched[0]?.children.length ?? 1);
  const withPrevStep = computed(() => current.value > 1);
  const withNestStep = computed(() => current.value < numberOfSteps.value);
  const loadingBar = useLoadingBar();

  if (current.value > 2) {
    pushToStep(2);
  }

  function nextStep() {
    loadingBar.start();
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

  async function complete() {}

  return {
    nextStep,
    prevStep,
    withPrevStep,
    withNestStep,
    current,
    name,
    numberOfSteps,
    complete,
  };
}
