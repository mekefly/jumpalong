// import { isClass } from "../utils/utils";
// import { ActorSystem } from "./actorSystem";
// import { Definition } from "./definition";
// import { Task } from "./Task";
// export let currentActor = 0;
// let id = 0;
// export class Actor {
//   id = id++;
//   definition: Definition;
//   origDefinition: any;
//   evnetQueue: Record<string, any[]> = {};
//   system: ActorSystem<any>;
//   constructor(options: { definition: any; system: ActorSystem<any> }) {
//     this.definition = isClass(options.definition)
//       ? new options.definition()
//       : options.definition;
//     this.origDefinition = options.definition;
//     this.system = options.system;
//   }
//   async initialize() {
//     await this.definition.initialize?.(this.system);
//   }
//   async work(task: Task) {
//     currentActor = this.id;
//     const t = (this.definition as any)[task.key] as (
//       ...rest: any
//     ) => Promise<any>;
//     if (typeof t !== "function") {
//       task.toReject(new Error("Not a function"));
//       this.system.done(this);
//       return;
//     }

//     try {
//       task.toResolve(await (this.definition as any)[task.key](...task.args));
//     } catch (error) {
//       task.toReject(error);
//     } finally {
//       this.system.done(this);
//     }
//   }
// }
