// vite.config.ts
import replace from "file:///E:/study/jumpalong/common/temp/node_modules/.pnpm/@rollup+plugin-replace@5.0.5_rollup@4.12.1/node_modules/@rollup/plugin-replace/dist/es/index.js";
import vue from "file:///E:/study/jumpalong/common/temp/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.5+vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "file:///E:/study/jumpalong/common/temp/node_modules/.pnpm/unplugin-auto-import@0.14.4_5kp57gobpyl24p7ju7a7iyt4re/node_modules/unplugin-auto-import/dist/vite.js";
import { NaiveUiResolver } from "file:///E:/study/jumpalong/common/temp/node_modules/.pnpm/unplugin-vue-components@0.24.1_2ynxlxch3xeli4g3bhxgr6bwga/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///E:/study/jumpalong/common/temp/node_modules/.pnpm/unplugin-vue-components@0.24.1_2ynxlxch3xeli4g3bhxgr6bwga/node_modules/unplugin-vue-components/dist/vite.mjs";
import { DirResolverHelper } from "file:///E:/study/jumpalong/common/temp/node_modules/.pnpm/vite-auto-import-resolvers@3.2.1_blens26jmcjhcywljtu7adckoe/node_modules/vite-auto-import-resolvers/dist/index.mjs";
import compressPlugin from "file:///E:/study/jumpalong/common/temp/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.1.5/node_modules/vite-plugin-compression/dist/index.mjs";
import { defineConfig } from "file:///E:/study/jumpalong/common/temp/node_modules/.pnpm/vitest@1.3.1_3vf4pqqrkiffu7xyjaowoz4xwq/node_modules/vitest/dist/config.js";

// package.json
var package_default = {
  name: "@jumpalong/browser-ui",
  version: "0.0.0-bate.0",
  description: "",
  types: "dist/types/index.d.ts",
  type: "module",
  buildOptions: {
    help: "disableBuild  \u8FD9\u5C06\u4F1A\u7981\u6B62\u901A\u7528\u6784\u5EFA\u811A\u672C",
    disableBuild: true
  },
  scripts: {
    dev: "vite",
    build: ""
  },
  exports: {
    "./auto-imports": {
      types: "./auto-imports.d.ts"
    },
    "./components": {
      types: "./components.d.ts"
    }
  },
  keywords: [],
  author: "",
  license: "MIT",
  dependencies: {
    "@jumpalong/logger": "workspace:*",
    "@jumpalong/logger-vite-plugin": "workspace:*",
    "@jumpalong/nostr-runtime": "workspace:*",
    "@jumpalong/shared": "workspace:*",
    "@vueuse/core": "^10.7.1",
    "naive-ui": "^2.36.0",
    "nostr-tools": "^2.1.1",
    rollup: "^4.9.6",
    vue: "^3.4.8",
    "vue-i18n": "^9.8.0",
    "vue-router": "^4.2.5",
    "@vitest/browser": "^0.34.6",
    "@vueuse/components": "^9.13.0",
    bech32: "^2.0.0",
    "cordova-android": "10.1.2",
    events: "^3.3.0",
    inversify: "^6.0.1",
    "inversify-inject-decorators": "^3.1.0",
    "mavon-editor": "^3.0.1",
    minimatch: "^9.0.0",
    "reflect-metadata": "^0.1.13",
    "vite-plugin-compression": "^0.5.1",
    webdriverio: "^8.24.5",
    webln: "^0.3.2"
  },
  devDependencies: {
    "@jumpalong/logger-vite-plugin": "workspace:*",
    "@babel/parser": "^7.23.5",
    "@codspeed/vitest-plugin": "^2.3.1",
    "@rollup/plugin-alias": "^5.0.1",
    "@rollup/plugin-commonjs": "^22.0.2",
    "@rollup/plugin-json": "^6.0.1",
    "@rollup/plugin-node-resolve": "^13.3.0",
    "@rollup/plugin-replace": "^5.0.5",
    "@rollup/plugin-terser": "^0.4.4",
    "@types/minimist": "^1.2.5",
    "@types/mockdate": "^3.0.0",
    "@types/node": "^16.11.68",
    "@types/prettier": "^2.7.0",
    "@types/shelljs": "^0.8.11",
    "@vue/consolidate": "0.17.3",
    "@vue/reactivity": "^3.2.38",
    "@vue/test-utils": "^2.1.0",
    "@vue/tsconfig": "^0.1.3",
    autoprefixer: "^10.4.12",
    cac: "^6.7.14",
    compressing: "^1.9.0",
    "cordova-plugin-camera": "^6.0.0",
    execa: "^8.0.1",
    "happy-dom": "^8.7.0",
    "magic-string": "^0.30.5",
    minimist: "^1.2.8",
    mockdate: "^3.0.5",
    "npm-run-all": "^4.1.5",
    picocolors: "^1.0.0",
    postcss: "^8.4.18",
    "pretty-bytes": "^6.1.1",
    process: "^0.11.10",
    rollup: "^4.9.6",
    "rollup-plugin-esbuild": "^6.1.0",
    "rollup-plugin-polyfill-node": "^0.12.0",
    "rollup-plugin-terser": "^7.0.2",
    "rollup-plugin-typescript2": "^0.36.0",
    sass: "^1.61.0",
    shelljs: "^0.8.5",
    "standard-version": "^9.5.0",
    stylus: "^0.59.0",
    tailwindcss: "^3.2.1",
    tslib: "^2.6.2",
    typescript: "^5.2.2",
    "unplugin-auto-import": "^0.14.3",
    "unplugin-vue-components": "^0.24.0",
    "vite-auto-import-resolvers": "^3.0.5",
    vitest: "^1.0.4",
    "vue-tsc": "^1.0.8",
    vite: "^5.0.8",
    "@vitejs/plugin-vue": "^5.0.3"
  }
};

// vite.config.ts
import { resolve } from "node:path";
import { loggerScopePlugin } from "file:///E:/study/jumpalong/tools/logger-vite-plugin/dist/logger-vite-plugin.js";
var __vite_injected_original_import_meta_url = "file:///E:/study/jumpalong/apps/browser-ui/vite.config.ts";
var vite_config_default = defineConfig((opt) => {
  const { command, mode } = opt;
  const isProd = command === "build";
  const isTest = mode === "test";
  console.log("isProd", isProd, "isTest", isTest);
  let flag = "packages";
  let path = resolve();
  return {
    test: {
      browser: {
        // enabled: true,
        name: "chrome"
        // browser name is required
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
        "LineEmitter"
      ].map((item) => `**/${item}.test.ts`)
    },
    base: "./",
    server: {
      host: "0.0.0.0",
      proxy: {}
    },
    build: {
      chunkSizeWarningLimit: 512 * 1024
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: true,
      __INTLIFY_PROD_DEVTOOLS__: false,
      __DEV__: !isProd,
      __PROD__: isProd,
      __TEST__: isTest,
      __dirname: JSON.stringify(
        path.slice(0, path.lastIndexOf(flag) + flag.length)
      )
    },
    plugins: [
      loggerScopePlugin(),
      createReplacePlugin(isProd),
      vue({
        script: {}
      }),
      DirResolverHelper(),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/,
          // .vue
          /\.md$/
          // .md
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
              "NModal"
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
      // configCompressPlugin("gzip", false),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    optimizeDeps: {
      include: ["vue", "vue-router", "naive-ui"]
    }
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
      __VERSION__: package_default.version
    }
  });
}
function configCompressPlugin(compress, deleteOriginFile = false) {
  const compressList = compress.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile
      })
    );
  }
  return plugins;
}
export {
  configCompressPlugin,
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcc3R1ZHlcXFxcanVtcGFsb25nXFxcXGFwcHNcXFxcYnJvd3Nlci11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcc3R1ZHlcXFxcanVtcGFsb25nXFxcXGFwcHNcXFxcYnJvd3Nlci11aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovc3R1ZHkvanVtcGFsb25nL2FwcHMvYnJvd3Nlci11aS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCByZXBsYWNlIGZyb20gJ0Byb2xsdXAvcGx1Z2luLXJlcGxhY2UnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBEaXJSZXNvbHZlckhlbHBlciB9IGZyb20gJ3ZpdGUtYXV0by1pbXBvcnQtcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgY29tcHJlc3NQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnXHJcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcclxuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnbm9kZTpmcydcclxuaW1wb3J0IHsgcmVsYXRpdmUsIHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCB7IGxvZ2dlclNjb3BlUGx1Z2luIH0gZnJvbSAnQGp1bXBhbG9uZy9sb2dnZXItdml0ZS1wbHVnaW4nXHJcblxyXG4vLyBAdHMtaWdub3JlXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhvcHQgPT4ge1xyXG4gIGNvbnN0IHsgY29tbWFuZCwgbW9kZSB9ID0gb3B0XHJcblxyXG4gIGNvbnN0IGlzUHJvZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcclxuICBjb25zdCBpc1Rlc3QgPSBtb2RlID09PSAndGVzdCdcclxuICBjb25zb2xlLmxvZygnaXNQcm9kJywgaXNQcm9kLCAnaXNUZXN0JywgaXNUZXN0KVxyXG5cclxuICBsZXQgZmxhZyA9ICdwYWNrYWdlcydcclxuICBsZXQgcGF0aCA9IHJlc29sdmUoKVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdGVzdDoge1xyXG4gICAgICBicm93c2VyOiB7XHJcbiAgICAgICAgLy8gZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBuYW1lOiAnY2hyb21lJywgLy8gYnJvd3NlciBuYW1lIGlzIHJlcXVpcmVkXHJcbiAgICAgIH0sXHJcbiAgICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICAgIGVudmlyb25tZW50OiAnaGFwcHktZG9tJyxcclxuICAgICAgaW5jbHVkZTogW1xyXG4gICAgICAgICdFdmVudExpbmUnLFxyXG4gICAgICAgICdTdGFmZicsXHJcblxyXG4gICAgICAgIC8vc3RhZmZcclxuICAgICAgICAnRXZlbnRTdGFmZicsXHJcbiAgICAgICAgJ1dlYlNvY2tldEZhY3RvcnlTdGFmZicsXHJcbiAgICAgICAgJ1Bvb2xTdGFmZicsXHJcblxyXG4gICAgICAgIC8vIHV0aWxzXHJcbiAgICAgICAgJ29iamVjdCcsXHJcbiAgICAgICAgJ0xpbmVFbWl0dGVyJyxcclxuICAgICAgXS5tYXAoaXRlbSA9PiBgKiovJHtpdGVtfS50ZXN0LnRzYCksXHJcbiAgICB9LFxyXG4gICAgYmFzZTogJy4vJyxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIHByb3h5OiB7fSxcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUxMiAqIDEwMjQsXHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIF9fVlVFX0kxOE5fRlVMTF9JTlNUQUxMX186IGZhbHNlLFxyXG4gICAgICBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXzogdHJ1ZSxcclxuICAgICAgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXzogZmFsc2UsXHJcbiAgICAgIF9fREVWX186ICFpc1Byb2QsXHJcbiAgICAgIF9fUFJPRF9fOiBpc1Byb2QsXHJcbiAgICAgIF9fVEVTVF9fOiBpc1Rlc3QsXHJcbiAgICAgIF9fZGlybmFtZTogSlNPTi5zdHJpbmdpZnkoXHJcbiAgICAgICAgcGF0aC5zbGljZSgwLCBwYXRoLmxhc3RJbmRleE9mKGZsYWcpICsgZmxhZy5sZW5ndGgpXHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBsb2dnZXJTY29wZVBsdWdpbigpLFxyXG4gICAgICBjcmVhdGVSZXBsYWNlUGx1Z2luKGlzUHJvZCksXHJcbiAgICAgIHZ1ZSh7XHJcbiAgICAgICAgc2NyaXB0OiB7fSxcclxuICAgICAgfSksXHJcbiAgICAgIERpclJlc29sdmVySGVscGVyKCksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XHJcbiAgICAgICAgICAvXFwudnVlJC8sXHJcbiAgICAgICAgICAvXFwudnVlXFw/dnVlLywgLy8gLnZ1ZVxyXG4gICAgICAgICAgL1xcLm1kJC8sIC8vIC5tZFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICAvLyBcInZpdGVzdFwiLFxyXG4gICAgICAgICAgJ0B2dWV1c2UvY29yZScsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICduYWl2ZS11aSc6IFtcclxuICAgICAgICAgICAgICAndXNlRGlhbG9nJyxcclxuICAgICAgICAgICAgICAndXNlTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgJ3VzZU5vdGlmaWNhdGlvbicsXHJcbiAgICAgICAgICAgICAgJ3VzZUxvYWRpbmdCYXInLFxyXG4gICAgICAgICAgICAgICdOQnV0dG9uJyxcclxuICAgICAgICAgICAgICAnTkRyb3Bkb3duJyxcclxuICAgICAgICAgICAgICAnTkF2YXRhcicsXHJcbiAgICAgICAgICAgICAgJ05Nb2RhbCcsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICByZXNvbHZlcnM6IFtOYWl2ZVVpUmVzb2x2ZXIoKV0sXHJcbiAgICAgIH0pLFxyXG4gICAgICAvLyBjb25maWdDb21wcmVzc1BsdWdpbihcImd6aXBcIiwgZmFsc2UpLFxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogWyd2dWUnLCAndnVlLXJvdXRlcicsICduYWl2ZS11aSddLFxyXG4gICAgfSxcclxuICB9XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSZXBsYWNlUGx1Z2luKGlzUHJvZCA9IGZhbHNlKSB7XHJcbiAgY29uc3QgaXNERVYgPSAhaXNQcm9kXHJcbiAgcmV0dXJuIHJlcGxhY2Uoe1xyXG4gICAgcHJldmVudEFzc2lnbm1lbnQ6IHRydWUsXHJcbiAgICB2YWx1ZXM6IHtcclxuICAgICAgX19ERVZfXzogaXNERVYgPyAndHJ1ZScgOiAnZmFsc2UnLFxyXG4gICAgICBfX1BST0RfXzogaXNQcm9kID8gJ3RydWUnIDogJ2ZhbHNlJyxcclxuICAgICAgJ2ZhbHNlIHx8ICc6ICcnLFxyXG4gICAgICBfX1ZFUlNJT05fXzogcGFja2FnZUpzb24udmVyc2lvbixcclxuICAgIH0sXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0NvbXByZXNzUGx1Z2luKFxyXG4gIGNvbXByZXNzOiAnZ3ppcCcgfCAnYnJvdGxpJyB8ICdub25lJyxcclxuICBkZWxldGVPcmlnaW5GaWxlID0gZmFsc2VcclxuKTogUGx1Z2luT3B0aW9uW10ge1xyXG4gIGNvbnN0IGNvbXByZXNzTGlzdCA9IGNvbXByZXNzLnNwbGl0KCcsJylcclxuXHJcbiAgY29uc3QgcGx1Z2luczogUGx1Z2luT3B0aW9uW10gPSBbXVxyXG5cclxuICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcclxuICAgIHBsdWdpbnMucHVzaChcclxuICAgICAgY29tcHJlc3NQbHVnaW4oe1xyXG4gICAgICAgIGV4dDogJy5neicsXHJcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZSxcclxuICAgICAgfSlcclxuICAgIClcclxuICB9XHJcbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnJvdGxpJykpIHtcclxuICAgIHBsdWdpbnMucHVzaChcclxuICAgICAgY29tcHJlc3NQbHVnaW4oe1xyXG4gICAgICAgIGV4dDogJy5icicsXHJcbiAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxyXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGUsXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgfVxyXG4gIHJldHVybiBwbHVnaW5zXHJcbn1cclxuIiwgIntcbiAgXCJuYW1lXCI6IFwiQGp1bXBhbG9uZy9icm93c2VyLXVpXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4wLWJhdGUuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiXCIsXG4gIFwidHlwZXNcIjogXCJkaXN0L3R5cGVzL2luZGV4LmQudHNcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwiYnVpbGRPcHRpb25zXCI6IHtcbiAgICBcImhlbHBcIjogXCJkaXNhYmxlQnVpbGQgIFx1OEZEOVx1NUMwNlx1NEYxQVx1Nzk4MVx1NkI2Mlx1OTAxQVx1NzUyOFx1Njc4NFx1NUVGQVx1ODExQVx1NjcyQ1wiLFxuICAgIFwiZGlzYWJsZUJ1aWxkXCI6IHRydWVcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwiXCJcbiAgfSxcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi4vYXV0by1pbXBvcnRzXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2F1dG8taW1wb3J0cy5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi9jb21wb25lbnRzXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2NvbXBvbmVudHMuZC50c1wiXG4gICAgfVxuICB9LFxuICBcImtleXdvcmRzXCI6IFtdLFxuICBcImF1dGhvclwiOiBcIlwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGp1bXBhbG9uZy9sb2dnZXJcIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQGp1bXBhbG9uZy9sb2dnZXItdml0ZS1wbHVnaW5cIjogXCJ3b3Jrc3BhY2U6KlwiLFxuICAgIFwiQGp1bXBhbG9uZy9ub3N0ci1ydW50aW1lXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkBqdW1wYWxvbmcvc2hhcmVkXCI6IFwid29ya3NwYWNlOipcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC43LjFcIixcbiAgICBcIm5haXZlLXVpXCI6IFwiXjIuMzYuMFwiLFxuICAgIFwibm9zdHItdG9vbHNcIjogXCJeMi4xLjFcIixcbiAgICBcInJvbGx1cFwiOiBcIl40LjkuNlwiLFxuICAgIFwidnVlXCI6IFwiXjMuNC44XCIsXG4gICAgXCJ2dWUtaTE4blwiOiBcIl45LjguMFwiLFxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjIuNVwiLFxuICAgIFwiQHZpdGVzdC9icm93c2VyXCI6IFwiXjAuMzQuNlwiLFxuICAgIFwiQHZ1ZXVzZS9jb21wb25lbnRzXCI6IFwiXjkuMTMuMFwiLFxuICAgIFwiYmVjaDMyXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJjb3Jkb3ZhLWFuZHJvaWRcIjogXCIxMC4xLjJcIixcbiAgICBcImV2ZW50c1wiOiBcIl4zLjMuMFwiLFxuICAgIFwiaW52ZXJzaWZ5XCI6IFwiXjYuMC4xXCIsXG4gICAgXCJpbnZlcnNpZnktaW5qZWN0LWRlY29yYXRvcnNcIjogXCJeMy4xLjBcIixcbiAgICBcIm1hdm9uLWVkaXRvclwiOiBcIl4zLjAuMVwiLFxuICAgIFwibWluaW1hdGNoXCI6IFwiXjkuMC4wXCIsXG4gICAgXCJyZWZsZWN0LW1ldGFkYXRhXCI6IFwiXjAuMS4xM1wiLFxuICAgIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjogXCJeMC41LjFcIixcbiAgICBcIndlYmRyaXZlcmlvXCI6IFwiXjguMjQuNVwiLFxuICAgIFwid2VibG5cIjogXCJeMC4zLjJcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAanVtcGFsb25nL2xvZ2dlci12aXRlLXBsdWdpblwiOiBcIndvcmtzcGFjZToqXCIsXG4gICAgXCJAYmFiZWwvcGFyc2VyXCI6IFwiXjcuMjMuNVwiLFxuICAgIFwiQGNvZHNwZWVkL3ZpdGVzdC1wbHVnaW5cIjogXCJeMi4zLjFcIixcbiAgICBcIkByb2xsdXAvcGx1Z2luLWFsaWFzXCI6IFwiXjUuMC4xXCIsXG4gICAgXCJAcm9sbHVwL3BsdWdpbi1jb21tb25qc1wiOiBcIl4yMi4wLjJcIixcbiAgICBcIkByb2xsdXAvcGx1Z2luLWpzb25cIjogXCJeNi4wLjFcIixcbiAgICBcIkByb2xsdXAvcGx1Z2luLW5vZGUtcmVzb2x2ZVwiOiBcIl4xMy4zLjBcIixcbiAgICBcIkByb2xsdXAvcGx1Z2luLXJlcGxhY2VcIjogXCJeNS4wLjVcIixcbiAgICBcIkByb2xsdXAvcGx1Z2luLXRlcnNlclwiOiBcIl4wLjQuNFwiLFxuICAgIFwiQHR5cGVzL21pbmltaXN0XCI6IFwiXjEuMi41XCIsXG4gICAgXCJAdHlwZXMvbW9ja2RhdGVcIjogXCJeMy4wLjBcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE2LjExLjY4XCIsXG4gICAgXCJAdHlwZXMvcHJldHRpZXJcIjogXCJeMi43LjBcIixcbiAgICBcIkB0eXBlcy9zaGVsbGpzXCI6IFwiXjAuOC4xMVwiLFxuICAgIFwiQHZ1ZS9jb25zb2xpZGF0ZVwiOiBcIjAuMTcuM1wiLFxuICAgIFwiQHZ1ZS9yZWFjdGl2aXR5XCI6IFwiXjMuMi4zOFwiLFxuICAgIFwiQHZ1ZS90ZXN0LXV0aWxzXCI6IFwiXjIuMS4wXCIsXG4gICAgXCJAdnVlL3RzY29uZmlnXCI6IFwiXjAuMS4zXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xMlwiLFxuICAgIFwiY2FjXCI6IFwiXjYuNy4xNFwiLFxuICAgIFwiY29tcHJlc3NpbmdcIjogXCJeMS45LjBcIixcbiAgICBcImNvcmRvdmEtcGx1Z2luLWNhbWVyYVwiOiBcIl42LjAuMFwiLFxuICAgIFwiZXhlY2FcIjogXCJeOC4wLjFcIixcbiAgICBcImhhcHB5LWRvbVwiOiBcIl44LjcuMFwiLFxuICAgIFwibWFnaWMtc3RyaW5nXCI6IFwiXjAuMzAuNVwiLFxuICAgIFwibWluaW1pc3RcIjogXCJeMS4yLjhcIixcbiAgICBcIm1vY2tkYXRlXCI6IFwiXjMuMC41XCIsXG4gICAgXCJucG0tcnVuLWFsbFwiOiBcIl40LjEuNVwiLFxuICAgIFwicGljb2NvbG9yc1wiOiBcIl4xLjAuMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMThcIixcbiAgICBcInByZXR0eS1ieXRlc1wiOiBcIl42LjEuMVwiLFxuICAgIFwicHJvY2Vzc1wiOiBcIl4wLjExLjEwXCIsXG4gICAgXCJyb2xsdXBcIjogXCJeNC45LjZcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tZXNidWlsZFwiOiBcIl42LjEuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi1wb2x5ZmlsbC1ub2RlXCI6IFwiXjAuMTIuMFwiLFxuICAgIFwicm9sbHVwLXBsdWdpbi10ZXJzZXJcIjogXCJeNy4wLjJcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdHlwZXNjcmlwdDJcIjogXCJeMC4zNi4wXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNjEuMFwiLFxuICAgIFwic2hlbGxqc1wiOiBcIl4wLjguNVwiLFxuICAgIFwic3RhbmRhcmQtdmVyc2lvblwiOiBcIl45LjUuMFwiLFxuICAgIFwic3R5bHVzXCI6IFwiXjAuNTkuMFwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy4yLjFcIixcbiAgICBcInRzbGliXCI6IFwiXjIuNi4yXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMi4yXCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE0LjNcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjQuMFwiLFxuICAgIFwidml0ZS1hdXRvLWltcG9ydC1yZXNvbHZlcnNcIjogXCJeMy4wLjVcIixcbiAgICBcInZpdGVzdFwiOiBcIl4xLjAuNFwiLFxuICAgIFwidnVlLXRzY1wiOiBcIl4xLjAuOFwiLFxuICAgIFwidml0ZVwiOiBcIl41LjAuOFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMC4zXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUyxPQUFPLGFBQWE7QUFDdFQsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZSxXQUFXO0FBQ25DLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsdUJBQXVCO0FBQ2hDLE9BQU8sZ0JBQWdCO0FBRXZCLFNBQVMseUJBQXlCO0FBQ2xDLE9BQU8sb0JBQW9CO0FBQzNCLFNBQVMsb0JBQW9COzs7QUNUN0I7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGFBQWU7QUFBQSxFQUNmLE9BQVM7QUFBQSxFQUNULE1BQVE7QUFBQSxFQUNSLGNBQWdCO0FBQUEsSUFDZCxNQUFRO0FBQUEsSUFDUixjQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1Qsa0JBQWtCO0FBQUEsTUFDaEIsT0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLE1BQ2QsT0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUEsRUFDQSxVQUFZLENBQUM7QUFBQSxFQUNiLFFBQVU7QUFBQSxFQUNWLFNBQVc7QUFBQSxFQUNYLGNBQWdCO0FBQUEsSUFDZCxxQkFBcUI7QUFBQSxJQUNyQixpQ0FBaUM7QUFBQSxJQUNqQyw0QkFBNEI7QUFBQSxJQUM1QixxQkFBcUI7QUFBQSxJQUNyQixnQkFBZ0I7QUFBQSxJQUNoQixZQUFZO0FBQUEsSUFDWixlQUFlO0FBQUEsSUFDZixRQUFVO0FBQUEsSUFDVixLQUFPO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUEsSUFDZCxtQkFBbUI7QUFBQSxJQUNuQixzQkFBc0I7QUFBQSxJQUN0QixRQUFVO0FBQUEsSUFDVixtQkFBbUI7QUFBQSxJQUNuQixRQUFVO0FBQUEsSUFDVixXQUFhO0FB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
