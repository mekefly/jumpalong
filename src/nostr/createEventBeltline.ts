import { type EventBeltline, type EventBeltlineOptions } from "./eventBeltline";
import { rootEventBeltline } from "./nostr";

export type CreateEventBeltlineOptions = EventBeltlineOptions & {
  addExtendsFromParent?: boolean;
  addExtendsFormRoot?: boolean;
  form?: EventBeltline<any>;
  targetEventBeltline?: EventBeltline<any>;
};
export function createEventBeltline(
  options?: CreateEventBeltlineOptions
): EventBeltline<{}> {
  return (
    options?.targetEventBeltline ??
    (options?.form ?? rootEventBeltline).createChild(Object.assign({}, options))
  );
}
export function createEventBeltlineReactive(
  options?: CreateEventBeltlineOptions
): EventBeltline<{}> {
  return (
    options?.targetEventBeltline ??
    (options?.form ?? rootEventBeltline).createChild(
      Object.assign({ slef: reactive({}) }, options)
    )
  );
}
