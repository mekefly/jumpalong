import { Pub, Sub } from "nostr-tools";
import { createId } from "../utils/utils";
import { RelayConnect } from "./relay";

export const taskMap = new Map<string, RelayTask>();
export class RelayTask {
  id = createId();
  type: "sub" | "publish" | "root";

  allRelays: Set<string>;
  errorRelays = new Set<string>();
  normalRelays = new Set<string>();

  children: RelayTask[] = [];
  describe: string;
  constructor(
    type: "sub" | "publish" | "root",
    allRelays: Set<string> = new Set(),
    describe: string = ""
  ) {
    this.type = type;
    this.allRelays = allRelays;
    this.describe = describe;
    taskMap.set(this.id, this);
  }
  addChild(relayTask: RelayTask) {
    this.children.push(relayTask);
  }
  createChild(type: "sub" | "publish", allRelays: Set<string>) {
    this.addChild(new RelayTask(type, allRelays));
  }
}
export class SubRelayTask extends RelayTask {
  type: "sub" = "sub";
  eoseRelays = new Set<string>();
  eventIds = new Set<string>();
  subIds: string[] = [];
  subContext: Map<string, { sub: Sub; relayConnect: RelayConnect }> = new Map();
}
export class PublishRelayTask extends RelayTask {
  type: "publish" = "publish";
  okRelasys = new Set<string>();
  failedRelasys = new Set<string>();
  pubMap: Map<string, Pub> = new Map();
}

export const rootTask = new RelayTask("root", new Set());
