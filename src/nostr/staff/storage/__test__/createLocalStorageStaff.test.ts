import { EventBeltlineOptions } from "@/nostr/eventBeltline";
import { rootEventBeltline } from "@/nostr/nostr";
import { initializeTesttime, set } from "../../../nostrTesttime";
import createLocalStorageStaff from "../createLocalStorageStaff";
export function assignRootOption(opt: EventBeltlineOptions) {
  Object.assign((rootEventBeltline as any).options, opt);
}
const { relayEmiter, testOption } = initializeTesttime({});

it("createLocalStorageStaff:limit", async () => {
  const opt = testOption();
  set({
    relayConfigurator: {
      getOtherList() {
        return new Set(
          Array.from({ length: 100 }, (v, index) => `wss://${index}.com`)
        );
      },
    } as any,
  });
  const subIds = ["subid1", "2", "3", "4"];

  assignRootOption({
    idGenerator: {
      createId() {
        return subIds.pop() ?? "333";
      },
    },
  });

  const xxLine = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002] })
    .addStaff(createLocalStorageStaff(3));

  Array.from({ length: 6 }, (v, index) => {
    xxLine.pushEvent(
      createEvent({
        id: `id:${index}`,
        content: `content:${index}`,
        created_at: index,
        kind: 10002,
      })
    );
  });
  expect(xxLine.getList()).toMatchInlineSnapshot(`
    [
      {
        "content": "content:0",
        "created_at": 0,
        "id": "id:0",
        "kind": 10002,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
      {
        "content": "content:1",
        "created_at": 1,
        "id": "id:1",
        "kind": 10002,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
      {
        "content": "content:2",
        "created_at": 2,
        "id": "id:2",
        "kind": 10002,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
      {
        "content": "content:3",
        "created_at": 3,
        "id": "id:3",
        "kind": 10002,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
      {
        "content": "content:4",
        "created_at": 4,
        "id": "id:4",
        "kind": 10002,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
      {
        "content": "content:5",
        "created_at": 5,
        "id": "id:5",
        "kind": 10002,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
    ]
  `);

  const xxLine2 = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002] })
    .addStaff(createLocalStorageStaff(3));

  expect(xxLine2.getList()).toMatchInlineSnapshot(`
    [
      {
        "content": "content:3",
        "created_at": 3,
        "id": "id:3",
        "kind": 10002,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
      {
        "content": "content:4",
        "created_at": 4,
        "id": "id:4",
        "kind": 10002,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
      {
        "content": "content:5",
        "created_at": 5,
        "id": "id:5",
        "kind": 10002,
        "pubkey": "",
        "sig": "",
        "tags": [],
      },
    ]
  `);
});
