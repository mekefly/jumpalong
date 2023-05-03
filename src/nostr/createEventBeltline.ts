import { type EventBeltline, type EventBeltlineOptions } from "./eventBeltline";
import { rootEventBeltline } from "./nostr";

export type CreateEventBeltlineOptions = EventBeltlineOptions & {
  addExtendsFromParent?: boolean;
  addExtendsFormRoot?: boolean;
  from?: EventBeltline<any>;
  targetEventBeltline?: EventBeltline<any>;
};
export function createEventBeltline(
  options?: CreateEventBeltlineOptions
): EventBeltline<{}> {
  return (
    options?.targetEventBeltline ??
    (options?.from ?? rootEventBeltline).createChild(Object.assign({}, options))
  );
}
export function createEventBeltlineReactive(
  options?: CreateEventBeltlineOptions
): EventBeltline<{}> {
  return (
    options?.targetEventBeltline ??
    (options?.from ?? rootEventBeltline).createChild(
      Object.assign({ slef: reactive({}) }, options)
    )
  );
}
