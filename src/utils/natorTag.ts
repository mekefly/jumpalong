export function createTagP(
  pubkey: string,
  relay: string = "",
  name: string = ""
) {
  return ["p", pubkey, relay, name];
}
