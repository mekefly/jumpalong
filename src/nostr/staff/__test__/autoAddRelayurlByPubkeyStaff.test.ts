import { createEventBeltline } from "@/nostr/createEventBeltline";
import { createEvent } from "@/nostr/event";
import { timeout } from "@/utils/utils";
import { blockRequest } from "@/utils/vitest";
import root from "../../eventBeltline";
import autoAddRelayurlByPubkeyStaff from "../autoAddRelayurlByPubkeyStaff";
import { autoRandomRequestStaff } from "../automaticRandomRequestStaff";

it("autoAddRelayurlByPubkeyStaff", async () => {
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

  const line = createEventBeltline()
    .addFilter({ kinds: [10002] })
    .addStaff(
      autoAddRelayurlByPubkeyStaff(
        "38440fe4b3729a614592d712e722edd87f7c3bc40e316901ed5b436f25dbcc01"
      )
    );

  root.pushEvent(
    createEvent({
      kind: 10002,
      pubkey:
        "38440fe4b3729a614592d712e722edd87f7c3bc40e316901ed5b436f25dbcc01",
      tags: [
        ["r", "wss://test.c"],
        ["r", "wss://test1.c", "read"],
        ["r", "wss://test2.c", "write"],
      ],
    })
  );

  await timeout(30);
  expect(line.getRelayUrls()).toMatchInlineSnapshot(`
    Set {
      "wss://test.c",
      "wss://test2.c",
    }
  `);
});
