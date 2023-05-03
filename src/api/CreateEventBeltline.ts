import { CreateEventBeltlineOptions } from "@/nostr/createEventBeltline";
import { type EventBeltline } from "@/nostr/eventBeltline";
import { TYPES } from "@/nostr/nostr";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateEventBeltline {
  @inject(TYPES.RootEventBeltline)
  rootEventBeltline!: EventBeltline<{}>;
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
