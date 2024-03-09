import { nodeResolve} from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { readFileSync } from "fs";
import { resolve as pathResolve, relative, resolve } from "path";
import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-typescript2";

// 可能会用到的
// import pluginNodeResolve from "@rollup/plugin-node-resolve";
// import replace from "@rollup/plugin-replace";
// import commonjs from "@rollup/plugin-commonjs";
// import ts from "rollup-plugin-typescript2";
// import { terser } from "rollup-plugin-terser";
// import path from "path";
// import { babel } from "@rollup/plugin-babel";
// import packageJson from "./package.json";

export function createPlugin({
  input: inputPath,
  format,
  prod: isProd = false,
  declaration = true,
  packagePath,
  output,
  packageJson,
}) {
  function packageRelativePathResolve(path) {
    return resolve(packagePath, path);
  }
  const isSourceMap = !isProd;
  const ret = [];

  ret.push(loggerScopePlugin());
  ret.push(createReplacePlugin(isProd, packageJson));
  ret.push(
    ts({
      tsconfig: pathResolve("scripts/build/buildConfig/tsconfig.json"),
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          module: "esnext",
          baseUrl: packagePath,
          rootDir: packageRelativePathResolve(""),
          removeComments: isProd,
          sourceMap: true,
          declaration: declaration,
          declarationMap: declaration,
          declarationDir: packageRelativePathResolve("dist/types"),
          noUnusedLocals: false, //未使用的报错
        },
        include: [packageRelativePathResolve("./src")],
        exclude: ["node_modules"],
      },
    })
  );

  // console.log("pluginNodeResolve",pluginNodeResolve(["js", "ts", "json"]));
  // console.log("pluginNodeResolve", pluginNodeResolve);
  ret.push(nodeResolve(["js", "ts", "json"]));
  // console.log(createReplacePlugin(isProd, packageJson));

  // ret.push(babelPlugin);
  if (isProd) {
    ret.push(
      terser({
        module: /esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
        safari10: true,
        format: {
          comments: function () {
            return false;
          },
        },
      })
    );
  }

  return ret;
}

export function createReplacePlugin(isProd, packageJson) {
  const isDEV = !isProd;
  return replace({
    preventAssignment: true,
    values: {
      "global.__DEV__ = true": "",
      "global.__PROD__ = false": "",
      __DEV__: isDEV,
      __PROD__: isProd,
      "false || ": "",
      __VERSION__: packageJson.version,
    },
  });
}

function loggerScopePlugin() {
  return {
    name: "loggerScopePlugin",
    load(id) {
      let code = readFileSync(id, "utf-8");
      let flag = "//@LoggerScope";
      //是否具有scope
      let isWithLoggerImport = false;

      let rows = code
        .split("\n")
        .map((item) => {
          if (item.includes(flag)) {
            isWithLoggerImport = true;
            //更细节的局部，如函数和箭头函数，@todo
            // let c = item.replace(flag);
            // let part = `logger = _loggerFactory.create(${JSON.stringify(
            //   relative(__dirname, id)
            // )}); //@LoggerScope`;
            // if (c === "") {
            //   return part;
            // } else {
            //   return [c, part];
            // }
          } else {
            return item;
          }
        })
        .flat(1);

      if (isWithLoggerImport) {
        rows.unshift(
          `import {loggerFactory as _loggerFactory} from "@jumpalong/logger";\nlet logger = _loggerFactory.create(${JSON.stringify(
            relative(__dirname, id).replaceAll("../", "").replaceAll("..\\", "") //删除所有../
          )}); //@LoggerScope`
        );
      }

      // console.log('rows.join("\n")', rows.join("\n"));
      return rows.join("\n");
    },
  };
}
