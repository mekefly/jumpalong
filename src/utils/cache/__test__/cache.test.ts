import { cacheParser, cacheStringify, createCache } from "../cache";

it("createCache", () => {
  vitest.useFakeTimers({
    now: 1679491284606,
  });
  expect(createCache("value", 3000)).toMatchInlineSnapshot(`
    {
      "duration": 3000,
      "updateTime": 1679491284606,
      "value": "value",
    }
  `);
});
it("cacheStringify", () => {
  vitest.useFakeTimers({
    now: 1679491284606,
  });
  const c = createCache("value", 3000);

  expect(cacheStringify(c)).toMatchInlineSnapshot(
    '"1679491284606,3000|\\"value\\""'
  );
});

it("cacheParser", () => {
  vitest.useFakeTimers({
    now: 1679491284606,
  });
  const c = createCache("value", 3000);
  const xx = cacheStringify(c);

  expect(cacheParser(xx)).toMatchInlineSnapshot(`
    {
      "duration": 3000,
      "updateTime": 1679491284606,
      "value": "value",
    }
  `);
});

it("cacheParser:1", () => {
  vitest.useFakeTimers({
    now: 1679491284606,
  });
  const c = createCache(",fkdj", 3000);
  const xx = cacheStringify(c);

  expect(cacheParser(xx)).toMatchInlineSnapshot(`
    {
      "duration": 3000,
      "updateTime": 1679491284606,
      "value": ",fkdj",
    }
  `);
});
it("cacheParser:2", () => {
  vitest.useFakeTimers({
    now: 1679491284606,
  });
  const c = createCache({ dfdfd: "34343748937" }, 3000);
  const xx = cacheStringify(c);

  expect(cacheParser(xx)).toMatchInlineSnapshot(`
    {
      "duration": 3000,
      "updateTime": 1679491284606,
      "value": {
        "dfdfd": "34343748937",
      },
    }
  `);
});
