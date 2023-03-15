import MockDate from "mockdate";
import { clearLocalStorage } from "../../vitest";
import {
  checkCache,
  clearMemoryCache,
  createCache,
  getCache,
  isCache,
  setCache,
  setLocalStorage,
  useAsyncCache,
} from "../index";
import { useCache } from "../useCache";

beforeEach(() => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);
  clearLocalStorage();
  clearMemoryCache();
});

it("localStorage", () => {
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {},
    }
  `);
});
it("createCache", () => {
  clearLocalStorage();
  let xx = createCache("测试");
  expect(xx.duration).toMatchInlineSnapshot("3600000");
  expect(xx.value).toMatchInlineSnapshot('"测试"');

  xx = createCache("测试1", 100);
  expect(xx.duration).toMatchInlineSnapshot("100");
  expect(xx.value).toMatchInlineSnapshot('"测试1"');
});
it("isLocalCache", () => {
  let xx = createCache("测试");
  expect(isCache(xx)).toMatchInlineSnapshot("true");

  xx = createCache("测试", 11);
  expect(isCache(xx)).toMatchInlineSnapshot("true");

  expect(isCache({})).toMatchInlineSnapshot("false");
});
it("checkLocalCache", () => {
  let xx = createCache("测试");
  expect(checkCache(xx)).toMatchInlineSnapshot("undefined");

  xx = createCache("测试", 0);
  expect(() => checkCache(xx)).toThrowErrorMatchingInlineSnapshot(
    "Symbol(noCache)"
  );
});
it("setLocalStorage", () => {
  clearLocalStorage();
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {},
    }
  `);

  setLocalStorage("test", { x: 3 });
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {
        "__cache_key_list_": "[\\"test\\"]",
        "test": "{\\"x\\":3}",
      },
    }
  `);
  setLocalStorage("test", 3);
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {
        "__cache_key_list_": "[\\"test\\"]",
        "test": "3",
      },
    }
  `);
  setLocalStorage("test343", [1, 2, 3]);
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {
        "__cache_key_list_": "[\\"test\\",\\"test343\\"]",
        "test": "3",
        "test343": "[1,2,3]",
      },
    }
  `);
});

it("MockDate", () => {
  clearLocalStorage();
  // expect(getCache("test")).toMatchInlineSnapshot();
  expect(new Date(1677034530 * 1000)).toMatchInlineSnapshot(
    "2023-02-22T02:55:30.000Z"
  );

  MockDate.set(new Date("2023-02-22T02:55:30.000Z"));
  expect(Date.now()).toMatchInlineSnapshot("1677034530000");
  expect(Date.now()).toMatchInlineSnapshot("1677034530000");
});
it("setCache", () => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);

  clearLocalStorage();
  clearMemoryCache();

  setCache("test1", "value1", {
    useLocalStorage: true,
    useMemoryCache: true,
    duration: 10 * 1000 * 60,
  });
  MockDate.set(new Date(startDate.getTime() + 10 * 1000 * 60 - 1));
  expect(getCache("test1")).toMatchInlineSnapshot('"value1"');

  MockDate.set(new Date(startDate.getTime() + 10 * 1000 * 60 + 1));
  expect(() => getCache("test1")).toThrowErrorMatchingInlineSnapshot(
    "Symbol(noCache)"
  );
});
it("setCache:RAM", () => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);

  clearLocalStorage();
  clearMemoryCache();

  setCache("test2", "value2", {
    useLocalStorage: false,
    useMemoryCache: true,
  });

  MockDate.set(new Date(startDate.getTime() + 10 * 1000 * 60 - 1));
  expect(getCache("test2")).toMatchInlineSnapshot('"value2"');
  clearMemoryCache();
  expect(() => getCache("test2")).toThrowErrorMatchingInlineSnapshot(
    "Symbol(noCache)"
  );
});
it("setCache:localStorage", () => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);

  clearLocalStorage();
  clearMemoryCache();

  const options = {
    useLocalStorage: true,
    useMemoryCache: false,
  };
  setCache("test3", "value3", {
    useLocalStorage: true,
    useMemoryCache: false,
  });

  MockDate.set(new Date(startDate.getTime() + 10 * 1000 * 60 - 1));
  expect(getCache("test3", options)).toMatchInlineSnapshot('"value3"');
  clearLocalStorage();
  expect(() => getCache("test3")).toThrowErrorMatchingInlineSnapshot(
    "Symbol(noCache)"
  );
});
it("useCache", () => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);
  clearLocalStorage();
  clearMemoryCache();
  expect(
    useCache(
      "test",
      (v: string) => {
        return v + "f";
      },
      { duration: 10 * 1000 * 60 },
      "test"
    )
  ).toMatchInlineSnapshot('"testf"');

  //在缓存时间之内
  MockDate.set(startDate.getTime() + 10 * 1000 * 60 - 1);
  expect(
    useCache(
      "test",
      (v: string) => {
        return v + "y";
      },
      {},
      "test"
    )
  ).toMatchInlineSnapshot('"testf"');

  //缓存超时后
  MockDate.set(startDate.getTime() + 10 * 1000 * 60 + 1);
  //缓存之外应该取消缓存
  expect(
    useCache(
      "test",
      (v: string) => {
        return v + "y";
      },
      {},
      "test"
    )
  ).toMatchInlineSnapshot('"testy"');
});
it("useCache:RAM", () => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);
  clearLocalStorage();
  clearMemoryCache();
  expect(
    useCache(
      "test",
      (v: string) => {
        return v + "1";
      },
      {
        duration: 10 * 1000 * 60,
        useLocalStorage: false,
        useMemoryCache: true,
      },
      "test"
    )
  ).toMatchInlineSnapshot('"test1"');

  //在缓存时间之内
  MockDate.set(startDate.getTime() + 10 * 1000 * 60 - 1);
  expect(
    useCache(
      "test",
      (v: string) => {
        return v + "2";
      },
      {
        duration: 10 * 1000 * 60,
        useLocalStorage: false,
        useMemoryCache: true,
      },
      "test"
    )
  ).toMatchInlineSnapshot('"test1"');
  clearMemoryCache();

  expect(
    useCache(
      "test",
      (v: string) => {
        return v + "2";
      },
      {
        duration: 10 * 1000 * 60,
        useLocalStorage: false,
        useMemoryCache: true,
      },
      "test"
    )
  ).toMatchInlineSnapshot('"test2"');
});

it("useAsyncCache", async () => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);
  clearLocalStorage();
  clearMemoryCache();
  expect(
    await useAsyncCache(
      "test",
      async (v: string) => {
        return v + "1";
      },
      {
        duration: 10 * 1000 * 60,
      },
      "test"
    )
  ).toMatchInlineSnapshot('"test1"');

  MockDate.set(startDate.getTime() + 10 * 1000 * 60 - 1);
  expect(
    await useAsyncCache(
      "test",
      async (v: string) => {
        return v + "2";
      },
      {
        duration: 10 * 1000 * 60,
      },
      "test"
    )
  ).toMatchInlineSnapshot('"test1"');

  MockDate.set(startDate.getTime() + 10 * 1000 * 60 + 1);
  expect(
    await useAsyncCache(
      "test",
      async (v: string) => {
        return v + "2";
      },
      {
        duration: 10 * 1000 * 60,
      },
      "test"
    )
  ).toMatchInlineSnapshot('"test2"');
});

it("useAsyncCache:requestMerge", async () => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);
  clearLocalStorage();
  clearMemoryCache();

  const f = async () => {
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        const v = Math.random();
        //如果执行两次，就会有两个随机结果
        resolve(v);
        //模拟网络延迟
      }, Math.floor(Math.random() * 100));
    });
  };

  //如果f函数没有被合并，f是异部的，那么f将会被执行两次，得到两个随机结果，
  //正常情况应该是，f第一次执行后，第二次执行等待第一次执行的结果，并一起返回
  const v = await Promise.all([
    useAsyncCache("test", f, {
      duration: 10 * 1000 * 60,
    }),
    useAsyncCache("test", f, {
      duration: 10 * 1000 * 60,
    }),
  ]);

  expect(v[0]).toBe(v[1]);
});

it("useCache:requestMerge", async () => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);
  clearLocalStorage();
  clearMemoryCache();

  const f = async () => {
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        const v = Math.random();
        //如果执行两次，就会有两个随机结果
        resolve(v);
        //模拟网络延迟
      }, Math.floor(Math.random() * 100));
    });
  };

  //如果f函数没有被合并，f是异部的，那么f将会被执行两次，得到两个随机结果，
  //正常情况应该是，f第一次执行后，第二次执行等待第一次执行的结果，并一起返回
  const v = await Promise.all([
    useCache("test", f, {
      duration: 10 * 1000 * 60,
    }),
    useCache("test", f, {
      duration: 10 * 1000 * 60,
    }),
  ]);

  expect(v[0]).toBe(v[1]);
});
