import { nip19 } from "nostr-tools";
import {
  decodeToPrikey,
  getIncludeMergeByFilters,
  toDeCodeNevent,
  toDeCodeNprofile,
} from "../nostr";

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
it("toDeCodeNprofile:nprofile", () => {
  const xx = toDeCodeNprofile(
    "nprofile1qqsf6xkkpsrcae4ndg92trgzhqd6fg8nf2jl2kcfg9p4fm9rzm7wgfcpz3mhxue69uhhyetvv9ujuerpd46hxtnfduq36amnwvaz7tmwdaehgu3dwp6kytnhv4kxcmmjv3jhytnwv46qzxrhwden5te0wfjkccte9esh2um5wf5kx6pwdejhgqgdwaehxw309ahx7uewd3hkcfppxqf"
  );
  expect(xx).toMatchInlineSnapshot(`
    {
      "pubkey": "9d1ad60c078ee6b36a0aa58d02b81ba4a0f34aa5f55b09414354eca316fce427",
      "relays": [
        "wss://relay.damus.io",
        "wss://nostr-pub.wellorder.net",
        "wss://relay.austrich.net",
        "wss://nos.lol",
      ],
    }
  `);
});
it("toDeCodeNprofile:pubkey", () => {
  const xx = toDeCodeNprofile(
    "9d1ad60c078ee6b36a0aa58d02b81ba4a0f34aa5f55b09414354eca316fce427"
  );
  expect(xx).toMatchInlineSnapshot(`
    {
      "pubkey": "9d1ad60c078ee6b36a0aa58d02b81ba4a0f34aa5f55b09414354eca316fce427",
    }
  `);
});

it("toDeCodeNprofile:npub", () => {
  const npub = nip19.npubEncode(
    "9d1ad60c078ee6b36a0aa58d02b81ba4a0f34aa5f55b09414354eca316fce427"
  );
  const xx = toDeCodeNprofile(npub);
  expect(xx).toMatchInlineSnapshot(`
    {
      "pubkey": "9d1ad60c078ee6b36a0aa58d02b81ba4a0f34aa5f55b09414354eca316fce427",
    }
  `);
});
it("decodeToPrikey", () => {
  const v = decodeToPrikey("");
  expect(v).toMatchInlineSnapshot("null");
});
it("decodeToPrikey:prikey", () => {
  const v = decodeToPrikey(
    "939ba311449bd0e79810ff408de4e2c8a5efe8423a73c87d5c75805aae4bad73"
  );
  expect(v).toMatchInlineSnapshot(
    '"939ba311449bd0e79810ff408de4e2c8a5efe8423a73c87d5c75805aae4bad73"'
  );
});
it("decodeToPrikey:nesc", () => {
  const nesc = nip19.nsecEncode(
    "939ba311449bd0e79810ff408de4e2c8a5efe8423a73c87d5c75805aae4bad73"
  );
  const v = decodeToPrikey(nesc);
  expect(v).toMatchInlineSnapshot(
    '"939ba311449bd0e79810ff408de4e2c8a5efe8423a73c87d5c75805aae4bad73"'
  );
});
it("decodeToPrikey:IllegalPrivacy", () => {
  const v = decodeToPrikey(
    "1nsec1jwd6xy2yn0gw0xqslaqgme8zezj7l6zz8feusl2uwkq94tjt44ese44gc4"
  );
  expect(v).toMatchInlineSnapshot(
    'null'
  );
});
it("decodeToPrikey:IllegalPrivacy", () => {
  const v = decodeToPrikey("4348378940322222222222222234387");
  expect(v).toMatchInlineSnapshot(
    'null'
  );
});
