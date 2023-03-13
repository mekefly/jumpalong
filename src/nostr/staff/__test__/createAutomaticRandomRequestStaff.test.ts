import { createEventBeltline } from "@/nostr/createEventBeltline";
import { timeout } from "@/utils/utils";
import { blockRequest } from "@/utils/vitest";
import createAutomaticRandomRequestStaff, {
  autoRandomRequestStaff,
} from "../automaticRandomRequestStaff";

it("autoRandomRequestStaff", async () => {
  const arr: any[] = [];
  const urls: any[] = [];
  blockRequest(
    {
      req(filter) {
        arr.push(filter);
        return "testId";
      },
    },
    undefined,
    (url) => {
      urls.push(url);
    }
  );

  autoRandomRequestStaff.interval = 1;
  autoRandomRequestStaff.maximumTimes = 3;

  autoRandomRequestStaff.setToBeAdded = new Set(
    Array.from({ length: 100 }, (v, index) => `wss://${index}.com`)
  );
  createEventBeltline()
    .addFilter({ kinds: [10002] })
    .addStaff(createAutomaticRandomRequestStaff());

  await timeout(1000);
  expect(urls.length).toMatchInlineSnapshot("3");
  expect(arr).toMatchInlineSnapshot(`
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

it("autoRandomRequestStaff", async () => {
  const arr: any[] = [];
  const urls: any[] = [];
  blockRequest(
    {
      req(filter) {
        arr.push(filter);
        return "testId";
      },
    },
    undefined,
    (url) => {
      urls.push(url);
    }
  );

  autoRandomRequestStaff.interval = 1;
  autoRandomRequestStaff.maximumTimes = 2;

  autoRandomRequestStaff.setToBeAdded = new Set(
    Array.from({ length: 100 }, (v, index) => `wss://${index}.com`)
  );
  createEventBeltline()
    .addFilter({ kinds: [10002] })
    .addStaff(createAutomaticRandomRequestStaff());

  await timeout(100);
  expect(urls.length).toMatchInlineSnapshot("2");
  expect(arr).toMatchInlineSnapshot(`
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

  createEventBeltline()
    .addFilter({ kinds: [0] })
    .addStaff(createAutomaticRandomRequestStaff());

  await timeout(100);

  expect(arr).toMatchInlineSnapshot(`
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
        {
          "kinds": [
            0,
          ],
        },
      ],
      [
        {
          "kinds": [
            10002,
          ],
        },
        {
          "kinds": [
            0,
          ],
        },
      ],
    ]
  `);
});
