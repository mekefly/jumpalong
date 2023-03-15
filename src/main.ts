// import { createPinia } from "pinia";
import "./logger/Logger";
import "./logger/logger.config";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./style.css";

import { initializeRuntime } from "./nostr/nostrRuntime";

//注入运行时api，也有专用的测试时api，为了解耦合,和更全面的单元测试
try {
  (window as any).nostrApi = initializeRuntime();
} catch (error) {}

const app = createApp(App);

// app.use(createPinia());
app.use(router);
app.mount("#app");
