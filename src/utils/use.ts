import type { MaybeRef } from "@vueuse/core";
import type { Event, Filter, SubscriptionOptions } from "nostr-tools";
import {
  computed,
  onUpdated,
  ref,
  unref,
  watch,
  watchEffect,
  type Ref,
} from "vue";
import { useRouter } from "vue-router";
import { eventDeletion } from "../api/event";
import { sub, type SubEvent } from "../api/relays";
import { type CallBackT } from "./types";

export function useNextUpdate() {
  const callBacks: any[] = [];
  window.addEventListener("load", () => {
    console.log("load");
  });
  onUpdated(() => {
    callBacks.forEach((e) => {
      e();
    });
    callBacks.length = 0;
  });

  return {
    nextUpdate(_callBack?: () => void) {
      if (!_callBack) {
        return new Promise<void>((resolve, reject) => {
          callBacks.push(resolve);
        });
      }
      callBacks.push(_callBack);

      return new Promise<void>((resolve, reject) => {
        callBacks.push(resolve);
      });
    },
  };
}
export function useFetch<V>(fetch: () => Promise<V> | V): {
  data: Ref<V | undefined>;
  error: Ref<any>;
} {
  const data: Ref<V | undefined> = ref();
  const error: Ref<any | undefined> = ref();

  Promise.resolve(fetch())
    .then((v) => {
      data.value = v;
    })
    .catch((e) => {
      error.value = e;
    });

  return { data, error };
}

export function useRouterPath() {
  const router = useRouter();

  return computed(() => router.currentRoute.value.path);
}
export function useIfTransition(duration: MaybeRef<number> = 500) {
  const active = ref(false);
  const transitioning = ref(false);

  let timeout = null as any;
  watch(active, () => {
    transitioning.value = true;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      transitioning.value = false;
    }, unref(duration));
  });

  const safeActive = computed(() => {
    return active.value || transitioning.value;
  });
  const transitionActive = ref(false);
  watchEffect(() => {
    if (!active.value) {
      transitionActive.value = false;
      return;
    }
    setTimeout(() => {
      transitionActive.value = true;
    }, 0);
  });

  function show() {
    active.value = true;
  }
  function hidden() {
    active.value = false;
  }

  return {
    show,
    hidden,
    active,
    transitionActive,
    safeActive,
    transitioning,
    duration: ref(duration),
  };
}

/**
 * event不可重复
 *
 * @export
 */
export function useEvent() {
  const ids = new Set();
  const events = ref([] as Event[]);
  const pushEvent = function (e: Event) {
    if (ids.has(e.id)) return;
    ids.add(e.id);

    trigger("push", e);
    events.value.push(e);
  };
  const popEvent = function (id: string) {
    events.value = events.value.filter((e) => {
      trigger("pop", e);
      e.id !== id;
    });
  };
  const deleteEvent = function (id: string) {
    popEvent(id);
    eventDeletion([id]);
  };
  const myEvent: Record<
    "push" | "pop" | "delete",
    CallBackT<Event>[] | undefined
  > = {} as any;
  const trigger = function (e: "push" | "pop" | "delete", v: Event) {
    myEvent[e]?.forEach((cb) => {
      cb(v);
    });
  };
  const on = function (
    e: "push" | "pop" | "delete",
    callback: CallBackT<Event>
  ) {
    (myEvent[e] ?? (myEvent[e] = [] as any)).push(callback);
  };
  return {
    pushEvent,
    popEvent,
    deleteEvent,
    events,
    on,
  };
}
export function userGetEvent(
  options: {
    relayUrls?: Set<string>;
    filters: Filter[];
  } & SubscriptionOptions &
    SubEvent
) {
  const eventRef = useEvent();
  const set = new Set();
  sub(
    options.filters,
    Object.assign(
      {
        even(e) {
          set.add(e.id);
          eventRef.pushEvent(e);
        },
        alreadyHaveEvent(id, relay) {
          set.has(id);
        },
      },
      options
    )
  );
  return eventRef;
}

export function useNewestEvent(
  filters: Filter[],
  opts?: SubscriptionOptions & SubEvent
) {
  const newestEvent = ref<Event | null>(null);
  sub(filters, {
    even(e) {
      // 更新的将放到 newestEvent变量里
      (!newestEvent.value || e.created_at > newestEvent.value.created_at) &&
        (newestEvent.value = e);
    },
    ...opts,
  });
  return newestEvent;
}
