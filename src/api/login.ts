import { privateKey } from "@/nostr/user";
import { generatePrivateKey } from "nostr-tools";

export const PRIVATE_KEY = "prikey";

export function createPrikey() {
  return generatePrivateKey();
}
export function loginPrikey(key: string) {
  localStorage.setItem(PRIVATE_KEY, key);
  setTimeout(() => {
    privateKey.value = key;
  });
}
export function registerPrikey(prikey: string = createPrikey()) {
  localStorage.setItem("newUserFlag", prikey);
  loginPrikey(prikey);
  return prikey;
}
export function logout() {
  window.localStorage[PRIVATE_KEY] = "";
  location.reload();
}

export function testAndVerifyNewUser() {
  const prikey = localStorage.getItem("newUserFlag");
  const currentPrikey = localStorage.getItem("prikey");
  if (prikey && prikey === currentPrikey) {
    return true;
  } else {
    return false;
  }
}
