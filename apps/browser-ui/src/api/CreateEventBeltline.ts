import { CreateEventBeltlineOptions } from "@/nostr/createEventBeltline";
import { type EventBeltline } from "@/nostr/eventBeltline";
import { TYPES } from "@/nostr/nostr";
import { lazyInject } from "@/utils/inversify";
import { injectable } from "inversify";

@injectable()
export default class CreateEventBeltline {
  constructor(
    @lazyInject(TYPES.RootEventBeltline)
    private rootEventBeltline: EventBeltline<{}>
  ) {}
  createEventBeltline(options?: CreateEventBeltlineOptions): EventBeltline<{}> {
    return (
      options?.targetEventBeltline ??
      (options?.from ?? this.rootEventBeltline).createChild(
        Object.assign({}, options)
      )
    );
  }
  createEventBeltlineReactive(
    options?: CreateEventBeltlineOptions
  ): EventBeltline<{}> {
    return (
      options?.targetEventBeltline ??
      (options?.from ?? this.rootEventBeltline).createChild(
        Object.assign({ slef: reactive({}) }, options)
      )
    );
  }
}
