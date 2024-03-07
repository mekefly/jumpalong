import { Event } from "nostr-tools";
import { createDoNotRepeatStaff } from "../createDoNotRepeatStaff";

it("createDoNotRepeatStaff", () => {
  const staff = createDoNotRepeatStaff();
  expect(staff).toMatchInlineSnapshot(`
    {
      "push": [Function],
    }
  `);
});

it("createDoNotRepeatStaff:push", () => {
  const staff = createDoNotRepeatStaff();

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
  let event = {
    id: "1",
    content: "",
    kind: 3,
    pubkey: "p",
    sig: "33",
    tags: [],
    created_at: new Date(1683187195 * 1000).getTime(),
  };
  expect(staff.push.call(mockLine, event)).toMatchInlineSnapshot("undefined");

  expect(staff.push.call(mockLine, event)).toMatchInlineSnapshot("1");
  expect(
    staff.push.call(mockLine, {
      id: "3",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    })
  ).toMatchInlineSnapshot("undefined");
});
