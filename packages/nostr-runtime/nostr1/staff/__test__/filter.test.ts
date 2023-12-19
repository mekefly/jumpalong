import { filterTags, toFilter } from "../createFilterStaff";
it("toFilter", () => {
  expect(
    toFilter(
      {
        id: "343473047384730",
        kind: 40,
        content: "content",
        pubkey: "34839403",
        tags: [] as any,
        sig: "347389403",
        created_at: 434389437483,
      },
      {},
      1
    )
  ).toMatchInlineSnapshot("true");
});
it("toFilter:bug1", () => {
  expect(
    toFilter(
      {
        content: "On nostr we buy followers with full transparency",
        created_at: 1677829942,
        id: "56cf0971d4efe514649c51253828d77a697be1032435cf5965205ea52cd5bef8",
        kind: 1,
        pubkey:
          "ae44681bb75c03a96f3af62e88b6d80de6d3f223f2d9459a31823e37bd27918d",
        sig: "cd751cd39bdabdaa95f0231f8a82d0aabda7db14c5d5fe48cffa92cc38276e7802855fd497de0e9b5ce9abd9357c345393b2eba1bba873114823b13db0aae8a9",
        tags: [
          [
            "e",
            "a92843e0dce0e2573b2ea2b6023071dea784e02af3c8e8dd7804801308159ce4",
          ],
          [
            "p",
            "2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2",
          ],
        ],
      },
      {
        kinds: [1],
        limit: 20,
        since: 1678267441,
      },
      1
    )
  ).toMatchInlineSnapshot('false');
});
it("toFilter:ids:[]", () => {
  expect(
    toFilter(
      {
        id: "343473047384730",
        kind: 1,
        content: "content",
        pubkey: "34839403",
        tags: [] as any,
        sig: "347389403",
        created_at: 434389437483,
      },
      { kinds: [1], authors: undefined, limit: 20 },
      1
    )
  ).toMatchInlineSnapshot("true");
});
it("toFilter:ids", () => {
  expect(
    toFilter(
      {
        id: "343473047384730",
        kind: 40,
        content: "content",
        pubkey: "34839403",
        tags: [] as any,
        sig: "347389403",
        created_at: 434389437483,
      },
      { ids: ["343473047384730"] },
      1
    )
  ).toMatchInlineSnapshot("true");
});
it("toFilter:ids:false", () => {
  expect(
    toFilter(
      {
        id: "343473047384730",
        kind: 40,
        content: "content",
        pubkey: "34839403",
        tags: [] as any,
        sig: "347389403",
        created_at: 434389437483,
      },
      { ids: ["1123"] },
      1
    )
  ).toMatchInlineSnapshot("false");
});
it("toFilter:kind", () => {
  expect(
    toFilter(
      {
        id: "343473047384730",
        kind: 40,
        content: "content",
        pubkey: "34839403",
        tags: [] as any,
        sig: "347389403",
        created_at: 434389437483,
      },
      { kinds: [40, 20] },
      1
    )
  ).toMatchInlineSnapshot("true");
});
it("toFilter:kind:false", () => {
  expect(
    toFilter(
      {
        id: "343473047384730",
        kind: 40,
        content: "content",
        pubkey: "34839403",
        tags: [] as any,
        sig: "347389403",
        created_at: 434389437483,
      },
      { kinds: [20] },
      1
    )
  ).toMatchInlineSnapshot("false");
});

it("toFilter:limit:false", () => {
  expect(
    toFilter(
      {
        id: "343473047384730",
        kind: 40,
        content: "content",
        pubkey: "34839403",
        tags: [] as any,
        sig: "347389403",
        created_at: 434389437483,
      },
      {
        limit: 1,
      },
      1
    )
  ).toMatchInlineSnapshot("false");
});

it("filterTags", () => {
  expect(filterTags({ "#e": ["1123"] }, [["e", "1123"]])).toMatchInlineSnapshot(
    "true"
  );
});
it("filterTags:{}", () => {
  expect(filterTags({}, [["e", "1123"]])).toMatchInlineSnapshot("true");
});
it("filterTags:4456-1123", () => {
  expect(filterTags({ "#e": ["4456"] }, [["e", "1123"]])).toMatchInlineSnapshot(
    "false"
  );
});
it("filterTags:mut", () => {
  expect(
    filterTags({ "#e": ["4456"] }, [
      ["e", "1123"],
      ["p", "37843043"],
    ])
  ).toMatchInlineSnapshot("false");
});
it("filterTags:mut", () => {
  expect(
    filterTags(
      {
        "#e": ["4456"],
        "#p": ["37843043"],
      },
      [
        ["e", "1123"],
        ["p", "37843043"],
      ]
    )
  ).toMatchInlineSnapshot("false");
});

it("filterTags:mut", () => {
  expect(
    filterTags(
      {
        "#e": ["1123"],
        "#p": ["37843043"],
      },
      [
        ["e", "1123"],
        ["p", "37843043"],
      ]
    )
  ).toMatchInlineSnapshot("true");
});

it("filterTags:mut", () => {
  expect(
    filterTags(
      {
        "#e": ["1123", "4456"],
        "#p": ["37843043"],
      },
      [
        ["e", "1123"],
        ["p", "37843043"],
      ]
    )
  ).toMatchInlineSnapshot("true");
});
