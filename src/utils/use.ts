import { useInjectScrollbarInstRef } from "@/components/Scrollbar";
import { t } from "@/i18n";
import { EventBeltline } from "@/nostr/eventBeltline";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { type RelayEmiterResponseEventMap } from "@/nostr/RelayEmiter";
import type { MaybeRef } from "@vueuse/core";
import type { Event, EventTemplate } from "nostr-tools";
import {
  computed,
  ComputedGetter,
  getCurrentInstance,
  InjectionKey,
  onUpdated,
  ref,
  unref,
  watch,
  watchEffect,
  type Ref,
} from "vue";
import { useRouter } from "vue-router";
import { eventDeletion } from "../api/event";
import { useCache } from "./cache";
import { type CallBackT } from "./types";
import { debounce, nowSecondTimestamp, setAdds } from "./utils";

export function useNextUpdate() {
  const callBacks: any[] = [];
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
    show, //显示
    hidden, //隐藏
    active,
    transitionActive, //动画
    safeActive, //v-if
    transitioning, // 动画进行中
    duration: ref(duration), //动画持续时间
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
// export function userGetEvent(
//   options: {
//     relayUrls?: Set<string>;
//     filters: Filter[];
//   } & SubscriptionOptions &
//     SubEventOptions
// ) {
//   const eventRef = useEvent();
//   const set = new Set();
//   sub(
//     options.filters,
//     Object.assign(
//       {
//         even(e) {
//           set.add(e.id);
//           eventRef.pushEvent(e);
//         },
//         alreadyHaveEvent(id, relay) {
//           set.has(id);
//         },
//       },
//       options
//     )
//   );
//   return eventRef;
// }

// export function useNewestEvent(
//   filters: Filter[],
//   opts?: SubscriptionOptions & SubEventOptions
// ) {
//   const newestEvent = ref<Event | null>(null);
//   sub(filters, {
//     even(e) {
//       // 更新的将放到 newestEvent变量里
//       (!newestEvent.value || e.created_at > newestEvent.value.created_at) &&
//         (newestEvent.value = e);
//     },
//     ...opts,
//   });
//   return newestEvent;
// }
export function useAsyncData<E>(cb: () => Promise<E>): Ref<E | undefined> {
  const data = ref<undefined | E>(undefined);

  cb().then((v) => {
    data.value = v as any;
  });

  return data as any;
}
export function useLazyComponent<E>(getter: ComputedGetter<E>) {
  const target = ref<any>();
  const isIntoScreen = useElementIntoScreen(target);

  //懒加载进入屏幕
  let isShow = ref(isIntoScreen.value);
  const unwatch = watch(isIntoScreen, () => {
    if (isIntoScreen.value) {
      isShow.value = true;
      unwatch();
    }
  });

  let cache: any = null;
  const data: ComputedRef<E | null> = computed(() => {
    if (!isShow.value) return null;
    return cache || (cache = getter());
  });

  return [data, target, isShow] as const;
}
export function useLazyData<E>(
  cb: () => Promise<E>
): [Ref<E | undefined>, Ref<any>] {
  const target = ref<any>();
  const data = ref<any>();

  const isIntoScreen = useElementIntoScreen(target);

  let isRun = false;
  watch(isIntoScreen, () => {
    if (isRun || !isIntoScreen.value) return;
    isRun = true;

    cb().then((v) => {
      data.value = v;
    });
  });
  return [data, target];
}
export function useLazyShow(delay?: number) {
  const target = ref(null as HTMLDivElement | null);
  const isIntoScreen = useElementIntoScreen(target, { delay });

  let isShow = ref(isIntoScreen.value);
  const unwatch = watch(isIntoScreen, () => {
    if (isIntoScreen.value) {
      isShow.value = true;
      unwatch();
    }
  });
  return [target, isShow];
}
export function useElementIntoScreen(
  target: Ref<HTMLDivElement | null>,
  opt?: { delay?: number }
) {
  const active = ref(true);

  const isIntoScreen = ref(false);

  const call = function () {
    if (!active.value) return;

    if (
      target.value &&
      target.value?.getBoundingClientRect().y <= window.innerHeight &&
      target.value?.getBoundingClientRect().y >= 0
    ) {
      isIntoScreen.value = true;
    } else {
      isIntoScreen.value = false;
    }
  };
  const debounceCall = debounce(call, opt?.delay ?? 500);
  debounceCall();

  window.addEventListener("mousewheel", debounceCall);
  window.addEventListener("resize", debounceCall);
  window.addEventListener("touchend", debounceCall);

  onActivated(() => {
    active.value = true;
  });
  onDeactivated(() => {
    active.value = false;
    isIntoScreen.value = false;
  });
  onUnmounted(() => {
    window.removeEventListener("mousewheel", debounceCall);
    window.removeEventListener("resize", debounceCall);
    window.removeEventListener("touchend", debounceCall);
  });
  return isIntoScreen;
}

export function useHandleSendMessage(
  kind: number,
  line: MaybeRef<EventBeltline<any> | undefined> = rootEventBeltline,
  pushEvent?: Ref<((e: Event) => void) | undefined>,
  opt?: {
    urls?: MaybeRef<Set<string>>;
  }
) {
  const { urls = new Set<string>() } = opt ?? {};
  const { success, error } = useMessage();
  const onOK = useOnOK();

  return function handleSendEvent(event: EventTemplate) {
    event.kind = kind;
    const l = unref(line) ?? rootEventBeltline;
    const newEvent = l.publish(
      event,
      setAdds(unref(urls), relayConfigurator.getWriteList()),
      {
        addUrl: true,
        onOK,
      }
    );
    newEvent && pushEvent?.value?.(newEvent);
  };
}
export function useModelBind<
  T extends {},
  P extends Exclude<keyof T, symbol | number>
>(props: T, name: P): Ref<T[P]> {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("只能在setup里使用");
  }
  const prop = toRef(props, name);
  const v = ref(prop.value);

  watch(prop, () => {
    v.value = prop.value;
  });

  return computed({
    get() {
      return v.value;
    },
    set(nv) {
      v.value = nv;
      instance.emit(`update:${name}`, nv);
    },
  });
}
export function useScale(scale = 0.5625) {
  const target = ref<HTMLElement | null>(null);

  onMounted(() => {
    setupHeight();
  });
  useEventListener(window, "resize", () => {
    setupHeight();
  });

  function setupHeight() {
    if (!target.value) return;
    target.value.style.height = target.value.scrollWidth * scale + "px";
  }
  return [target];
}
export function useDelayedLoading(number?: number) {
  const show = ref(false);
  setTimeout(() => {
    show.value = true;
  }, 0);
  return show;
}

export function useOnOK() {
  const message = useMessage();
  return function onOK({ ok, url }) {
    if (ok) {
      message.success(t("published_to", { url }));
    } else {
      message.error(t("not_published_to", { url }));
    }
  } as (v: RelayEmiterResponseEventMap["ok"]) => void;
}
export function useFlexibleRange(minWindowWidth = 1060, maxWindowWidth = 2650) {
  const windowWidth = ref(window.innerWidth);
  useEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });

  /**
   * 当屏幕宽度在 `minWindowWidth` 到 `maxWindowWidth` 之间时，将根据比例输出 `minNumber` 到 `maxNumber` 之间的数
   *
   * @export
   * @param {number} minNumber 当屏幕宽度小于 minWindowWidth 时将输出 minNumber 这个数
   * @param {number} maxNumber 当屏幕宽度小于 maxWindowWidth 时将输出 maxNumber 这个数
   * @param {{ floor?: boolean }} [options={}]
   * @return {*}
   */
  return function flexibleRange(
    minNumber: number,
    maxNumber: number,
    options: { floor?: boolean } = {}
  ) {
    return computed(() => {
      const { floor = true } = options;
      if (windowWidth.value > maxWindowWidth) {
        return maxNumber;
      } else if (windowWidth.value < minWindowWidth) {
        return minNumber;
      } else {
        const proportion =
          (windowWidth.value - minWindowWidth) /
          (maxWindowWidth - minWindowWidth);

        const flexNum = (maxNumber - minNumber) * proportion + minNumber;
        if (floor) {
          return Math.floor(flexNum);
        }
        return flexNum;
      }
    });
  };
}
export function useLimitMovement(maxShifting: MaybeRef<number>) {
  const shifting = ref(0);

  const moveScale = computed(() => {
    const abs = Math.abs(shifting.value);

    if (abs >= unref(maxShifting)) {
      return 0;
    }
    return (unref(maxShifting) - abs) / unref(maxShifting);
  });

  return {
    shifting,
    moveScale,
    add(n: number) {
      shifting.value += n * moveScale.value;
    },
    remake() {
      shifting.value = 0;
    },
  };
}
export function useNowSecondTimestamp() {
  return useCache(
    "useNowSecondTimestamp",
    () => {
      const secondTimestamp = ref(nowSecondTimestamp());
      let id: any;
      function calibration() {
        clearInterval(id);
        setTimeout(() => {
          id = setInterval(() => {
            secondTimestamp.value = nowSecondTimestamp();
          }, 1000);
        }, Date.now() % 1000);
      }
      calibration();
      setInterval(calibration, 1000 * 60 * 5);
      return secondTimestamp;
    },
    { useLocalStorage: false, duration: 999999999999999 }
  );
}

export function createInjectionState<
  Argv extends any[],
  Return extends any,
  F extends (...argv: Argv) => Return
>(fun: (...argv: Argv) => Return) {
  const key = Symbol() as InjectionKey<ReturnType<F>>;
  return [
    (...argv: Argv) => {
      const v: Return = fun(...argv);
      provide(key, v);
      return v;
    },
    () => {
      return inject(key, () => null, true);
    },
  ] as const;
}

export function autoHidden(
  target: globalThis.Ref<null>,
  isLongPress: Ref<boolean | undefined | null>,
  show: globalThis.Ref<boolean | undefined>
) {
  useEventListener("click", () => {
    show.value = false;
  });
  const scrollbarInstRef = useInjectScrollbarInstRef();
  function hidden() {
    show.value = false;
  }
  watch(show, () => {
    if (show.value) {
      scrollbarInstRef?.containerRef.value?.addEventListener("scroll", hidden, {
        once: true,
      });
    } else {
      scrollbarInstRef?.containerRef.value?.removeEventListener(
        "scroll",
        hidden
      );
    }
  });
  onUnmounted(() => {
    scrollbarInstRef?.containerRef.value?.removeEventListener("scroll", hidden);
  });
}
