import { Event } from "nostr-tools";
import { createGarbageFilter } from "../createGarbageFilter";

it("createGarbageFilter", () => {
  const staff = createGarbageFilter();
  expect(staff).toMatchInlineSnapshot(`
    {
      "push": [Function],
    }
  `);
});

it("createGarbageFilter:push", () => {
  const staff = createGarbageFilter();
  expect(staff).toMatchInlineSnapshot(`
    {
      "push": [Function],
    }
  `);
  const list: Event[] = [];
  const beltline = {
    getList() {
      return list;
    },
  } as any;
  beltline.feat = {
    beltline,
  };
  const mockLine = {
    beltline,
  } as any;

  expect(
    staff.push.call(mockLine, {
      id: "1",
      content: "1",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    })
  ).toMatchInlineSnapshot("undefined");

  expect(
    staff.push.call(mockLine, {
      id: "2",
      content: "1",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    })
  ).toMatchInlineSnapshot("1");
  expect(
    staff.push.call(mockLine, {
      id: "3",
      content: "2",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    })
  ).toMatchInlineSnapshot("undefined");
});
