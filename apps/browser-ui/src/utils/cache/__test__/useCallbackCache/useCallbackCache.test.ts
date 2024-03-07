import { expectCalled } from "../../../vitest";
import { useCallbackCache } from "../../useCallbackCache";

import MockDate from "mockdate";
import { clearMemoryCache } from "../..";
import { clearLocalStorage } from "../../../vitest";

beforeEach(() => {
  const startDate = new Date("2023-02-22T02:55:30.000Z");
  MockDate.set(startDate);
  clearLocalStorage();
  clearMemoryCache();
});

it("useCallbackCache", () => {
  const f = vi.fn((e) => {});
  useCallbackCache(
    "test1",
    (options: { even: (e: string) => void }) => {
      options.even("333");
    },
    {},
    {
      even: f,
    }
  );
  expect(f).toHaveBeenCalled();
}, 5000);
it("useCallbackCache:async", async () => {
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {},
    }
  `);

  const { fn: f, expectCalled: status } = expectCalled((e: string) => {});
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
}, 5000);
