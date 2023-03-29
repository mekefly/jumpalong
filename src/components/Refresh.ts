import { createInjectionState } from "@/utils/use";
import EventEmitter from "events";

export const [provideRefreshState, useRefreshState] = createInjectionState(
  () => {
    const eventEmiter = new EventEmitter();
    type Type = "refresh" | "load";
    return {
      on(type: Type, listener: () => void) {
        eventEmiter.on(type, listener);
      },
      emit(type: Type) {
        eventEmiter.emit(type);
      },
    };
  }
);
