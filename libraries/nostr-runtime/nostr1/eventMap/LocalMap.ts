import { EventMap } from "./EventMap";
import { ReplaceableEventMap } from "./ReplaceableEventMap";

export type key = string;
type EventId = string;

export default {
  kind10002: new ReplaceableEventMap("ReplaceableEventMap:kind10002"),
  kind0: new ReplaceableEventMap("ReplaceableEventMap:kind0"),
  channelMetadataEventMap: new EventMap("channelMetadataEventMap", {
    cacheOptinos: { duration: 1000 * 60 * 60 * 8 },
  }),
  replaceable: new EventMap("replaceable", {
    cacheOptinos: { duration: 1000 * 60 * 20 },
  }),
};
