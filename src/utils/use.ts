import { useInjectScrollbarInstRef } from "@/components/Scrollbar";
import { t } from "@/i18n";
import { EventBeltline } from "@/nostr/eventBeltline";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { type RelayEmiterResponseEventMap } from "@/nostr/RelayEmiter";
import autoAddRelayurlByEventIdStaff from "@/nostr/staff/autoAddRelayurlByEventIdStaff";
import autoAddRelayurlByPubkeyStaff from "@/nostr/staff/autoAddRelayurlByPubkeyStaff";
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
  WatchStopHandle,
  type Ref,
} from "vue";
import { useRouter } from "vue-router";
import { eventDeletion } from "../api/event";
import {
  defaultCacheOptions,
  getCacheOrNull,
  setCache,
  useCache,
} from "./cache";
import { CacheOptions } from "./cache/types";
import { type CallBackT } from "./types";
import { debounce, nowSecondTimestamp, setAdds, withDefault } from "./utils";

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
export function useIfTransition(
  duration: MaybeRef<number> = 500,
  opts?: {
    active: MaybeRef<boolean>;
  }
) {
  const active = ref(opts?.active ?? false);
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
export function useAsyncData<E>(cb: () => Promise<E>): Ref<E | undefined> {
  const data = ref<undefined | E>(undefined);

  cb().then((v) => {
    data.value = v as any;
  });

  return data as any;
}
export function useLazyComponent<E>(
  getter: ComputedGetter<E>,
  opt?: {} & UseLazyShowOptions
) {
  const [target, isShow] = useLazyShow(undefined, opt);

  const data: ComputedRef<E | null> = computed(() => {
    if (!isShow.value) return null;
    return getter();
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
type UseLazyShowOptions = {
  target?: Ref<any>;
} & UseElementIntoScreenOpt;
export function useLazyShow(delay?: number, opt?: UseLazyShowOptions) {
  const _target = ref(opt?.target as HTMLDivElement | null | undefined);

  //false，将主动关闭监听
  const isListener = ref(true);
  const isIntoScreen = useElementIntoScreen(_target, {
    delay,
    ...opt,
    isListener: isListener as Ref,
  });

  let isShow = ref(isIntoScreen.value);
  const unwatch = watch(
    isIntoScreen,
    () => {
      if (isIntoScreen.value) {
        isShow.value = true;
        unwatch();
        isListener.value = false;
      }
    },
    { immediate: true }
  );
  return [_target, isShow] as const;
}
const [useProvideIntoScreenState, useIntoScreenState] = createInjection(
  (opt: { active: ComputedRef<boolean>; isAddListener: Ref<boolean> }) => {
    return {
      isIntoScreen: ref(false),
      ...opt,
    };
  }
);
type UseElementIntoScreenOpt = {
  delay?: number;
  isListener?: MaybeRef<boolean | undefined>;
  componentTreeOptimization?: MaybeRef<boolean>; //默认为true，会根据组件树结构优化运行速度
  preloadDistance?: number;
  active?: Ref<boolean | undefined>;
};
export function useActivated(_active?: MaybeRef<boolean>) {
  const active: Ref<boolean> = ref(_active ?? false);

  onMounted(handelActive);
  onUnmounted(handelDeactive);
  try {
    onActivated(handelActive);
    onDeactivated(handelDeactive);
  } catch (error) {}
  function handelActive() {
    active.value = true;
  }
  function handelDeactive() {
    active.value = false;
  }
  return active;
}
export function useElementIntoScreen(
  target: Ref<HTMLDivElement | null | undefined>,
  opt?: UseElementIntoScreenOpt
) {
  const _opts = withDefault(opt, {
    isListener: true,
    componentTreeOptimization: true,
    preloadDistance: 30,
  });

  const parent = useIntoScreenState();
  const { isIntoScreen: parentIsIntoScreen, active: parentActive } =
    parent ?? {};
  const active1 = useActivated();

  const { isIntoScreen, active, isAddListener } = useProvideIntoScreenState({
    // @ts-ignore
    opt: opt as any,
    isAddListener: ref(false),
    parent,
    active: computed(() => {
      if (opt?.active === undefined) {
        if (parentActive === undefined) {
          //如果没有手动传入active
          //没有父active
          return active1.value;
        } else {
          //如果没有手动传入active
          //有父active

          return parentActive.value;
        }
      } else {
        if (parentActive === undefined) {
          //有传入active,但没父active
          return (opt.active.value ?? true) && active1.value;
        } else {
          //有传入active,也有父active
          return (opt.active.value ?? true) && parentActive.value;
        }
      }
    }),
  });

  const checkUp = function () {
    if (!active.value) {
      return;
    }
    if (!target.value) {
      return;
    }
    if (!unref(_opts.isListener)) {
      isIntoScreen.value = true;
      return;
    }
    const rect = target.value?.getBoundingClientRect();
    if (
      rect.y <= window.innerHeight + _opts.preloadDistance &&
      rect.bottom >= 0 - _opts.preloadDistance
    ) {
      isIntoScreen.value = true;
    } else {
      isIntoScreen.value = false;
    }
  };
  const debounceCheckUp = debounce(checkUp, opt?.delay ?? 500);
  onMounted(checkUp);
  debounceCheckUp();

  const scrollBarRef = useInjectScrollbarInstRef();

  watchEffect(() => {
    //组件是否进入激活状态

    if (!active.value) {
      removeEventListener();
      return;
    }
    //目标必须存在
    if (!target.value) {
      removeEventListener();
      return;
    }

    if (
      !(opt?.componentTreeOptimization && (parentIsIntoScreen?.value ?? true))
    ) {
      //根据组件树结构优化
      removeEventListener();
      return;
    }
    //手动停止监听

    if (!unref(_opts.isListener)) {
      isIntoScreen.value = true;
      removeEventListener();
      return;
    }
    debounceCheckUp();

    addEventListener();
  });

  function addEventListener() {
    isAddListener.value = true;

    // if (scrollBarRef) {
    //   const containerRef = scrollBarRef.containerRef.value;
    //   if (containerRef) {
    //     containerRef.addEventListener("scroll", debounceCheckUp, {
    //       passive: true,
    //     });

    //     window.addEventListener("resize", debounceCheckUp, { passive: true });
    //     return;
    //   }
    // }
    window.addEventListener("mousewheel", debounceCheckUp, { passive: true });
    window.addEventListener("resize", debounceCheckUp, { passive: true });
    window.addEventListener("touchend", debounceCheckUp, { passive: true });
  }

  function removeEventListener() {
    isAddListener.value = false;
    // if (scrollBarRef) {
    //   const containerRef = scrollBarRef.containerRef.value;
    //   if (!containerRef) {
    //     return;
    //   }
    //   containerRef.removeEventListener("scroll", debounceCheckUp);
    // }
    window.removeEventListener("mousewheel", debounceCheckUp);
    window.removeEventListener("resize", debounceCheckUp);
    window.removeEventListener("touchend", debounceCheckUp);
  }
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
  const onOK = useOnOK();

  return async function handleSendEvent(event: EventTemplate) {
    event.kind = kind;
    const l = unref(line) ?? rootEventBeltline;
    const publishLine = l.createChild();

    const newEvent = await publishLine.publish(
      event,
      setAdds(unref(urls), relayConfigurator.getWriteList()),
      {
        addUrl: true,
        onOK,
      }
    );
    l.addExtends(publishLine);

    newEvent?.tags.forEach((tag) => {
      if (tag[0] === "p" && tag[1]) {
        publishLine.addStaff(autoAddRelayurlByPubkeyStaff(tag[1]));
      } else if (tag[0] === "e" && tag[1]) {
        publishLine.addStaff(autoAddRelayurlByEventIdStaff(tag[1]));
      }
    });

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
  onUpdated(() => {
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

export function createInjection<
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

export function autoHidden(show: globalThis.Ref<boolean | undefined>) {
  const scrollbarInstRef = useInjectScrollbarInstRef();
  function hidden() {
    show.value = false;
  }
  watch(show, () => {
    if (show.value) {
      scrollbarInstRef?.containerRef.value?.addEventListener("scroll", hidden, {
        once: true,
        passive: true,
      });
      document.addEventListener(
        "click",
        () => {
          setTimeout(hidden, 0);
        },
        {
          once: true,
        }
      );
    }
  });
}
export function useCacheStorage<E>(
  key: string,
  defaul?: E,
  opt?: CacheOptions
) {
  const cacheOption = { ...defaultCacheOptions, ...(opt ?? {}) };

  const _value = ref(
    (getCacheOrNull("checkedKinds", cacheOption) as number[]) ?? defaul
  );
  return computed({
    get() {
      return _value.value;
    },
    set(v) {
      _value.value = v;
      setCache("checkedKinds", v, cacheOption);
    },
  });
}
export function useCanceleableClick(
  target: Ref<HTMLElement | null | undefined>,
  onClick: () => void
) {
  useEventListener(target, "mousedown", clickStart, { passive: true });
  useEventListener(target, "touchstart", clickStart, { passive: true });
  const isPress = ref(false);
  function clickStart() {
    addCancelListener();
    isPress.value = true;
  }
  let id: any;
  async function addCancelListener() {
    const _target = target.value;
    if (!_target) return;

    _target.addEventListener("click", checkClick, { once: true });

    _target.addEventListener("mousemove", cancelClick, {
      once: true,
      passive: true,
    });
    _target.addEventListener("touchmove", cancelClick, {
      once: true,
      passive: true,
    });
    _target.addEventListener("touchcancel", cancelClick, {
      once: true,
      passive: true,
    });

    clearTimeout(id);
    id = setTimeout(() => {
      cancelClick();
    }, 500);
  }
  function cancelClick() {
    isPress.value = false;
  }
  function checkClick(e: any) {
    if (!isPress.value) return;
    e.stopPropagation();
    isPress.value = false;
    onClick();
  }
  return { isPress };
}
export function useAsyncComputed<
  T,
  D,
  Sources extends Array<Ref<any> | (() => any)> = []
>(
  fn: (gets: {
    [key in keyof Sources]: Sources[key] extends Ref<infer V>
      ? () => V
      : Sources[key];
  }) => Promise<T>,
  opt?: { default?: D; sources?: Sources }
): ComputedRef<T | D> {
  const v = ref<any>();
  const flag = ref(false);
  async function renew() {
    v.value = await fn(gets as any);
  }
  const sourceList = ref(new Set());
  let stop: WatchStopHandle | undefined;
  watch(sourceList, () => {
    stop?.();
    stop = watch(sourceList.value, () => {
      renew();
    });
  });

  watch(sourceList.value, () => {
    renew();
  });

  const gets =
    opt?.sources?.map((source) => {
      if (isRef(source)) {
        return () => {
          watch(source, () => {
            flag.value = !flag.value;
          });
          sourceList.value.add(source);
          return source.value;
        };
      } else {
        return () => {
          sourceList.value.add(source);
          source();
        };
      }
    }) ?? [];
  const value = computed(() => {
    renew();
    return v.value ?? opt?.default;
  });
  return value as any;
}
