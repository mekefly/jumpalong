import { test, expect } from "vitest";
import {
  Event,
  getBlankEvent,
  generatePrivateKey,
  verifySignature,
  finishEvent,
  getPublicKey,
} from "nostr-tools";
import { EventLineFactory } from "../../../EventLine";
import EventStaff from "../EventStaff";
import { objectFilter } from "@/utils/object";
test("EventStaff", () => {
  let line = new EventLineFactory().add(EventStaff).out();
  line.on("event", (...r) => {
    expect(r).toMatchInlineSnapshot(`
      [
        "event:test",
        {
          "content": "",
          "created_at": 0,
          "id": "e22ca122688568adaefe74ec6909cf64c6fdb6a1f73b7b535748101bab599955",
          "kind": 0,
          "pubkey": "fab5f27f7a6720c64ea458b6f429725d01b22eb80d3d992d384c4dd288c98498",
          "sig": "006596c3691dd61d0770eb7276340905bda2c321e604eeb5a6dd730fc44aa1a4957684123fb86b003c302c9c0ab90a601a165048e8d4b15cb57afd2fe8a71c86",
          "tags": [],
        },
        "local",
      ]
    `)
  });
  line.emitEvent("event:test", {
    content: "",
    created_at: 0,
    id: "e22ca122688568adaefe74ec6909cf64c6fdb6a1f73b7b535748101bab599955",
    kind: 0,
    pubkey: "fab5f27f7a6720c64ea458b6f429725d01b22eb80d3d992d384c4dd288c98498",
    sig: "006596c3691dd61d0770eb7276340905bda2c321e604eeb5a6dd730fc44aa1a4957684123fb86b003c302c9c0ab90a601a165048e8d4b15cb57afd2fe8a71c86",
    tags:[]
  });
});

test("EventStaff:stop", () => {
  let line = new EventLineFactory().add(EventStaff).out();
  line.on("event", (subId) => {
    expect(subId).toMatchInlineSnapshot('"event:test"')
  });
  line.on("event", () => {
    return true
  });
  line.on("event", (subId) => {
    expect(subId).toMatchInlineSnapshot('"event:test"')
  });
  line.emitEvent("event:test", {
    content: "",
    created_at: 0,
    id: "e22ca122688568adaefe74ec6909cf64c6fdb6a1f73b7b535748101bab599955",
    kind: 0,
    pubkey: "fab5f27f7a6720c64ea458b6f429725d01b22eb80d3d992d384c4dd288c98498",
    sig: "006596c3691dd61d0770eb7276340905bda2c321e604eeb5a6dd730fc44aa1a4957684123fb86b003c302c9c0ab90a601a165048e8d4b15cb57afd2fe8a71c86",
    tags:[]
  });
});