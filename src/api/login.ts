import { generatePrivateKey } from "nostr-tools";

export const PRIVATE_KEY = "prikey";

export function createPrikey() {
  return generatePrivateKey();
}
export function loginPrikey(key: string) {
  localStorage.setItem(PRIVATE_KEY, key);
}
export function registerPrikey() {
  const key = createPrikey();
  loginPrikey(key);
  return key;
}
export function logout() {
  window.localStorage[PRIVATE_KEY] = "";
  location.reload();
}
