import {
  createDynamicColor,
  createDynamicRelativeValue,
  debounce,
  isNaN,
  isNumberAndNotNaN,
  prettifyStringify,
  reverseSearchInsertOnObjectList,
  searchInsertOnObjectList,
  timeout,
  withDefault,
} from "../utils";

it("withDefault", () => {
  expect(withDefault({ xyz: "3" }, { zzz: "2", xyz: "4" }))
    .toMatchInlineSnapshot(`
    {
      "xyz": "3",
      "zzz": "2",
    }
  `);
});

it("debounce", async () => {
  let v = 0;
  const x = debounce(() => {
    v++;
  }, 100);
  x();
  expect(v).toMatchInlineSnapshot("0");

  await timeout(50);
  x();
  expect(v).toMatchInlineSnapshot("0");

  await timeout(50);
  x();
  expect(v).toMatchInlineSnapshot("0");

  await timeout(50);
  x();
  expect(v).toMatchInlineSnapshot("0");

  await timeout(200);
  expect(v).toMatchInlineSnapshot("1");
});
it("searchInsertOnObjectList", () => {
  expect(
    searchInsertOnObjectList(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      1,
      (item) => item.v
    )
  ).toMatchInlineSnapshot("0");
});
it("searchInsertOnObjectList", () => {
  expect(
    searchInsertOnObjectList(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      2,
      (item) => item.v
    )
  ).toMatchInlineSnapshot("1");
});
it("searchInsertOnObjectList", () => {
  expect(
    searchInsertOnObjectList(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      3,
      (item) => item.v
    )
  ).toMatchInlineSnapshot("2");
});

it("searchInsertOnObjectList", () => {
  expect(
    searchInsertOnObjectList(
      [
        { v: 1 }, //0
        { v: 2 }, //1
        { v: 3 }, //2
        { v: 9 }, //3
        { v: 20 }, //4
        { v: 33 },
        { v: 66 },
        { v: 88 },
        { v: 88 },
        { v: 100 },
      ],
      20,
      (item) => item.v
    )
  ).toMatchInlineSnapshot("4");
});

it("searchInsertOnObjectList", () => {
  expect(
    searchInsertOnObjectList(
      [
        { v: 1 }, //0
        { v: 2 }, //1
        { v: 3 }, //2
        { v: 9 }, //3
        { v: 20 }, //4
        { v: 33 }, //5
        { v: 66 },
        { v: 88 },
        { v: 88 },
        { v: 100 },
      ],
      21,
      (item) => item.v
    )
  ).toMatchInlineSnapshot("5");
});
it("searchInsertOnObjectList", () => {
  expect(
    searchInsertOnObjectList(
      [
        { v: 1 }, //0
        { v: 2 }, //1
        { v: 3 }, //2
        { v: 9 }, //3
        { v: 20 }, //4
        { v: 33 }, //5
        { v: 66 }, //6
        { v: 88 }, //7
        { v: 88 },
        { v: 100 },
      ],
      88,
      (item) => item.v
    )
  ).toMatchInlineSnapshot("7");
});
it("reverseSearchInsertOnObjectList", () => {
  const v = reverseSearchInsertOnObjectList(
    [
      { v: 100 }, //0
      { v: 88 }, //1
      { v: 88 }, //2
      { v: 66 }, //3
      { v: 33 }, //4
      { v: 20 }, //5
      { v: 9 }, //6
      { v: 3 }, //7
      { v: 2 }, //8
      { v: 1 }, //9
    ],
    33,
    (item) => item.v
  );
  expect(v).toMatchInlineSnapshot("4");
});

it("reverseSearchInsertOnObjectList", () => {
  const v = reverseSearchInsertOnObjectList(
    [
      { v: 100 }, //0
      { v: 88 }, //1
      { v: 88 }, //2
      { v: 66 }, //3
      { v: 33 }, //4
      { v: 20 }, //5
      { v: 9 }, //6
      { v: 3 }, //7
      { v: 2 }, //8
      { v: 1 }, //9
    ],
    32,
    (item) => item.v
  );
  expect(v).toMatchInlineSnapshot("5");
});
it("reverseSearchInsertOnObjectList", () => {
  const v = reverseSearchInsertOnObjectList(
    [
      { v: 100 }, //0
      { v: 88 }, //1
      { v: 88 }, //2
      { v: 66 }, //3
      { v: 33 }, //4
      { v: 20 }, //5
      { v: 9 }, //6
      { v: 3 }, //7
      { v: 2 }, //8
      { v: 1 }, //9
    ],
    88,
    (item) => item.v
  );
  expect(v).toMatchInlineSnapshot("2");
});
it("reverseSearchInsertOnObjectList", () => {
  const v = reverseSearchInsertOnObjectList(
    [
      { v: 100 }, //0
      { v: 88 }, //1
      { v: 88 }, //2
      { v: 66 }, //3
      { v: 33 }, //4
      { v: 20 }, //5
      { v: 9 }, //6
      { v: 3 }, //7
      { v: 2 }, //8
      { v: 1 }, //9
    ],
    100,
    (item) => item.v
  );
  expect(v).toMatchInlineSnapshot("0");
});
it("reverseSearchInsertOnObjectList", () => {
  const v = reverseSearchInsertOnObjectList(
    [
      { v: 100 }, //0
      { v: 88 }, //1
      { v: 88 }, //2
      { v: 66 }, //3
      { v: 33 }, //4
      { v: 20 }, //5
      { v: 9 }, //6
      { v: 3 }, //7
      { v: 2 }, //8
      { v: 1 }, //9
    ],
    190,
    (item) => item.v
  );
  expect(v).toMatchInlineSnapshot("0");
});

it("reverseSearchInsertOnObjectList", () => {
  const v = reverseSearchInsertOnObjectList(
    [
      { v: 100 }, //0
      { v: 88 }, //1
      { v: 88 }, //2
      { v: 66 }, //3
      { v: 33 }, //4
      { v: 20 }, //5
      { v: 9 }, //6
      { v: 3 }, //7
      { v: 2 }, //8
      { v: 1 }, //9
    ],
    1,
    (item) => item.v
  );
  expect(v).toMatchInlineSnapshot("9");
});
it("reverseSearchInsertOnObjectList", () => {
  const v = reverseSearchInsertOnObjectList(
    [
      { v: 100 }, //0
      { v: 88 }, //1
      { v: 88 }, //2
      { v: 66 }, //3
      { v: 33 }, //4
      { v: 20 }, //5
      { v: 9 }, //6
      { v: 3 }, //7
      { v: 2 }, //8
      { v: 1 }, //9
    ],
    -10,
    (item) => item.v
  );
  expect(v).toMatchInlineSnapshot("10");
});
it("reverseSearchInsertOnObjectList", () => {
  const arr: { v: number }[] = [];

  [10, 343, 4348937, 0, 3, 32].forEach((item) => {
    const index = reverseSearchInsertOnObjectList(arr, item, (item) => item.v);
    arr.splice(index, 0, { v: item });
  });

  expect(arr).toMatchInlineSnapshot(`
    [
      {
        "v": 4348937,
      },
      {
        "v": 343,
      },
      {
        "v": 32,
      },
      {
        "v": 10,
      },
      {
        "v": 3,
      },
      {
        "v": 0,
      },
    ]
  `);
});

it("searchInsertOnObjectList", () => {
  const arr: { v: number }[] = [];

  [10, 343, 4348937, 0, 3, 32].forEach((item) => {
    const index = searchInsertOnObjectList(arr, item, (item) => {
      return item.v;
    });
    arr.splice(index, 0, { v: item });
  });

  expect(arr).toMatchInlineSnapshot(`
    [
      {
        "v": 0,
      },
      {
        "v": 3,
      },
      {
        "v": 10,
      },
      {
        "v": 32,
      },
      {
        "v": 343,
      },
      {
        "v": 4348937,
      },
    ]
  `);
});
it("isNaN", () => {
  expect(isNaN(NaN)).toMatchSnapshot();
  expect(isNaN(123)).toMatchSnapshot();
  expect(isNaN("123")).toMatchSnapshot();
});

it("isNumberAndNotNaN", () => {
  expect(isNumberAndNotNaN(1)).toMatchSnapshot();
  expect(isNumberAndNotNaN(NaN)).toMatchSnapshot();
  expect(isNumberAndNotNaN("123")).toMatchSnapshot();
});
it("createDynamicColor", () => {
  expect(createDynamicColor(100, 0, 200)).toMatchSnapshot();
});
it("createDynamicRelativeValue", () => {
  expect(createDynamicRelativeValue(100, 0, 200)).toMatchSnapshot();
});
it("print", () => {
  expect(prettifyStringify({})).toMatchInlineSnapshot(`
    "{
        
    }"
  `);
});
it("print:1", () => {
  expect(
    prettifyStringify({
      xxxx: `
    `,
    })
  ).toMatchInlineSnapshot(`
    "{
        \\"xxxx\\": \\"\\\\n    \\"
    }"
  `);
});
it("print:1", () => {
  expect(prettifyStringify([])).toMatchInlineSnapshot(`
    "[
        
    ]"
  `);
});
it("print:1", () => {
  expect(prettifyStringify(["1"])).toMatchInlineSnapshot(`
    "[
        \\"1\\"
    ]"
  `);
});
it("print:1", () => {
  expect(prettifyStringify([{ x: "1" }])).toMatchInlineSnapshot(`
    "[
        {
            \\"x\\": \\"1\\"
        }
    ]"
  `);
});
