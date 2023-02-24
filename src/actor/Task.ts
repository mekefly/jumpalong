import { Actor } from "./actor";
enum TaskState {
  INIT,
  UNDERWAY,
  DONE,
}

export class Task {
  key: string;
  args: any[];
  resolve!: Function;
  reject!: Function;
  actor: Actor | undefined;
  promise: Promise<any>;
  state: TaskState = TaskState.INIT;

  constructor(key: string, args: any[]) {
    this.promise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });

    this.key = key;
    this.args = args;
  }
  toResolve(result: any) {
    this.resolve(result);
    this.done();
  }
  toReject(e: any) {
    this.reject(e);
    this.done();
  }
  underway() {
    this.state = TaskState.UNDERWAY;
  }
  done() {
    this.state = TaskState.DONE;
  }
}
