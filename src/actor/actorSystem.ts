// import { withDefault } from "../utils/utils";
// import { Actor } from "./actor";
// import { ReversePromise } from "./promise";
// import { Task } from "./Task";

// interface ActorSystemOptions {
//   mode: "forked";
//   clusterSize: number;
// }
// type Constructor<T> = new (...args: any[]) => T;

// const defaultActorSystemOptions = { mode: "forked", clusterSize: 3 };
// export class ActorSystem<T, TT = T extends Constructor<infer XX> ? XX : T> {
//   private actors: Set<Actor> = new Set();
//   private taskQueue: Set<Task> = new Set();
//   private freeActorQueue: Set<Actor> = new Set();
//   private children: Array<ActorSystem<any>> = [];
//   private actorSystemOptions: any;
//   private definition: any;
//   public ready = new ReversePromise<void>();

//   constructor() {}
//   async getRootActorSystem() {
//     return rootSystem;
//   }
//   async send<P extends IncludeKey<TT, keyof TT, Function>>(
//     key: P,
//     ...args: Parameters<Include<TT[P], Function>>
//   ): Promise<ReturnType<Include<TT[P], Function>>> {
//     await this.ready.promise;

//     const task = new Task(key as any, args);
//     this.taskQueue.add(task);
//     this.supervise();
//     return task.promise;
//   }
//   done(actor: Actor) {
//     this.freeActorQueue.add(actor);
//     this.supervise();
//   }
//   supervise() {
//     if (this.taskQueue.size <= 0 || this.freeActorQueue.size <= 0) return;

//     const taskQueueIter = this.taskQueue[Symbol.iterator]();
//     const freeActorListIter = this.freeActorQueue[Symbol.iterator]();
//     while (true) {
//       const { value: task, done: taskDone } = taskQueueIter.next();
//       const { value: freeActor, done: freeActorDone } =
//         freeActorListIter.next();
//       if (taskDone || freeActorDone) return;

//       this.freeActorQueue.delete(freeActor);
//       this.taskQueue.delete(task);

//       freeActor.work(task);
//     }
//   }

//   async createChild<T>(
//     definition: T,
//     actorSystemOptions?: Partial<ActorSystemOptions>
//   ): Promise<ActorSystem<T>> {
//     const s = new ActorSystem();
//     await s.initialize(definition, actorSystemOptions);
//     this.children.push(s);
//     return s;
//   }

//   private async initialize(
//     definition: T,
//     actorSystemOptions?: Partial<ActorSystemOptions>
//   ) {
//     const options = withDefault(
//       actorSystemOptions,
//       defaultActorSystemOptions as any
//     );
//     this.definition = definition;
//     this.actorSystemOptions = options;
//     for (let i = 0; i < this.actorSystemOptions.clusterSize; i++) {
//       const actor = new Actor({ system: this, definition: this.definition });
//       await actor.initialize();
//       this.freeActorQueue.add(actor);
//       this.actors.add(actor);
//     }
//     this.ready.toResolve();
//   }
// }

// type Include<T, F> = T extends infer TP ? (TP extends F ? TP : never) : never;
// type IncludeKey<T, P extends keyof T, F> = P extends infer PP
//   ? PP extends keyof T
//     ? T[PP] extends infer TP
//       ? TP extends F
//         ? P
//         : never
//       : never
//     : never
//   : never;

// const rootSystem = new ActorSystem();

// export async function actors() {
//   return rootSystem;
// }
