import { type EventBeltlineOptions } from "@/nostr/eventBeltline";
import { rootEventBeltline } from "@/nostr/nostr";
import { timeout } from "@/utils/utils";
import { initializeTesttime, set } from "../../nostrTesttime";
import autoAddRelayurlByPubkeyStaff from "../autoAddRelayurlByPubkeyStaff";
import { autoRandomRequestStaff } from "../automaticRandomRequestStaff";
export function assignRootOption(opt: EventBeltlineOptions) {
  Object.assign((rootEventBeltline as any).options, opt);
}
const { relayEmiter, testOption, createEvent } = initializeTesttime({});

it("autoAddRelayurlByPubkeyStaff", async () => {
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

  autoRandomRequestStaff.interval = 0;
  autoRandomRequestStaff.maximumTimes = 2;

  Object.assign(autoRandomRequestStaff, {
    interval: 0,
    maximumTimes: 2,
    getIndex() {
      //让随机index变为不随机的
      return 0;
    },
  });

  const line = rootEventBeltline
    .createChild({})
    .addStaff(autoAddRelayurlByPubkeyStaff("test-user-id-1"));

  expect(line.getRelayUrls()).toMatchInlineSnapshot("Set {}");
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

  await timeout(50);

  expect(line.getRelayUrls()).toMatchSnapshot();
  expect(opt.req).toMatchSnapshot();

  //使用url1身份模拟中续到客户端;
  relayEmiter.emit("event", "0", {
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 9999,
      tags: [
        ["r", "ws://url2"],
        ["r", "ws://url3", "write"],
        ["r", "ws://url4", "read"],
      ],
    }),
    subId: "0",
    url: "url1",
  });

  expect(line.getRelayUrls()).toMatchSnapshot(); //应该得到模拟对方写入连接

  let subId = "1";
  relayEmiter.emit("event", subId, {
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 10000,
      tags: [
        ["r", "ws://url5"],
        ["r", "ws://url6", "write"],
        ["r", "ws://url7", "read"],
      ],
    }),
    subId,
    url: "url1",
  });

  expect(line.getRelayUrls()).toMatchSnapshot(); //应该添加随机请求得到的对方连接
  expect(opt).toMatchSnapshot(); //应该添加随机请求得到的对方连接
});

it("autoAddRelayurlByPubkeyStaff：停止随机请求", async () => {
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

  Object.assign(autoRandomRequestStaff, {
    interval: 50,
    maximumTimes: 2,
    eventBeltline: rootEventBeltline.createChild(),
    getIndex() {
      //让随机index变为不随机的
      return 0;
    },
  });

  localStorage.clear();
  expect(localStorage).toMatchInlineSnapshot(`
    Storage {
      "_store": {},
    }
  `);
  const line = rootEventBeltline
    .createChild({})
    .addStaff(autoAddRelayurlByPubkeyStaff("test-user-id-1"));

  expect(line.getRelayUrls()).toMatchInlineSnapshot('Set {}');

  //使用url1身份模拟中续到客户端;
  await timeout(5);
  relayEmiter.emit("event", "0", {
    event: createEvent({
      pubkey: "test-user-id-1",
      kind: 10002,
      created_at: 9999,
      tags: [
        ["r", "ws://url2"],
        ["r", "ws://url3", "write"],
        ["r", "ws://url4", "read"],
      ],
    }),
    subId: "0",
    url: "url1",
  });

  await timeout(55);

  expect(line.getRelayUrls()).toMatchSnapshot();
  expect(opt.req).toMatchSnapshot(); //随机请求不应该两次
});
