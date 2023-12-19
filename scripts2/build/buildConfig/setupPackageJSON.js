import { resolve } from "path";
import { jsonModifier, pathSubtract } from "./utils";

export function setupPackageJSON({
  input,
  output,
  name,
  format,
  prod: isProd = false,
  declaration,
  packagePath,
  packageJson,
}) {
  if (isProd) {
    return;
  }
  const keys = packageJsonKeyMap[format];
  if (!keys) {
    return;
  }
  const packageJsonPath = resolve(packagePath, "package.json");
  const jsonM = jsonModifier(packageJsonPath, packageJson);
  const json = jsonM.json;
  keys.forEach((key) => {
    if (json[key]) {
      return;
    }
    const value = pathSubtract(output, packagePath);

    json[key] = value;
  });

  jsonM.setup();
}

export const packageJsonKeyMap = {
  cjs: ["main"],
  esm: ["module"],
  iife: ["unpkg", "jsdelivr"],
};
