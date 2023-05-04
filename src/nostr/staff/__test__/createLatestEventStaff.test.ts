import { Event } from "nostr-tools";
import { createLatestEventStaff } from "../createLatestEventStaff";
import { StaffState } from "../Staff";

it("createLatestEventStaff", () => {
  expect(createLatestEventStaff()).toMatchInlineSnapshot(`
    {
      "feat": {
        "getLatestEvent": [Function],
        "isHas": [Function],
        "onHasLatestEvent": [Function],
        "onHasLatestEventOnce": [Function],
        "onUpdated": [Function],
      },
      "initialization": [Function],
      "push": [Function],
    }
  `);
});

it("createLatestEventStaff:push", () => {
  const staff = createLatestEventStaff();
  const list: Event[] = [];
  const mockLine = { beltline: { feat: {} } } as any;
  staff.initialization.call(mockLine);
  expect(mockLine).toMatchInlineSnapshot(`
    {
      "beltline": {
        "feat": {
          "pushEvent": [Function],
        },
      },
    }
  `);
  const pushEvent = mockLine.beltline.feat.pushEvent;
  //首次插入数据
  pushEvent.call(
    mockLine,
    {
      id: "1",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );
  expect(list).toMatchInlineSnapshot(`
    [
      {
        "content": "",
        "created_at": 1683187195000,
        "id": "1",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
    ]
  `);

  //插入同样的数据
  pushEvent.call(
    {} as any,
    {
      id: "1",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );
  expect(list).toMatchInlineSnapshot(`
    [
      {
        "content": "",
        "created_at": 1683187195000,
        "id": "1",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
    ]
  `);

  //插入更早的数据
  pushEvent.call(
    {} as any,
    {
      id: "2",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000 - 1).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );
  expect(list).toMatchInlineSnapshot(`
    [
      {
        "content": "",
        "created_at": 1683187195000,
        "id": "1",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
    ]
  `);

  //插入更新数据
  pushEvent.call(
    {} as any,
    {
      id: "3",
      content: "content3",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000 + 1).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );

  //此应该更新
  expect(list).toMatchInlineSnapshot(`
    [
      {
        "content": "content3",
        "created_at": 1683187195001,
        "id": "3",
        "kind": 3,
        "pubkey": "p",
        "sig": "33",
        "tags": [],
      },
    ]
  `);
});

it("createLatestEventStaff:feat:isHas", () => {
  const staff = createLatestEventStaff();
  const list: Event[] = [];
  const mockLine = {
    beltline: {
      feat: {},
      getList() {
        return list;
      },
    },
  } as any;
  staff.initialization.call(mockLine);
  expect(mockLine).toMatchInlineSnapshot(`
    {
      "beltline": {
        "feat": {
          "pushEvent": [Function],
        },
        "getList": [Function],
      },
    }
  `);
  const pushEvent = mockLine.beltline.feat.pushEvent;
  expect(staff.feat.isHas.call(mockLine)).toMatchInlineSnapshot("false");
  //首次插入数据
  pushEvent.call(
    mockLine,
    {
      id: "1",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );
  expect(staff.feat.isHas.call(mockLine)).toMatchInlineSnapshot("true");
});

it("createLatestEventStaff:feat:getLatestEvent", () => {
  const staff = createLatestEventStaff();
  const list: Event[] = [];
  const mockLine = {
    beltline: {
      feat: {},
      getList() {
        return list;
      },
    },
  } as any;
  staff.initialization.call(mockLine);
  expect(mockLine).toMatchInlineSnapshot(`
    {
      "beltline": {
        "feat": {
          "pushEvent": [Function],
        },
        "getList": [Function],
      },
    }
  `);
  const pushEvent = mockLine.beltline.feat.pushEvent;
  expect(staff.feat.getLatestEvent.call(mockLine)).toMatchInlineSnapshot(
    "undefined"
  );
  //首次插入数据
  pushEvent.call(
    mockLine,
    {
      id: "1",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );
  expect(staff.feat.getLatestEvent.call(mockLine)).toMatchInlineSnapshot(
    `
    {
      "content": "",
      "created_at": 1683187195000,
      "id": "1",
      "kind": 3,
      "pubkey": "p",
      "sig": "33",
      "tags": [],
    }
  `
  );
});

it("createLatestEventStaff:feat:onUpdated", () => {
  const staff = createLatestEventStaff();
  const list: Event[] = [];
  const mockLine = {
    beltline: {
      feat: {},
      getList() {
        return list;
      },
    },
  } as any;
  staff.initialization.call(mockLine);
  expect(mockLine).toMatchInlineSnapshot(`
    {
      "beltline": {
        "feat": {
          "pushEvent": [Function],
        },
        "getList": [Function],
      },
    }
  `);
  const pushEvent = mockLine.beltline.feat.pushEvent;
  staff.feat.onUpdated.call(mockLine, (...rest) => {
    expect(rest).toMatchSnapshot();
  });
  //首次插入数据
  pushEvent.call(
    mockLine,
    {
      id: "1",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );

  //同样数据
  pushEvent.call(
    mockLine,
    {
      id: "1",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );

  //之前数据
  pushEvent.call(
    mockLine,
    {
      id: "2",
      content: "2",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000 - 1).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );

  pushEvent.call(
    mockLine,
    {
      id: "3",
      content: "3",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000 + 1).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );
});

it("createLatestEventStaff:feat:onHasLatestEvent", () => {
  const staff = createLatestEventStaff();
  const list: Event[] = [];
  const mockLine = {
    beltline: {
      feat: {},
      getList() {
        return list;
      },
    },
  } as any;
  staff.initialization.call(mockLine);
  const pushEvent = mockLine.beltline.feat.pushEvent;
  staff.feat.onHasLatestEvent.call(mockLine, (...rest) => {
    expect(rest).toMatchSnapshot();
  });
  //首次插入数据
  pushEvent.call(
    mockLine,
    {
      id: "1",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );
  staff.feat.onHasLatestEvent.call(mockLine, (...rest) => {
    expect(rest).toMatchSnapshot();
  });
});

it("createLatestEventStaff:feat:onHasLatestEventOnce", () => {
  const staff = createLatestEventStaff();
  const list: Event[] = [];
  const mockLine = {
    beltline: {
      feat: {},
      getList() {
        return list;
      },
    },
  } as any;
  staff.initialization.call(mockLine);
  const pushEvent = mockLine.beltline.feat.pushEvent;
  staff.feat.onHasLatestEvent.call(mockLine, (...rest) => {
    expect(rest).toMatchSnapshot();
  });
  //首次插入数据
  pushEvent.call(
    mockLine,
    {
      id: "1",
      content: "",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );
  staff.feat.onHasLatestEvent.call(mockLine, (...rest) => {
    expect(rest).toMatchSnapshot();
  });

  //首次插入数据
  pushEvent.call(
    mockLine,
    {
      id: "3",
      content: "更新",
      kind: 3,
      pubkey: "p",
      sig: "33",
      tags: [],
      created_at: new Date(1683187195 * 1000 + 1).getTime(),
    },
    list,
    { lastState: StaffState.NEXT }
  );
});
