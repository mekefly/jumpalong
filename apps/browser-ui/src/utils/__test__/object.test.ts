import { objectFilter } from "../object";

test("objectFilter", () => {
  expect(objectFilter({ xx: 1 }, "xx")).toMatchInlineSnapshot(`
    {
      "xx": 1,
    }
  `);
  expect(objectFilter({ xx: 1, yy: 33 }, "number")).toMatchInlineSnapshot(
    `
    {
      "xx": 1,
      "yy": 33,
    }
  `
  );
  expect(objectFilter({ xx: 1, yy: "33" }, "number")).toMatchInlineSnapshot(
    `
    {
      "xx": 1,
    }
  `
  );
  expect(objectFilter({ xx: 1, yy: "33" }, "string")).toMatchInlineSnapshot(
    `
    {
      "yy": "33",
    }
  `
  );
  expect(objectFilter({ xx: 1, yy: Symbol() }, "string", "symbol"))
    .toMatchInlineSnapshot(`
    {
      "yy": Symbol(),
    }
  `);
  expect(objectFilter({ xx: 1, yy: () => {} }, "string", "symbol", "function"))
    .toMatchInlineSnapshot(`
    {
      "yy": [Function],
    }
  `);
  expect(objectFilter({ xx: 1, yy: function name() {} }, "function"))
    .toMatchInlineSnapshot(`
    {
      "yy": [Function],
    }
  `);
  expect(objectFilter({ xx: 1, zz: "string", yy() {} }, "function", "zz"))
    .toMatchInlineSnapshot(`
    {
      "yy": [Function],
      "zz": "string",
    }
  `);
  expect(objectFilter({ xx: 1, zz: "string", yy() {} }, "yy"))
    .toMatchInlineSnapshot(`
    {
      "yy": [Function],
    }
  `);
  expect(objectFilter({ number: "string" }, "number")).toMatchInlineSnapshot(
    `
    {
      "number": "string",
    }
  `
  );
  expect(objectFilter({ number: true }, "boolean")).toMatchInlineSnapshot(
    `
    {
      "number": true,
    }
  `
  );

  expect(objectFilter({ number: true, key: "string" }, "no:boolean"))
    .toMatchInlineSnapshot(`
    {
      "key": "string",
    }
  `);

  expect(objectFilter({ number: true }, "no:boolean", "boolean"))
    .toMatchInlineSnapshot(`
    {
      "number": true,
    }
  `);

  expect(
    objectFilter(
      { number: true, key: "string", symbol1: Symbol() },
      "no:boolean"
    )
  ).toMatchInlineSnapshot(`
    {
      "key": "string",
      "symbol1": Symbol(),
    }
  `);
  expect(
    objectFilter(
      { number: true, key: "string", symbol1: Symbol() },
      "no:boolean&no:symbol"
    )
  ).toMatchInlineSnapshot(`
    {
      "key": "string",
    }
  `);

  expect(
    objectFilter(
      { number: true, key: "string", symbol1: Symbol() },
      "no:boolean",
      "no:symbol"
    )
  ).toMatchInlineSnapshot(`
    {
      "key": "string",
      "number": true,
      "symbol1": Symbol(),
    }
  `);

  expect(
    objectFilter(
      { number: true, key: "string", symbol1: Symbol() },
      "no:boolean&no:symbol",
      "no:string&no:boolean"
    )
  ).toMatchInlineSnapshot(`
    {
      "key": "string",
      "symbol1": Symbol(),
    }
  `);
});
it('""', () => {
  expect(
    objectFilter(
      {
        number: true,
        key: "string",
        symbol1: Symbol(),
        object: { number: 33, symbol2: Symbol() },
      },
      "deep",
      "no:symbol2"
    )
  ).toMatchInlineSnapshot(`
    {
      "key": "string",
      "number": true,
      "object": {
        "number": 33,
      },
      "symbol1": Symbol(),
    }
  `);
});

it("deep", () => {
  expect(
    objectFilter(
      {
        number: true,
        key: "string",
        symbol1: Symbol(),
        object: { number: 33, symbol2: Symbol() },
      },
      "deep",
      "string",
      "object",
      "number"
    )
  ).toMatchInlineSnapshot(`
    {
      "key": "string",
      "number": true,
      "object": {
        "number": 33,
      },
    }
  `);

  expect(
    objectFilter(
      {
        number: true,
        key: "string",
        symbol1: Symbol(),
        object: { number: 33, symbol2: Symbol() },
      },
      "string",
      "object",
      "number",
      "deep"
    )
  ).toMatchInlineSnapshot(`
    {
      "key": "string",
      "number": true,
      "object": {
        "number": 33,
      },
    }
  `);
});
it("deep Circular Dependency", () => {
  let xxx = { zzz: "string" } as any;
  let yyy = {} as any;
  xxx.yyy = yyy;
  yyy.xxx = xxx;
  expect(objectFilter(xxx, "deep", "xxx", "yyy")).toMatchInlineSnapshot(`
    {
      "yyy": {
        "xxx": [Circular],
      },
    }
  `);
});
