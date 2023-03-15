import { nip19 } from "nostr-tools";
import { getIncludeMergeByFilters, toDeCodeNevent } from "../nostr";

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
  expect(v).toMatchInlineSnapshot("Set {}");
});

it("toDeCodeNevent:nexid", () => {
  const v = toDeCodeNevent(
    "9c5d16b14e85dbceda6ce7707e82e4ac7a494438e4e028f0496f634be6915e1f"
  );
  expect(v).toMatchInlineSnapshot(`
    {
      "id": "9c5d16b14e85dbceda6ce7707e82e4ac7a494438e4e028f0496f634be6915e1f",
      "relays": [],
    }
  `);
});

it("toDeCodeNevent:nevent", () => {
  const v = toDeCodeNevent(
    "nevent1qqsfchgkk98gtk7wmfkwwur7stj2c7jfgsuwfcpg7pyk7c6tu6g4u8cqtgcua"
  );

  expect(v).toMatchInlineSnapshot(`
    {
      "id": "9c5d16b14e85dbceda6ce7707e82e4ac7a494438e4e028f0496f634be6915e1f",
      "relays": [],
    }
  `);
});
it("neventEncode", () => {
  const v = nip19.neventEncode({
    id: "74528c16968c83b4e50df33eb278df92c73bf3cb2baee8cefb1e194588d0cd76",
  });
  expect(v).toMatchInlineSnapshot(
    '"nevent1qqs8g55vz6tgeqa5u5xlx04j0r0e93em709jhthgema3ux293rgv6as07fdyg"'
  );
  const v1 = nip19.decode(v);
  expect(v1).toMatchInlineSnapshot(`
    {
      "data": {
        "id": "74528c16968c83b4e50df33eb278df92c73bf3cb2baee8cefb1e194588d0cd76",
        "relays": [],
      },
      "type": "nevent",
    }
  `);
});
