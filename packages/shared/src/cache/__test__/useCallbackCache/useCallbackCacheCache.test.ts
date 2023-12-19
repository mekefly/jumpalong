import MockDate from "mockdate";
import { clearMemoryCache } from "../..";
import { clearLocalStorage, expectCalled } from "../../../vitest";
import { useCallbackCache } from "../../useCallbackCache";

beforeEach(() => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);
  clearLocalStorage();
  clearMemoryCache();
});

it("useCallbackCache:cache", async () => {
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {},
    }
  `);

  let v1: any;
  let { fn: f, expectCalled: status } = expectCalled((e: string) => {
    v1 = e;
  });
  useCallbackCache(
    "test2",
    (options: { even: (e: string) => void }) => {
      setTimeout(() => {
        options.even("333");
      }, 100);
    },
    {},
    {
      even: f,
    }
  );
  await status();

  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {
        "__cache_key_list_": "[\\"test2\\",\\"return:test2\\"]",
        "return:test2": "{\\"updateTime\\":1677034530000,\\"duration\\":3600000}",
        "test2": "{\\"value\\":{\\"even\\":[[\\"333\\"]]},\\"updateTime\\":1677034530000,\\"duration\\":3600000}",
      },
    }
  `);

  let v2: any;
  const { fn: f2, expectCalled: s2 } = expectCalled((e: string) => {
    v2 = e;
  });
  useCallbackCache(
    "test2",
    (options: { even: (e: string) => void }) => {
      setTimeout(() => {
        options.even("222");
      }, 100);
    },
    {},
    {
      even: f2,
    }
  );
  await s2();
  expect(v1 === v2).toMatchInlineSnapshot("true");
}, 5000);
