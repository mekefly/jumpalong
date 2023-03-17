import { EventEmitter } from "events";

const richTextEditBoxEmiterKey = Symbol() as InjectionKey<EventEmitter>;

export function usePrivateRichTextEditBoxEmiterEmiter() {
  const eventEmiter = new EventEmitter();

  provide(richTextEditBoxEmiterKey, eventEmiter);

  return eventEmiter;
}
export function useRichTextEditBoxEmiterEmiter() {
  const eventEmiter = new EventEmitter();

  provide(richTextEditBoxEmiterKey, eventEmiter);

  return eventEmiter;
}
