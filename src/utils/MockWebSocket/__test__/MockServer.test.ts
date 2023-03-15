import { expectCalled } from "@/utils/vitest";
import { MockServer } from "../MockServer";

it("MockServer", async () => {
  const url = "wss://brb.io";
  const ms = new MockServer(url);

  const { expectCalled: expectCalledState, fn } = expectCalled(undefined, 1);
  const x = new WebSocket(url);
  let w: any = null;
  ms.on("reqOpen", (_w) => {
    console.log(w);
    w = _w;
    console.log("_w");

    fn();
  });
  expect(x).toMatchInlineSnapshot(`
    MockWebSocket {
      "CLOSED": 0,
      "CLOSING": 0,
      "CONNECTING": 0,
      "OPEN": 0,
      "binaryType": "arraybuffer",
      "bufferedAmount": 0,
      "eventEmitter": EventEmitter {
        "_events": {
          "close": [Function],
          "error": [Function],
          "message": [Function],
          "open": [Function],
        },
        "_eventsCount": 4,
        "_maxListeners": undefined,
      },
      "extensions": "",
      "onclose": null,
      "onerror": null,
      "onmessage": null,
      "onopen": null,
      "protocol": "wss://",
      "readyState": 0,
      "server": MockServer {
        "connectedList": Set {},
        "eventEmitter": EventEmitter {
          "_events": {
            "reqOpen": [Function],
          },
          "_eventsCount": 1,
          "_maxListeners": undefined,
        },
      },
      "url": "wss://brb.io",
    }
  `);

  await expectCalledState;
  expect(w).toMatchInlineSnapshot("null");
});
