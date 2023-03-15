import { EventBeltline } from "../eventBeltline";
import { RelayEmiter } from "../RelayEmiter";

function createTestEventBeltlineRoot() {
  const relayEmiter = new RelayEmiter();
  // const relayPool = new RelayPoo(relayEmiter);

  const eventBeltline = new EventBeltline({
    preventCircularReferences: true,
    relayEmiter,
  });

  relayEmiter.onEvent(({ subId, event }) => {
    eventBeltline.pushEvent(event, subId);
  });

  return { relayEmiter, eventBeltline };
}

const { relayEmiter, eventBeltline } = createTestEventBeltlineRoot();
it("EventBeltline:filter no url", () => {
  const reqList: any[] = [];
  relayEmiter.onRequest("req", (option) => {
    reqList.push(option);
  });
  eventBeltline.addFilter({ ids: ["33434378907"] });
  expect(reqList).toMatchInlineSnapshot("[]");
  relayEmiter.removeRequestAllListener("req");
});
it("EventBeltline:requist", () => {
  const reqList: any[] = [];
  relayEmiter.onRequest("req", (option) => {
    reqList.push(option);
  });
  const subIds = ["subid1", "2", "3", "4"];

  eventBeltline
    .createChild({
      idGenerator: {
        createId() {
          return subIds.pop() ?? "333";
        },
      },
    })
    .addFilter({ ids: ["33434378907"] })
    .addRelayUrls(new Set(["url1", "url2"]));
  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "33434378907",
            ],
          },
        ],
        "subId": "4",
        "url": "url1",
      },
      {
        "filters": [
          {
            "ids": [
              "33434378907",
            ],
          },
        ],
        "subId": "3",
        "url": "url2",
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
});
it("EventBeltline:Duplicate url", () => {
  const reqList: any[] = [];
  relayEmiter.onRequest("req", (option) => {
    reqList.push(option);
  });
  const subIds = ["subid1", "2", "3", "4"];
  const xxline = eventBeltline
    .createChild({
      idGenerator: {
        createId() {
          return subIds.pop() ?? "333";
        },
      },
    })
    .addFilter({ ids: ["33434378907"] })
    .addRelayUrls(new Set(["url1"]));

  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "33434378907",
            ],
          },
        ],
        "subId": "4",
        "url": "url1",
      },
    ]
  `);

  xxline.addRelayUrls(new Set(["url1"]));
  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "33434378907",
            ],
          },
        ],
        "subId": "4",
        "url": "url1",
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
});

it("EventBeltline:addRelayUrl", () => {
  const reqList: any[] = [];
  relayEmiter.onRequest("req", (option) => {
    reqList.push(option);
  });
  const subIds = ["subid1", "2", "3", "4"];
  const xxline = eventBeltline
    .createChild({
      idGenerator: {
        createId() {
          return subIds.pop() ?? "333";
        },
      },
    })
    .addFilter({ ids: ["33434378907"] })
    .addRelayUrls(new Set(["url1"]));

  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "33434378907",
            ],
          },
        ],
        "subId": "4",
        "url": "url1",
      },
    ]
  `);

  xxline.addRelayUrls(new Set(["url2"]));
  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "33434378907",
            ],
          },
        ],
        "subId": "4",
        "url": "url1",
      },
      {
        "filters": [
          {
            "ids": [
              "33434378907",
            ],
          },
        ],
        "subId": "3",
        "url": "url2",
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
});

it("EventBeltline:addFilter", () => {
  const reqList: any[] = [];
  relayEmiter.onRequest("req", (option) => {
    reqList.push(option);
  });
  const subIds = ["subid1", "2", "3", "4"];
  const xxline = eventBeltline
    .createChild({
      idGenerator: {
        createId() {
          return subIds.pop() ?? "333";
        },
      },
    })
    .addRelayUrls(new Set(["url1"]));

  expect(reqList).toMatchInlineSnapshot("[]");

  xxline.addFilter({ ids: ["test1"] });
  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "test1",
            ],
          },
        ],
        "subId": "4",
        "url": "url1",
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
});
it("EventBeltline:addFilter*2", () => {
  const reqList: any[] = [];
  relayEmiter.onRequest("req", (option) => {
    reqList.push(option);
  });
  const subIds = ["subid1", "2", "3", "4"];
  const xxline = eventBeltline
    .createChild({
      idGenerator: {
        createId() {
          return subIds.pop() ?? "333";
        },
      },
    })
    .addRelayUrls(new Set(["url1"]));

  expect(reqList).toMatchInlineSnapshot("[]");

  xxline.addFilter({ ids: ["test1"] });
  xxline.addFilter({ ids: ["test1"] });
  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "test1",
            ],
          },
        ],
        "subId": "4",
        "url": "url1",
      },
      {
        "filters": [
          {
            "ids": [
              "test1",
            ],
          },
        ],
        "subId": "3",
        "url": "url1",
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
});

it("EventBeltline:(addFilter+addRelays)*2", () => {
  const reqList: any[] = [];
  relayEmiter.onRequest("req", (option) => {
    reqList.push(option);
  });
  const subIds = ["subid1", "2", "3", "4"];
  const xxline = eventBeltline.createChild({
    idGenerator: {
      createId() {
        return subIds.pop() ?? "333";
      },
    },
  });

  xxline.addRelayUrls(new Set(["url1"]));
  expect(reqList).toMatchInlineSnapshot("[]");
  xxline.addFilter({ ids: ["filter1"] }); // 添加 filter1 url1
  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "filter1",
            ],
          },
        ],
        "subId": "4",
        "url": "url1",
      },
    ]
  `);
  reqList.length = 0;

  xxline.addRelayUrls(new Set(["url2"])); // 期待添加 filter1 url2
  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "filter1",
            ],
          },
        ],
        "subId": "3",
        "url": "url2",
      },
    ]
  `);
  reqList.length = 0;

  xxline.addFilter({ ids: ["filter2"] }); //期待添加 filter2 url1  和 filter2 url2

  expect(reqList).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "ids": [
              "filter2",
            ],
          },
        ],
        "subId": "2",
        "url": "url1",
      },
      {
        "filters": [
          {
            "ids": [
              "filter2",
            ],
          },
        ],
        "subId": "subid1",
        "url": "url2",
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
});

it("EventBeltline:closeReq", () => {
  const closeReqOptionsList: any[] = [];
  relayEmiter.onRequest("closeReq", (option) => {
    closeReqOptionsList.push(option);
  });
  const subIds = ["subid1", "2", "3", "4"];
  const xxline = eventBeltline.createChild({
    idGenerator: {
      createId() {
        return subIds.pop() ?? "333";
      },
    },
  });

  xxline.addRelayUrls(new Set(["url1"]));
  xxline.addFilter({ ids: ["filter1"] }); // 添加 filter1 url1
  xxline.closeReq();

  expect(closeReqOptionsList).toMatchInlineSnapshot(`
    [
      {
        "subId": "4",
        "url": "url1",
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
  relayEmiter.removeRequestAllListener("closeReq");
});

it("EventBeltline:closeReqChild", () => {
  const closeReqOptionsList: any[] = [];
  relayEmiter.onRequest("closeReq", (option) => {
    closeReqOptionsList.push(option);
  });
  const subIds = ["subid1", "2", "3", "4"];
  const xxline = eventBeltline.createChild({
    idGenerator: {
      createId() {
        return subIds.pop() ?? "333";
      },
    },
  });

  xxline.addRelayUrls(new Set(["url1"]));
  xxline.addFilter({ ids: ["filter1"] }); // 添加 filter1 url1
  xxline
    .createChild()
    .addRelayUrls(new Set(["url1"]))
    .addFilter({ ids: ["filter1"] }); // 添加 filter1 url1

  xxline.closeReq();

  expect(closeReqOptionsList).toMatchInlineSnapshot(`
    [
      {
        "subId": "3",
        "url": "url1",
      },
      {
        "subId": "4",
        "url": "url1",
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
  relayEmiter.removeRequestAllListener("closeReq");
});

it("EventBeltline:relayEmiterPush", () => {
  const subIds = ["subid1", "2", "3", "4"];
  const xxline = eventBeltline.createChild({
    idGenerator: {
      createId() {
        return subIds.pop() ?? "333";
      },
    },
  });

  xxline.addRelayUrls(new Set(["url1"]));
  xxline.addFilter({ ids: ["filter1"] }); // 添加 filter1 url1

  const sunId = "4";
  relayEmiter.emit("event", "4", {
    event: {
      id: "filter1",
      content: "",
      created_at: 3333,
      pubkey: "",
      sig: "",
      tags: [],
      kind: 0,
    },
    subId: sunId,
    url: "url1",
  });

  expect(xxline.getList()).toMatchInlineSnapshot(`
    [
      {
        "content": "",
        "created_at": 3333,
        "id": "filter1",
        "kind": 0,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
  relayEmiter.removeRequestAllListener("closeReq");
});

it("EventBeltline:eoseRemove", () => {
  const subIds = ["subid1", "2", "3", "4"];
  const xxline = eventBeltline.createChild({
    idGenerator: {
      createId() {
        return subIds.pop() ?? "333";
      },
    },
  });

  xxline.addRelayUrls(new Set(["url1"]));
  xxline.addFilter({ ids: ["filter1"] }); // 添加 filter1 url1

  const sunId = "4";
  relayEmiter.emit("event", "4", {
    event: {
      id: "filter1",
      content: "",
      created_at: 3333,
      pubkey: "",
      sig: "",
      tags: [],
      kind: 0,
    },
    subId: sunId,
    url: "url1",
  });

  relayEmiter.emit("eose", "4", {
    url: "url1",
  });

  // 这个event不应该添加到列表中，因为期待已经删除监听了
  relayEmiter.emit("event", "4", {
    event: {
      id: "filter1",
      content: "",
      created_at: 3333,
      pubkey: "",
      sig: "",
      tags: [],
      kind: 0,
    },
    subId: sunId,
    url: "url1",
  });

  expect(xxline.getList()).toMatchInlineSnapshot(`
    [
      {
        "content": "",
        "created_at": 3333,
        "id": "filter1",
        "kind": 0,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
    ]
  `);

  relayEmiter.removeRequestAllListener("req");
  relayEmiter.removeRequestAllListener("closeReq");
});
