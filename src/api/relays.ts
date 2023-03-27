// import { relayQuery } from "../nostr";

// type Context = { subId: string; fromUrl: string };
// export interface TaskEventOptions {
//   describe?: string;
// }
// export interface SubEventOptions extends TaskEventOptions {
//   even?: (event: Event, context: Context) => void;
//   eose?: (context: Context) => void;
//   relayUrls?: ReadonlySet<string>;
//   useCache?: boolean;
//   cacheDuration?: number;
//   eoseAutoUnSub?: boolean;
//   evenAutoUnSub?: boolean;
//   eoseAutoUnSubAll?: boolean;
//   evenAutoUnSubAll?: boolean;
//   blockAlreadyHaveEvent?: boolean;
// }
// export interface PublishEventOptions extends TaskEventOptions {
//   relayUrls?: Set<string>;
//   ok?: CallBackT<void>;
//   failed?: CallBackT<void>;
// }

// export function getDefaultRelay() {
//   return relayConfigurator.getReadList().size
//     ? relayConfigurator.getReadList()
//     : new Set(defaultUrls);
// }

// export const defaultSubEvent: SubEventOptions = {
//   eoseAutoUnSub: true,
//   blockAlreadyHaveEvent: true,
//   relayUrls: new Set(),
// };
