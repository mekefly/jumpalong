import { timeout } from "../../utils/utils";
import { blockRequest, expectCalled } from "../../utils/vitest";
import { createEventBeltline } from "../createEventBeltline";
import { EventBeltline } from "../eventBeltline";
it("EventBeltline:1", () => {
  const restList: any[] = [];
  new EventBeltline({
    sub(...rest) {
      restList.push(rest);
    },
  }).addFilter({ ids: ["33434378907"] });
  expect(restList).toMatchInlineSnapshot(`
    [
      [
        [
          {
            "ids": [
              "33434378907",
            ],
          },
        ],
        {
          "sub": [Function],
        },
      ],
    ]
  `);
});
it("EventBeltline:new", async () => {
  const restList: any[] = [];
  const { expectCalled: called, fn } = expectCalled((event: any) => {
    restList.push(event);
  }, 1);
  const beltline = new EventBeltline({
    async sub(filters, opts) {},
  })
    .addStaff({
      push: (...rest) => {
        fn(...rest);
      },
    })
    .addFilter({ ids: ["测试id1"] });

  xxx();
  async function xxx() {
    await timeout(100);
    beltline.pushEvent({
      id: "测试id1",
      pubkey: "测试pubkey1",
      created_at: 999,
      kind: 3,
      sig: "测试sig1",
      tags: [],
    } as any);

    await timeout(100);

    beltline.pushEvent({
      id: "测试id2",
      pubkey: "测试pubkey1",
      created_at: 999,
      kind: 3,
      sig: "测试sig1",
      tags: [],
    } as any);
  }

  await called();

  expect(restList).toMatchInlineSnapshot(`
    [
      {
        "created_at": 999,
        "id": "测试id1",
        "kind": 3,
        "pubkey": "测试pubkey1",
        "sig": "测试sig1",
        "tags": [],
      },
    ]
  `);
});

it("EventBeltline:sortByCreateAt", async () => {
  const { expectCalled: called, fn } = expectCalled((event: any) => {}, 3);
  const beltline = new EventBeltline({
    async sub(filters, opts) {},
  })
    .addStaff({
      push(...rest) {
        fn(...rest);
      },
    })
    .addStaffOfSortByCreateAt();

  beltline.pushEvent({
    id: "测试id1",
    pubkey: "测试pubkey1",
    created_at: 103,
    kind: 3,
    sig: "测试sig1",
    tags: [],
  } as any);
  beltline.pushEvent({
    id: "测试id1",
    pubkey: "测试pubkey1",
    created_at: 999,
    kind: 3,
    sig: "测试sig1",
    tags: [],
  } as any);
  beltline.pushEvent({
    id: "测试id1",
    pubkey: "测试pubkey1",
    created_at: 998,
    kind: 3,
    sig: "测试sig1",
    tags: [],
  } as any);

  await called();

  expect(beltline.getList()).toMatchInlineSnapshot(`
    [
      {
        "created_at": 103,
        "id": "测试id1",
        "kind": 3,
        "pubkey": "测试pubkey1",
        "sig": "测试sig1",
        "tags": [],
      },
      {
        "created_at": 998,
        "id": "测试id1",
        "kind": 3,
        "pubkey": "测试pubkey1",
        "sig": "测试sig1",
        "tags": [],
      },
      {
        "created_at": 999,
        "id": "测试id1",
        "kind": 3,
        "pubkey": "测试pubkey1",
        "sig": "测试sig1",
        "tags": [],
      },
    ]
  `);
});

it("EventBeltline:extends", async () => {
  const restList: any[] = [];
  const { expectCalled: called, fn } = expectCalled((event: any) => {
    restList.push(event);
  }, 1);

  const beltlineparent = new EventBeltline({
    async sub(filters, opts) {},
  });

  const beltline = new EventBeltline({
    async sub(filters, opts) {},
  })
    .addStaff({
      push: (...rest) => {
        fn(...rest);
      },
    })
    .addExtends(beltlineparent);

  xxx();
  async function xxx() {
    await timeout(100);
    beltlineparent.pushEvent({
      id: "测试id1",
      pubkey: "测试pubkey1",
      created_at: 999,
      kind: 3,
      sig: "测试sig1",
      tags: [],
    } as any);

    await timeout(100);

    beltlineparent.pushEvent({
      id: "测试id2",
      pubkey: "测试pubkey1",
      created_at: 999,
      kind: 3,
      sig: "测试sig1",
      tags: [],
    } as any);
  }

  await called();

  expect(restList).toMatchInlineSnapshot(`
    [
      {
        "created_at": 999,
        "id": "测试id1",
        "kind": 3,
        "pubkey": "测试pubkey1",
        "sig": "测试sig1",
        "tags": [],
      },
    ]
  `);
});

it("addRelayUrls", async () => {
  const arr: any[] = [];
  blockRequest({
    req(filter) {
      arr.push(filter);
      return "testId";
    },
  });
  createEventBeltline()
    .addFilter({ kinds: [0] })
    .addRelayUrls(new Set(["wss://test.com"]));

  await timeout(1000);
  expect(arr).toMatchInlineSnapshot(`
    [
      [
        {
          "kinds": [
            0,
          ],
        },
      ],
    ]
  `);
});

it("addRelayUrls", async () => {
  const arr: any[] = [];
  blockRequest({
    req(filter) {
      arr.push(filter);
      return "testId";
    },
  });
  createEventBeltline()
    .addFilter({ kinds: [0] })
    .addRelayUrls(new Set(["wss://test.com"]))
    .addRelayUrls(new Set(["wss://yy.com"]))
    .addRelayUrls(new Set(["wss://test.com"]));

  await timeout(1000);
  expect(arr).toMatchInlineSnapshot(`
    [
      [
        {
          "kinds": [
            0,
          ],
        },
      ],
      [
        {
          "kinds": [
            0,
          ],
        },
      ],
    ]
  `);
});
