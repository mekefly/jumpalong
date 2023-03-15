import { getIncludeMergeByFilters } from "../nostr";

it("getIncludeMergeByFilters", () => {
  const v = getIncludeMergeByFilters(
    ["#e", "ids"],
    [
      {
        "#e": ["e1"],
      },
      {
        "#e": ["e2"],
      },
      {
        ids: ["e3"],
      },
      {
        ids: ["e4"],
      },
    ]
  );
  expect(v).toMatchInlineSnapshot(`
    Set {
      "e1",
      "e2",
      "e3",
      "e4",
    }
  `);
});
it("getIncludeMergeByFilters", () => {
  const v = getIncludeMergeByFilters(
    ["#e", "ids"],
    [
      {
        "#e": ["e1"],
      },
      {
        "#p": ["p1"],
      },
      {
        authors: ["p2"],
      },
      {
        "#e": ["e2"],
      },
      {
        ids: ["e3"],
      },
      {
        ids: ["e4"],
      },
      {
        ids: ["e4"],
      },
    ]
  );
  expect(v).toMatchInlineSnapshot(`
    Set {
      "e1",
      "e2",
      "e3",
      "e4",
    }
  `);
});

it("getIncludeMergeByFilters", () => {
  const v = getIncludeMergeByFilters(
    ["#e", "ids"],
    [
      {
        kinds: [1],
        "#id": [
          "1e3fb2076907d89fbc312365b6443b19889c816207511b401c9ba31664300b22",
        ],
        limit: 10,
      },
    ]
  );
  expect(v).toMatchInlineSnapshot('Set {}');
});
