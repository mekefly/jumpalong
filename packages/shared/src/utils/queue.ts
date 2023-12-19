import { searchInsertOnObjectList } from ".";

export type TaskQueue = {
  isRun: boolean;
  queue: { task: () => void; priority: number }[];
  interval: number;
  run(): void;
  unShift(task: () => void): void;
  insert(task: () => void, priority: number): void;
  _run(): void;
};
export function createTaskQueue(interval = 0): TaskQueue {
  return {
    isRun: false,
    queue: [] as Array<{ task: () => void; priority: number }>,
    interval,
    run() {
      this.isRun = true;
      const task = this.queue.pop();
      if (!task) {
        this.isRun = false;
        return;
      }

      task.task();

      setTimeout(() => this.run(), this.interval);
    },
    unShift(task: () => void) {
      this.insert(task, 0);
      this._run();
    },
    insert(task: () => void, priority: number) {
      const index = searchInsertOnObjectList(this.queue, priority, (item)=>item["priority"]);
      this.queue.splice(index, 0, { task, priority });
      this._run();
    },
    _run() {
      if (this.isRun) return;
      this.run();
    },
  };
}
