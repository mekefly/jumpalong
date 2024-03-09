export const apiNameList = [
  'nostr',
  'getPublicKey',
  'getRelays',
  'signEvent',
  'nip04',
  'nip04.encrypt',
  'nip04.decrypt',
] as const
export type ApiListType = Array<(typeof apiNameList)[any]>
