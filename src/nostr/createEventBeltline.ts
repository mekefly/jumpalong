import { EventBeltline, EventBeltlineOptions } from "./eventBeltline";

export function createEventBeltline(
  options?: EventBeltlineOptions & {
    addExtendsFromParent?: boolean;
    addExtendsFormRoot?: boolean;
  }
): EventBeltline<{}> {
  return EventBeltline.root.createChild(Object.assign({}, options));
}
export function createEventBeltlineReactive(
  options?: EventBeltlineOptions & {
    addExtendsFromParent?: boolean;
    addExtendsFormRoot?: boolean;
  }
): EventBeltline<{}> {
  return EventBeltline.root.createChild(
    Object.assign({ slef: reactive({}) }, options)
  );
}
