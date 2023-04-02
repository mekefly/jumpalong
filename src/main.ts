import "./logger/Logger";
import "./logger/logger.config";
import "./style.css";

import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import { initializeRuntime } from "./nostr/nostrRuntime";
import router from "./router";

try {
  (window as any).nostrApi = initializeRuntime();
} catch (error) {}

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount("#app");
