export function useSetAutocomplete(
  autocomplete: "new-password" | "current-password" | "username",
  target: any = ref(null)
) {
  const _target = ref(target);

  watchEffect(() => {
    _target.value && (_target.value.inputElRef.autocomplete = autocomplete);
  });
  return target;
}
