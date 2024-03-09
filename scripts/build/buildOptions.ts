import { readdirSync } from "fs";
import { basename, resolve } from "path";
import { splitter } from "./build";
import { CliOptions } from "./types";

export const DEFAULT_BUILD_OPTIONS = {
  // inputPath 设置为空就不会构建了
  inputPath: ["./src/index.ts"],
  // 默认的packages的目录
  workSpace: ["packages"],
  //过滤
  //本次要构建哪几个项目
  includePackages: [] as string[],
  include: [],
  //
  packages: ["./"],
  output: "dist",
  format: ["cjs", "esm", "iife"],
  prod: ["false", "true"],
  declaration: true,
  watch: false,
  disableConcurrent: false,
};
export type BuildOptions = typeof DEFAULT_BUILD_OPTIONS;

export function createOptions(parsedOptions: CliOptions) {
  const options = Object.assign(
    {},
    DEFAULT_BUILD_OPTIONS,
    parseCliOptions(parsedOptions, DEFAULT_BUILD_OPTIONS)
  );

  const packages = options.workSpace
    .map((workspaceName) => {
      return readdirSync(workspaceName).map((dirName) => {
        return resolve(workspaceName, dirName);
      });
    })
    .flat(Infinity) as string[];

  packages.push(...options.packages.map((dir) => resolve(dir)));

  options.packages = includeDir(packages, options.includePackages);

  return options;
}
export function includeDir(dirs: string[], filters: string[]) {
  if (filters.length === 0) {
    return dirs;
  }
  return dirs.filter((dir) => filters.includes(basename(dir)));
}

export function parseCliOptions(
  cliOptions: CliOptions,
  buildOptions: BuildOptions = DEFAULT_BUILD_OPTIONS as any
): BuildOptions {
  const options: any = {};

  Object.keys(buildOptions).forEach((key) => {
    const cliValue = cliOptions[key];

    if (cliValue === undefined) {
      return;
    }
    const buildValue = (buildOptions as any)[key];

    if (Array.isArray(buildValue)) {
      if (cliValue === ",") {
        options[key] = [];
        return;
      }
      options[key] = (cliValue as string)?.split(splitter) ?? [];
    } else if (typeof cliValue === "boolean") {
      options[key] = cliValue ? "true" : "false";
    } else {
      options[key] = cliValue;
    }
  });
  return options as any;
}

export function mixinAndFilterBuildOptions(o1: any, o2: any) {
  const newOptions: any = {};
  Object.entries(o2).forEach(([k2, ov2]) => {
    const ov1 = o1[k2];
    if (!ov1) {
      newOptions[k2] = ov2;
      return;
    }
    if (Array.isArray(ov2)) {
      if (Array.isArray(ov1)) {
        newOptions[k2] = ov2.filter((v) => ov1.includes(v));
      } else {
        throw new Error(`BuildOptions中的${k2},必须是数组类型`);
      }
    } else {
      newOptions[k2] = ov1;
    }
  });

  return newOptions;
}
