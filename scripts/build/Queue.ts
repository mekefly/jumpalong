import os from "os";

export class Queue {
  index = 1;
  ruiningOfNumber = 1;
  queue: any = [];

  complete: any;
  allCompletePromise: any = new Promise<void>((resolve, reject) => {
    this.complete = resolve;
  });

  executing = new Set<Promise<any>>();

  // 超过十线程会引发一个事件坚听警告，但运行没问题
  MAX_CONCURRENCY: number = Math.min(os.cpus().length, 10);

  runParallel(callback: () => Promise<any>) {
    //等待回调函数是否已就序
    if (!this.complete) {
      setTimeout(() => this.runParallel(callback));
      return;
    }
    this.queue.push(callback);
    console.log();
    console.log(`[id: ${this.index++}]`);
    console.log(`[并发: ${this.executing.size}/${this.MAX_CONCURRENCY}]`);
    if (this.executing.size >= this.MAX_CONCURRENCY) {
      return;
    }
    this.runQueue();
  }

  queueId = 0;
  runQueue() {
    if (this.queueId >= this.queue.length) {
      return;
    }
    const task = this.queue[this.queueId++];

    console.log();
    console.log(`[StartRun: ${this.ruiningOfNumber++}]`);
    console.log(`[并发: ${this.executing.size + 1}/${this.MAX_CONCURRENCY}]`);

    const thisId = this.queueId;

    task().then(() => {
      console.log(`Exit queue: ${thisId}`);
      this.executing.delete(task);
      this.runQueue();

      //退出
      if (thisId === this.queue.length) {
        this.complete();
      }
    });

    this.executing.add(task);
  }
}
