import { Event } from "nostr-tools";
import createWithEvent from "../createWithEvent";

it("createWithEvent", () => {
  const staff = createWithEvent();
  expect(staff).toMatchInlineSnapshot(`
    {
      "feat": {
        "timeoutWithEvent": [Function],
        "withEvent": [Function],
      },
    }
  `);
});

it("createWithEvent:withEvent", () => {
  const staff = createWithEvent();
  const list: Event[] = [];

  const beltline = {
    getList() {
      return list;
    },
  } as any;
  beltline.feat = {
    ...staff.feat,
    beltline,
  };
  const mockLine = {
    beltline,
  } as any;
  expect(staff.feat.withEvent.call(mockLine)).toMatchInlineSnapshot("false");
  list.push({
    id: "1",
    content: "",
    kind: 3,
    pubkey: "p",
    sig: "33",
    tags: [],
    created_at: new Date(1683187195 * 1000).getTime(),
  });
  expect(staff.feat.withEvent.call(mockLine)).toMatchInlineSnapshot("true");
});

it("createWithEvent:timeoutWithEvent", async () => {
  const staff = createWithEvent();
  const list: Event[] = [];
  const beltline = {
    getList() {
      return list;
    },
  } as any;
  beltline.feat = {
    ...staff.feat,
    beltline,
  };
  const mockLine = {
    beltline,
  } as any;
  //0秒后执行添加
  setTimeout(() => {
    list.push({
      id: "1",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    });
  });
  //10毫秒后执行检查，应该为true
  expect(
    await staff.feat.timeoutWithEvent.call(mockLine, 10)
  ).toMatchInlineSnapshot("true");
});
