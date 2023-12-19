import { relative, resolve } from "path";
export function genNameByPackageName(packageName: string) {
  return `${packageName.replace("@", "").replace("/", "-")}`;
}
export function genFileName(name: string, format: string, prod: string) {
  return `${name}.${format}${stringToBoolean(prod) ? ".prod" : ""}.js`;
}
export function genExportName(name: string) {
  return capitalize(camelize(name));
}
/**
 * 驼峰命名
 */
export function camelize(str: string) {
  const camelizeRE = /-(\w)/g;
  return str.replace(camelizeRE, (_, r) => r.toUpperCase());
}
/**
 *首字母大写
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function stringToBoolean(value: string) {
  return value === "true" ? true : value === "false" ? false : false;
}
export const envPrefix = `ROLLUP_BUILD_`;
export function createEnvString(key: string, value: string) {
  return `${envPrefix}${key}:${value}`;
}
export function intraProjectPath(fullPath: string) {
  return relative(resolve(""), fullPath);
}
