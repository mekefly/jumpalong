export class RelayTask {
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
}
export class PublishRelayTask extends RelayTask {
  type: "publish" = "publish";
  okRelasys = new Set<string>();
  failedRelasys = new Set<string>();
}

export const rootTask = new RelayTask("root", new Set());
