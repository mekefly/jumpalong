import { readFileSync } from "fs";
import { resolve } from "path";
import { BuildOptions } from "./buildOptions";

export function readPackageJson(packagePath: string): PackageJson {
  return readJson(resolve(packagePath, "./package.json"));
}
export function readJson(path: string): any {
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch (error) {
    return {};
  }
}

export type PackageJson = {
  name?: string;
  shortName?: string;
  buildOptions?: PackageJsonBuildOptions;
};
export type PackageJsonBuildOptions = Partial<BuildOptions> & {
  disableBuild?: boolean;
  importantOptions?: BuildOptions;
};
