import MockDate from "mockdate";
import { clearMemoryCache } from "../..";
import { timeout } from "../../../utils";
import { clearLocalStorage, expectCalled } from "../../../vitest";
import { useCallbackCache } from "../../useCallbackCache";

beforeEach(() => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);
  clearLocalStorage();
  clearMemoryCache();
});

it("useCallbackCache:requestMerge", async () => {
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {},
    }
  `);

  let v1: any;
  let { fn: f, expectCalled: status } = expectCalled((e: number) => {
    v1 = e;
  });
  const ff = (options: { even: (e: number) => void }) => {
    setTimeout(() => {
      options.even(Math.random());
    }, 100);
  };
  useCallbackCache(
    "test2",
    ff,
    {},
    {
      even: f,
    }
  );
  await status();

  let v2: any;
  const { fn: f2, expectCalled: s2 } = expectCalled((e: string) => {
    v2 = e;
  });
  useCallbackCache(
    "test2",
    ff,
    {},
    {
      even: f2,
    }
  );
  await s2();
  expect(v1 === v2).toMatchInlineSnapshot("true");
}, 5000);

it("useCallbackCache:requestMerge", async () => {
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {},
    }
  `);

  let v1: any = [];
  let { fn: f, expectCalled: status } = expectCalled((e: number) => {
    v1.push(e);
  }, 2);
  const ff = async (options: { even: (e: number) => void }) => {
    await timeout(100);
    options.even(1);
    await timeout(100);
    options.even(2);
  };
  useCallbackCache(
    "test2",
    ff,
    {},
    {
      even: f,
    }
  );
  await status();
  expect(v1).toMatchInlineSnapshot(`
    [
      1,
      2,
    ]
  `);
});
