import { EventBeltlineOptions } from "@/nostr/eventBeltline";
import { rootEventBeltline } from "@/nostr/nostr";
import { timeout } from "@/utils/utils";
import { initializeTesttime, set } from "../../nostrTesttime";
import createAutomaticRandomRequestStaff, {
  autoRandomRequestStaff,
} from "../automaticRandomRequestStaff";
export function assignRootOption(opt: EventBeltlineOptions) {
  Object.assign((rootEventBeltline as any).options, opt);
}
const { relayEmiter, testOption } = initializeTesttime({});

it("autoRandomRequestStaff", async () => {
  const opt = testOption();

  autoRandomRequestStaff.interval = 0;
  autoRandomRequestStaff.maximumTimes = 3;

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

  rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002] })
    .addStaff(createAutomaticRandomRequestStaff());

  await timeout(100);

  expect(opt.req.length).toMatchInlineSnapshot("3");
  expect(opt.req.map((item: any) => item.filters)).toMatchInlineSnapshot(`
    [
      [
        {
          "kinds": [
            10002,
          ],
        },
      ],
      [
        {
          "kinds": [
            10002,
          ],
        },
      ],
      [
        {
          "kinds": [
            10002,
          ],
        },
      ],
    ]
  `);
});

it("autoRandomRequestStaff:stop", async () => {
  relayEmiter.removeRequestAllListener("req");

  const opt = testOption();

  autoRandomRequestStaff.interval = 0;
  autoRandomRequestStaff.maximumTimes = 3;

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

  const line = rootEventBeltline
    .createChild({})
    .addFilter({ kinds: [10002] })
    .addStaff(createAutomaticRandomRequestStaff());

  let num = 0;
  relayEmiter.onRequest("req", () => {
    if (num === 1) {
      line.feat.stopAutomaticRandomRequestStaff();
    }

    num++;
  });
  await timeout(100);

  expect(opt.req.length).toMatchInlineSnapshot("2");
  expect(opt.req.map((item: any) => item.filters)).toMatchInlineSnapshot(`
    [
      [
        {
          "kinds": [
            10002,
          ],
        },
      ],
      [
        {
          "kinds": [
            10002,
          ],
        },
      ],
    ]
  `);
});
