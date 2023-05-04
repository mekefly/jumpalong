import { Event } from "nostr-tools";
import PopLimit from "../PopLimit";

it("PopLimit", () => {
  const state = PopLimit(10);
  expect(state).toMatchInlineSnapshot(`
    {
      "feat": {
        "onLimitPop": [Function],
      },
      "push": [Function],
    }
  `);
});
it("PopLimit:Push", () => {
  const state = PopLimit(10);
  const list: Event[] = [];

  const mockLine = {
    beltline: {
      feat: {},
      getList() {
        return list;
      },
    },
  } as any;
  for (const v of Array.from({ length: 30 }, (itme, index) => index)) {
    const event = {
      id: v.toString(),
      content: v.toString(),
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: 1683187195 + v,
    };
    state.push.call(mockLine, event, list);
    list.push(event);
  }
  expect(list).toMatchInlineSnapshot(`
    [
      {
        "content": "20",
        "created_at": 1683187215,
        "id": "20",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
      {
        "content": "21",
        "created_at": 1683187216,
        "id": "21",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
      {
        "content": "22",
        "created_at": 1683187217,
        "id": "22",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
      {
        "content": "23",
        "created_at": 1683187218,
        "id": "23",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
      {
        "content": "24",
        "created_at": 1683187219,
        "id": "24",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
      {
        "content": "25",
        "created_at": 1683187220,
        "id": "25",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
      {
        "content": "26",
        "created_at": 1683187221,
        "id": "26",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
      {
        "content": "27",
        "created_at": 1683187222,
        "id": "27",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
      {
        "content": "28",
        "created_at": 1683187223,
        "id": "28",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
      {
        "content": "29",
        "created_at": 1683187224,
        "id": "29",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
    ]
  `);
});

it("PopLimit:onLimitPop", () => {
  const state = PopLimit(10);
  const list: Event[] = [];

  const mockLine = {
    beltline: {
      feat: {},
      getList() {
        return list;
      },
    },
  } as any;
  state.feat.onLimitPop.call(mockLine, (event) => {
    expect(event).toMatchSnapshot();
  });
  for (const v of Array.from({ length: 15 }, (itme, index) => index)) {
    const event = {
      id: v.toString(),
      content: v.toString(),
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: 1683187195 + v,
    };
    state.push.call(mockLine, event, list);
    list.push(event);
  }
});
