import { type EventBeltlineOptions } from "@/nostr/eventBeltline";
import { rootEventBeltline } from "@/nostr/nostr";
import { timeout } from "@/utils/utils";
import { initializeTesttime, set } from "../../nostrTesttime";
import { createLatestEventStaff } from "../createLatestEventStaff";
import createReadWriteListStaff from "../createReadWriteListStaff";
import pullRelayConfig from "../pullRelayConfig";
export function assignRootOption(opt: EventBeltlineOptions) {
  Object.assign((rootEventBeltline as any).options, opt);
}
const { relayEmiter, testOption, createEvent } = initializeTesttime({});

it("pullRelayConfig", async () => {
  //读写列表注入
  set({
    relayConfigurator: {
      getReadUrl() {
        return new Set(["url1", "url2"]);
      },
      getOtherList() {
        return new Set(
          Array.from({ length: 100 }, (v, index) => `wss://${index}.com`)
        );
      },
    } as any,
  });

  //去掉更新间隔限制
  set({
    config: {
      pullRelayConfig: {
        interval: 0,
        debounce: 0,
      },
    },
  });

  //注入id生成器
  let id = 0;
  assignRootOption({
    idGenerator: {
      createId() {
        return String(id++);
      },
    },
    relayConfigurator: {
      getReadList() {
        return new Set(["url1"]);
      },
    } as any,
  });

  relayEmiter.removeRequestAllTypeListener(); //去除所有监听
  //测试监听注入
  const opt = testOption();

  const line = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002], authors: ["test-user-id-1"] })
    .addStaff(createLatestEventStaff()) // 只保留最后一个 create_at
    .addStaff(createReadWriteListStaff()) // 读写列表
    .addStaff(pullRelayConfig()); //根据读写更新并将更新后的内容从新添加进pullRelayConfig

  line.addReadUrl();

  expect(opt.req).toMatchInlineSnapshot(`
    [
      {
        "filters": [
          {
            "authors": [
              "test-user-id-1",
            ],
            "kinds": [
              10002,
            ],
          },
        ],
        "subId": "0",
        "url": "url1",
      },
    ]
  `);

  //模拟relay向客户端返回数据
  let subId = "0";
  relayEmiter.emit("event", subId, {
    subId,
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 9999,
      tags: [
        ["r", "url2"],
        ["r", "url3", "write"],
        ["r", "url4", "read"],
      ],
    }),
    url: "url1",
  });

  expect(line.getList()).toMatchInlineSnapshot(`
    [
      {
        "content": "",
        "created_at": 9999,
        "id": "",
        "kind": 10002,
        "pubkey": "test-user-id-1",
        "sig": "",
        "tags": [
          [
            "r",
            "url2",
          ],
          [
            "r",
            "url3",
            "write",
          ],
          [
            "r",
            "url4",
            "read",
          ],
        ],
      },
    ]
  `);

  let readWriteList: any[] = [];
  line.feat.onHasReadWriteList((v) => {
    readWriteList.push(v);
  });

  expect(readWriteList).toMatchInlineSnapshot(`
    [
      {
        "readUrl": Set {
          "url2",
          "url4",
        },
        "writeUrl": Set {
          "url2",
          "url3",
        },
      },
    ]
  `);
  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
      "url2",
      "url4",
      "url3",
    }
  `);
});

it("pullRelayConfig:read", async () => {
  //读写列表注入
  set({
    relayConfigurator: {
      getReadUrl() {
        return new Set(["url1", "url2"]);
      },
      getOtherList() {
        return new Set(
          Array.from({ length: 100 }, (v, index) => `wss://${index}.com`)
        );
      },
    } as any,
  });

  //去掉更新间隔限制
  set({
    config: {
      pullRelayConfig: {
        interval: 0,
        debounce: 0,
      },
    },
  });

  //注入id生成器
  let id = 0;
  assignRootOption({
    idGenerator: {
      createId() {
        return String(id++);
      },
    },
    relayConfigurator: {
      getReadList() {
        return new Set(["url1"]);
      },
    } as any,
  });

  relayEmiter.removeRequestAllTypeListener(); //去除所有监听
  //测试监听注入
  const opt = testOption();

  const line = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002], authors: ["test-user-id-1"] })
    .addStaff(createLatestEventStaff()) // 只保留最后一个 create_at
    .addStaff(createReadWriteListStaff()) // 读写列表
    .addStaff(pullRelayConfig({ read: true, write: false })); //根据读写更新并将更新后的内容从新添加进pullRelayConfig

  //添加来自 assignRootOption 注入
  line.addReadUrl();

  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
    }
  `);

  //模拟relay向客户端返回数据
  let subId = "0";
  relayEmiter.emit("event", subId, {
    subId,
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 9999,
      tags: [
        ["r", "url2"],
        ["r", "url3", "write"],
        ["r", "url4", "read"],
      ],
    }),
    url: "url1",
  });

  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
      "url2",
      "url4",
    }
  `);
});

it("pullRelayConfig:write", async () => {
  //读写列表注入
  set({
    relayConfigurator: {
      getReadUrl() {
        return new Set(["url1", "url2"]);
      },
      getOtherList() {
        return new Set(
          Array.from({ length: 100 }, (v, index) => `wss://${index}.com`)
        );
      },
    } as any,
  });

  //去掉更新间隔限制
  set({
    config: {
      pullRelayConfig: {
        interval: 0,
        debounce: 0,
      },
    },
  });

  //注入id生成器
  let id = 0;
  assignRootOption({
    idGenerator: {
      createId() {
        return String(id++);
      },
    },
    relayConfigurator: {
      getReadList() {
        return new Set(["url1"]);
      },
    } as any,
  });

  relayEmiter.removeRequestAllTypeListener(); //去除所有监听
  //测试监听注入
  const opt = testOption();

  const line = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002], authors: ["test-user-id-1"] })
    .addStaff(createLatestEventStaff()) // 只保留最后一个 create_at
    .addStaff(createReadWriteListStaff()) // 读写列表
    .addStaff(pullRelayConfig({ read: false, write: true })); //根据读写更新并将更新后的内容从新添加进pullRelayConfig

  //添加来自 assignRootOption 注入
  line.addReadUrl();

  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
    }
  `);

  //模拟relay向客户端返回数据
  let subId = "0";
  relayEmiter.emit("event", subId, {
    subId,
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 9999,
      tags: [
        ["r", "url2"],
        ["r", "url3", "write"],
        ["r", "url4", "read"],
      ],
    }),
    url: "url1",
  });

  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
      "url2",
      "url3",
    }
  `);
});

it("pullRelayConfig:syncInterval", async () => {
  //清楚localStorage
  localStorage.clear();
  //读写列表注入
  set({
    relayConfigurator: {
      getReadUrl() {
        return new Set(["url1", "url2"]);
      },
      getOtherList() {
        return new Set(
          Array.from({ length: 100 }, (v, index) => `wss://${index}.com`)
        );
      },
    } as any,
  });

  //去掉更新间隔限制
  set({
    config: {
      pullRelayConfig: {
        interval: 100, //100毫秒间隔，只有超过这个时间的请求才能再次触发更新
        debounce: 0,
      },
    },
  });

  //注入id生成器
  let id = 0;
  assignRootOption({
    idGenerator: {
      createId() {
        return String(id++);
      },
    },
    relayConfigurator: {
      getReadList() {
        return new Set(["url1"]);
      },
    } as any,
  });

  relayEmiter.removeRequestAllTypeListener(); //去除所有监听
  //测试监听注入
  const opt = testOption();

  const line = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002], authors: ["test-user-id-1"] })
    .addStaff(createLatestEventStaff()) // 只保留最后一个 create_at
    .addStaff(createReadWriteListStaff()) // 读写列表
    .addStaff(pullRelayConfig()); //根据读写更新并将更新后的内容从新添加进pullRelayConfig

  //添加来自 assignRootOption 注入
  line.addReadUrl();

  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
    }
  `);

  //模拟relay向客户端返回数据
  let subId = "0";
  relayEmiter.emit("event", subId, {
    subId,
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 9999,
      tags: [
        ["r", "url2"],
        ["r", "url3", "write"],
        ["r", "url4", "read"],
      ],
    }),
    url: "url1",
  });

  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
      "url2",
      "url4",
      "url3",
    }
  `);

  const line1 = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002], authors: ["test-user-id-1"] })
    .addStaff(createLatestEventStaff()) // 只保留最后一个 create_at
    .addStaff(createReadWriteListStaff()) // 读写列表
    .addStaff(pullRelayConfig()); //根据读写更新并将更新后的内容从新添加进pullRelayConfig

  //添加来自 assignRootOption 注入
  line1.addReadUrl();

  expect(line1.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
    }
  `);

  //模拟relay向客户端返回数据
  subId = `${id - 1}`;
  relayEmiter.emit("event", subId, {
    subId,
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 10009,
      tags: [
        ["r", "url6"],
        ["r", "url7", "write"],
        ["r", "url8", "read"],
      ],
    }),
    url: "url1",
  });

  // 期待没有添加上方的url
  expect(line1.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
    }
  `);

  await timeout(120);

  const line2 = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002], authors: ["test-user-id-1"] })
    .addStaff(createLatestEventStaff()) // 只保留最后一个 create_at
    .addStaff(createReadWriteListStaff()) // 读写列表
    .addStaff(pullRelayConfig()); //根据读写更新并将更新后的内容从新添加进pullRelayConfig

  //添加来自 assignRootOption 注入
  line2.addReadUrl();

  expect(line2.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
    }
  `);

  //模拟relay向客户端返回数据
  subId = `${id - 1}`;
  relayEmiter.emit("event", subId, {
    subId,
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 10012,
      tags: [
        ["r", "url9"],
        ["r", "url10", "write"],
        ["r", "url11", "read"],
      ],
    }),
    url: "url1",
  });

  // 超时了，期待添加
  expect(line2.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
      "url9",
      "url11",
      "url10",
    }
  `);
});

it("pullRelayConfig:debounce", async () => {
  //清楚localStorage
  localStorage.clear();
  //读写列表注入
  set({
    relayConfigurator: {
      getReadUrl() {
        return new Set(["url1", "url2"]);
      },
      getOtherList() {
        return new Set(
          Array.from({ length: 100 }, (v, index) => `wss://${index}.com`)
        );
      },
    } as any,
  });

  //去掉更新间隔限制
  set({
    config: {
      pullRelayConfig: {
        interval: 0, //100毫秒间隔，只有超过这个时间的请求才能再次触发更新
        debounce: 50,
      },
    },
  });

  //注入id生成器
  let id = 0;
  assignRootOption({
    idGenerator: {
      createId() {
        return String(id++);
      },
    },
    relayConfigurator: {
      getReadList() {
        return new Set(["url1"]);
      },
    } as any,
  });

  relayEmiter.removeRequestAllTypeListener(); //去除所有监听
  //测试监听注入
  const opt = testOption();

  const line = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002], authors: ["test-user-id-1"] })
    .addStaff(createLatestEventStaff()) // 只保留最后一个 create_at
    .addStaff(createReadWriteListStaff()) // 读写列表
    .addStaff(pullRelayConfig()); //根据读写更新并将更新后的内容从新添加进pullRelayConfig

  //添加来自 assignRootOption 注入
  line.addReadUrl();

  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "url1",
    }
  `);

  //模拟relay向客户端返回数据
  let subId = "0";
  relayEmiter.emit("event", subId, {
    subId,
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 9999,
      tags: [
        ["r", "url2"],
        ["r", "url3", "write"],
        ["r", "url4", "read"],
      ],
    }),
    url: "url1",
  });

  expect(line.getRelayUrls()).toMatchSnapshot(); //此处不应该更新

  relayEmiter.emit("event", subId, {
    subId,
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 10000,
      tags: [
        ["r", "url5"],
        ["r", "url6", "write"],
        ["r", "url7", "read"],
      ],
    }),
    url: "url1",
  });

  expect(line.getRelayUrls()).toMatchSnapshot(); //此处不应该更新

  await timeout(55);

  expect(line.getRelayUrls()).toMatchSnapshot(); //此处应该更新
});
