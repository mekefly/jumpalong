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

it("useCallbackCache:halfway", async () => {
  let v1: any = [];
  let { fn: f, expectCalled: status } = expectCalled((e: number) => {
    v1.push(e);
  }, 2);
  const ff = async (options: { even: (e: number) => void }) => {
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
  //上面事件已经释放一个的情况下
  await timeout(50);

  let v2: any = [];
  let { fn: f2, expectCalled: status2 } = expectCalled((e: number) => {
    v2.push(e);
  }, 1);

  useCallbackCache(
    "test2",
    ff,
    {},
    {
      even: f2,
    }
  );

  await status();
  await status2();
  // 虽然他们加入的时间不一样，但最终结果是一致的

  expect(v1).toMatchInlineSnapshot(`
    [
      1,
      2,
    ]
  `);
  expect(v2).toMatchInlineSnapshot(`
    [
      1,
      2,
    ]
  `);
});
