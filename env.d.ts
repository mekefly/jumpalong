/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "*.json" {
  const content: any;
  export default content;
}

// declare module "nostr-tools" {
//   const EventTemplate: { kind: number };
// }

declare module "loadsh";
