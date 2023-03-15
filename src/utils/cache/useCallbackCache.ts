import { withDefault } from "../utils";
import { defaultCacheOptions } from "./defaultCacheOptions";
import { AsyncReCacheOptions } from "./types";
import { autoReCache, getCache, setCache } from "./useCache";

export function useCallbackCache<E, REST extends any[], C extends object>(
  key: string,
  genValue: (callback: C, ...rest: REST) => E,
  options: AsyncReCacheOptions = defaultCacheOptions,
  callback: C,
  ...rest: REST
): E {
  withDefault(options, defaultCacheOptions);
  let callbackList: any;
  if (options?.requestMerge) {
    callbackList = getCallbackList<C>(options, key, callback);
  }

  const RETURN_KEY = "return:" + key;
  try {
    const value = getCache(key, options) as any;

    try {
      const returnValue = getCache(RETURN_KEY, options) as any;
      callCallback<C>(value, callback);

      return returnValue;
    } catch (error) {
      callCallback<C>(value, callback);

      //没有returnValue的原因是因为returnValue可能是promise,这时候会拦截下来，进入promise等待恢复列表，
      //这里autoReCache的参数并不重要，重要的是，得到合并promise请求所生成的promise
      return autoReCache(RETURN_KEY, genValue, options as any, [
        callback,
        ...rest,
      ]);
    }
  } catch (error) {
    const restListMap = {} as any;

    const callbackProxy = callbackProxyFactory<C>(
      options,
      key,
      callback,
      restListMap,
      callbackList
    );

    //加入缓存空数组是因为，未来所有此请求都会优先读取缓存
    setCache(key, restListMap, options);

    return autoReCache(RETURN_KEY, genValue, options as any, [
      callbackProxy,
      ...rest,
    ]);
  }
}

export function callCallback<C extends object>(value: any, callback: C) {
  setTimeout(() => {
    for (const key in value) {
      const c = (callback as any)[key];
      if (typeof c === "function") {
        const restList = value[key];
        if (!restList) continue;
        for (const rest of restList) {
          c(...rest);
        }
      }
    }
  }, 0);
}

export function callbackProxyFactory<C extends object>(
  options: AsyncReCacheOptions | undefined,
  key: string,
  callback: C,
  restListMap: any,
  callbackList: any
) {
  let genCallbackFunciton: any = genCallbackFactory<C>(
    options,
    key,
    callback,
    callbackList
  );
  const callBackProxy = new Proxy(callback, {
    get(t: any, p) {
      const callbackFunciton = genCallbackFunciton(p);

      if (typeof (callback as any)[p] === "function") {
        return (...rest: any) => {
          // rest push 到 restList里面
          (restListMap[p] ?? (restListMap[p] = [])).push(rest);
          setCache(key, restListMap, options);
          return callbackFunciton(...rest);
        };
      }
      return (callback as any)[p];
    },
  });
  return callBackProxy;
}

function genCallbackFactory<C extends object>(
  options: AsyncReCacheOptions | undefined,
  key: string,
  callback: C,
  callbackList: any
) {
  let genCallbackFunciton: any;
  if (options?.requestMerge) {
    genCallbackFunciton =
      (p: string) =>
      (...rest: any) =>
        callbackList.forEach((t: any) => {
          t[p](...rest);
        });
  } else {
    genCallbackFunciton =
      (p: string) =>
      (...rest: any) =>
        (callback as any)[p](...rest);
  }
  return genCallbackFunciton;
}

export function getCallbackList<C extends object>(
  options: AsyncReCacheOptions | undefined,
  key: string,
  callback: C
) {
  const callbackListKey = `callbackList:${key}`;
  const callbackListOptions = {
    ...options,
    useLocalStorage: false,
  };
  let v;
  try {
    v = getCache(callbackListKey, callbackListOptions) as any;
  } catch (error) {
    setCache(callbackListKey, (v = []), callbackListOptions);
  }
  v.push(callback);
  return v;
}
