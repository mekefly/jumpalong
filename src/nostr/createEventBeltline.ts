import { type EventBeltline, type EventBeltlineOptions } from "./eventBeltline";
import { rootEventBeltline } from "./nostr";

export function createEventBeltline(
  options?: EventBeltlineOptions & {
    addExtendsFromParent?: boolean;
    addExtendsFormRoot?: boolean;
  }
): EventBeltline<{}> {
  return rootEventBeltline.createChild(Object.assign({}, options));
}
export function createEventBeltlineReactive(
  options?: EventBeltlineOptions & {
    addExtendsFromParent?: boolean;
    addExtendsFormRoot?: boolean;
  }
): EventBeltline<{}> {
  return rootEventBeltline.createChild(
    Object.assign({ slef: reactive({}) }, options)
  );
}
