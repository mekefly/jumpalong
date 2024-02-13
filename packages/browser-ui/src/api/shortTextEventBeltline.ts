import { CreateEventBeltlineOptions } from "@/nostr/createEventBeltline";
import { EventBeltline } from "@/nostr/eventBeltline";
import { TYPES } from "@/nostr/nostr";
import { callLogger } from "@/utils/decorator";
import { lazyInject } from "@/utils/inversify";
import { inject, injectable } from "inversify";
import { Filter } from "nostr-tools";
import { GeneralEventEventBeltline } from "./GeneralEventEventBeltline";

export type CreateTextEventBeltlineOption = CreateEventBeltlineOptions & {
  filters: Filter[];
  urls?: Set<string>;
  addUrls?: Set<string>;
  limit?: number;
  pubkeys?: string[];
};

@injectable()
export class CreateShortTextEventBeltline {
  static logger = logger;
  constructor(
    @inject(TYPES.RootEventBeltline)
    private rootEventBeltline: EventBeltline<{}>,
    @lazyInject(TYPES.GeneralEventEventBeltline)
    private generalEventEventBeltline: GeneralEventEventBeltline
  ) {}

  @callLogger()
  getShortTextEventBeltline(
    pubkeys: string[],
    options?: { relayUrls?: Set<string>; filter: Filter }
  ) {
    const filters = pubkeys?.map((pubkey) => {
      return {
        kinds: [1],
        authors: [pubkey],
      } as Filter;
    });
    return this.generalEventEventBeltline.createGeneralEventEventBeltline({
      filters,
    });
  }

  getReferenceMessage(eventId: string[]) {
    return this.generalEventEventBeltline.createGeneralEventEventBeltline({
      filters: [
        {
          "#e": eventId,
          kinds: [1],
        },
      ],
    });
  }
}
