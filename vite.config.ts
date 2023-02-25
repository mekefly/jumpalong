import replace from "@rollup/plugin-replace";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createReplacePlugin(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        "vue",
        "vue-router",
        // "vitest",
        "@vueuse/core",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
            "NButton",
            "NDropdown",
            "NAvatar",
            "NModal",
          ],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "naive-ui"],
  },
});

function createReplacePlugin(isProd = true) {
  const isDEV = !isProd;
  return replace({
    preventAssignment: true,
    values: {
      __DEV__: isDEV ? "true" : "false",
      __PROD__: isProd ? "true" : "false",
      "false || ": "",
      __VERSION__: packageJson.version,
    },
  });
}
