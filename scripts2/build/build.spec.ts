import { buildPackages } from "./build";
import { HandelOptions } from "./buildHandel";
import { createOptions } from "./buildOptions";

test("buildPackages", async () => {
  const vs: any[] = [];
  const fn = vitest.fn((v) => {
    vs.push(v);
  });

  const handelOptions: HandelOptions = {
    runs: fn,
    $: () => {},
    genBuildStringCommend() {
      return [];
    },
    commandPreview() {},
  };

  const configOptions = createOptions({
    packages: ",",
    workSpace: "scripts/build/testCase",
  });

  await buildPackages(configOptions, handelOptions);

  expect(fn.mock.calls.length).toMatchInlineSnapshot("1");
  expect(vs).toMatchInlineSnapshot(`
    [
      [
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:cjs",
          "ROLLUP_BUILD_PROD:false",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\dist\\\\vue-vapor-compile-sfc.cjs.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:esm",
          "ROLLUP_BUILD_PROD:false",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\dist\\\\vue-vapor-compile-sfc.esm.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:iife",
          "ROLLUP_BUILD_PROD:false",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\dist\\\\vue-vapor-compile-sfc.iife.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:cjs",
          "ROLLUP_BUILD_PROD:true",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\dist\\\\vue-vapor-compile-sfc.cjs.prod.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:esm",
          "ROLLUP_BUILD_PROD:true",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\dist\\\\vue-vapor-compile-sfc.esm.prod.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:iife",
          "ROLLUP_BUILD_PROD:true",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc\\\\dist\\\\vue-vapor-compile-sfc.iife.prod.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:cjs",
          "ROLLUP_BUILD_PROD:false",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\dist\\\\vue-vapor-compile-sfc.cjs.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc copy",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:esm",
          "ROLLUP_BUILD_PROD:false",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\dist\\\\vue-vapor-compile-sfc.esm.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc copy",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:iife",
          "ROLLUP_BUILD_PROD:false",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\dist\\\\vue-vapor-compile-sfc.iife.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc copy",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:cjs",
          "ROLLUP_BUILD_PROD:true",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\dist\\\\vue-vapor-compile-sfc.cjs.prod.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc copy",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:esm",
          "ROLLUP_BUILD_PROD:true",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\dist\\\\vue-vapor-compile-sfc.esm.prod.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc copy",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
        [
          "ROLLUP_BUILD_INPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\src\\\\index.ts",
          "ROLLUP_BUILD_FORMAT:iife",
          "ROLLUP_BUILD_PROD:true",
          "ROLLUP_BUILD_OUTPUT:scripts\\\\build\\\\testCase\\\\compile-sfc copy\\\\dist\\\\vue-vapor-compile-sfc.iife.prod.js",
          "ROLLUP_BUILD_NAME:VueVaporCompileSfc",
          "ROLLUP_BUILD_PACKAGE_PATH:scripts\\\\build\\\\testCase\\\\compile-sfc copy",
          "ROLLUP_BUILD_DECLARATION:true",
        ],
      ],
    ]
  `);
});
