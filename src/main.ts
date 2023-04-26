import "reflect-metadata";
import "./logger";
import "./style.css";

import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import { initializeRuntime } from "./nostr/nostrRuntime";
import router from "./router";

(window as any).nostrApi = initializeRuntime();

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount("#app");
