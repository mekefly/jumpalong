import router from "@/router";

export function pushToLogin(
  redirected: string = router.currentRoute.value.fullPath
) {
  router.push({ name: "login", query: { redirected } });
}
