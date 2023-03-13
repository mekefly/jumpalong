import { createEventBeltline } from "@/nostr/createEventBeltline";
import { timeout } from "@/utils/utils";
import { blockRequest } from "@/utils/vitest";
import autoAddRelayurlByPubkeyStaff from "../autoAddRelayurlByPubkeyStaff";
import { autoRandomRequestStaff } from "../automaticRandomRequestStaff";

it("autoAddRelayurlByPubkeyStaff:1", async () => {
  console.log("autoAddRelayurlByPubkeyStaff:1");

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
      console.log(url);
      urls.push(url);
    }
  );

  autoRandomRequestStaff.interval = 1;
  autoRandomRequestStaff.maximumTimes = 3;
  autoRandomRequestStaff.setToBeAdded = new Set(
    Array.from({ length: 100 }, (v, index) => `wss://test2.com`)
  );
  console.log(autoRandomRequestStaff.setToBeAdded);

  const line = createEventBeltline()
    .addFilter({
      kinds: [10002],
      authors: [
        '"38440fe4b3729a614592d712e722edd87f7c3bc40e316901ed5b436f25dbcc02"',
      ],
    })
    .addStaff(
      autoAddRelayurlByPubkeyStaff(
        "38440fe4b3729a614592d712e722edd87f7c3bc40e316901ed5b436f25dbcc02"
      )
    );

  await timeout(500);

  expect(arr).toMatchSnapshot();
  expect(urls).toMatchSnapshot();
});
