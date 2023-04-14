// import { getPublicKey, nip19 } from "nostr-tools";
// import { computed, type Ref } from "vue";
// import { registerPrikey } from "../api/login";

// /**
//  *  私钥
//  */
// export const privateKey: Ref<string> = ref(
//   (() => {
//     const prikey = localStorage.getItem("prikey");
//     if (prikey) return prikey;

//     //注册
//     const newPrikey = registerPrikey();
//     return newPrikey;
//   })()
// );

// /**
//  *  用户公私钥
//  */
// export const userKey = computed(() => {
//   return {
//     privateKey: privateKey.value,
//     publicKey: privateKey.value ? getPublicKey(privateKey.value) : "",
//   };
// });

// export const nproKey = computed(() =>
//   nip19.nprofileEncode({ pubkey: userKey.value.publicKey, relays: [] })
// );

// export const npubKey = computed(() =>
//   nip19.npubEncode(userKey.value.publicKey)
// );

// export const nsecKey = computed(() =>
//   nip19.nsecEncode(userKey.value.privateKey)
// );

// export function deEncodeNproKey(nprofile: string): nip19.ProfilePointer {
//   const nproObject = nip19.decode(nprofile);

//   if (nproObject.type === "nprofile") return nproObject.data as any;
//   throw new Error("Not a nprofile!");
// }
