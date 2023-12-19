import replace from "@rollup/plugin-replace";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { PluginOption } from "vite";
import { DirResolverHelper } from "vite-auto-import-resolvers";
import compressPlugin from "vite-plugin-compression";
import { defineConfig } from "vitest/config";
import packageJson from "./package.json";
import vitePlugin from "./src/logger/logger.vitePlugin";

// @ts-ignore
// https://vitejs.dev/config/
export default defineConfig((opt) => {
  const { command, mode } = opt;

  const isProd = command === "build";
  const isTest = mode === "test";

  return {
    test: {
      browser: {
        // enabled: true,
        name: "chrome", // browser name is required
      },
      globals: true,
      environment: "happy-dom",
      include: [
        "EventLine",
        "Staff",

        //staff
        "EventStaff",
        "WebSocketFactoryStaff",
        "PoolStaff",

        // utils
        "object",
        "LineEmitter",
      ].map((item) => `**/${item}.test.ts`),
    },
    base: "./",
    server: {
      host: "0.0.0.0",
      proxy: {},
    },
    build: {
      chunkSizeWarningLimit: 512 * 1024,
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: true,
      __INTLIFY_PROD_DEVTOOLS__: false,
      __DEV__: !isProd,
      __PROD__: isProd,
      __TEST__: isTest,
    },
    plugins: [
      vitePlugin(),
      vue(),
      createReplacePlugin(isProd),
      DirResolverHelper(),
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
      // configCompressPlugin("gzip", false),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    optimizeDeps: {
      include: ["vue", "vue-router", "naive-ui"],
    },
  };
});

function createReplacePlugin(isProd = false) {
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

export function configCompressPlugin(
  compress: "gzip" | "brotli" | "none",
  deleteOriginFile = false
): PluginOption[] {
  const compressList = compress.split(",");

  const plugins: PluginOption[] = [];

  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile,
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile,
      })
    );
  }
  return plugins;
}
