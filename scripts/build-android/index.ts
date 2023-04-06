import { cac } from "cac";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { relative, resolve } from "path";
import { cd, exec } from "shelljs";

const cli = cac();
let {
  options: {
    noBuild,
    SCRIPT_SRC_ROOT = __dirname,
    CURRENT_SCRIPT_SRC_ROOT = __dirname,
  },
} = cli.parse();

const PACKSGE_ROOT = resolve();

CURRENT_SCRIPT_SRC_ROOT = resolve(CURRENT_SCRIPT_SRC_ROOT);
console.log("CURRENT_SCRIPT_SRC_ROOT", CURRENT_SCRIPT_SRC_ROOT);

const RELEADE_PATH = resolve("release");

const CORDOVA_ROOT = resolve("packages/cordova");
console.log("SCRIPT_SRC_ROOT", SCRIPT_SRC_ROOT);

//创建目录
try {
  mkdirSync(resolve(PACKSGE_ROOT, "packages"));
  mkdirSync(resolve(PACKSGE_ROOT, "packages/cordova"));
} catch (error) {}

//获取json
const packageJsonString = readFileSync("package.json", "utf-8");
const packageJson = JSON.parse(packageJsonString);

const version = packageJson.version;

const defaultCordovaPackageString = readFileSync(
  resolve(CURRENT_SCRIPT_SRC_ROOT, "cordova/cordovaPackage.json"),
  "utf-8"
);

const defaultCordovaPackageJson = JSON.parse(defaultCordovaPackageString);

const includeKeys = ["name", "displayName", "version", "description"];
const includePackageJson = Object.fromEntries(
  Object.entries(packageJson).filter(([key, value]) =>
    includeKeys.some((v) => v === key)
  )
);

const cordovaPackageJson = Object.assign(
  defaultCordovaPackageJson,
  includePackageJson
);
const packageJsonPath = resolve(CORDOVA_ROOT, "package.json");

console.log(`package.json will be create to ${packageJsonPath}`);
writeFileSync(
  packageJsonPath,
  JSON.stringify(cordovaPackageJson, undefined, "\r")
);
console.log("Create package.json success !");

// 读取xml
let configXmlString = readFileSync(
  resolve(CURRENT_SCRIPT_SRC_ROOT, "cordova/config.xml"),
  "utf-8"
);

// 给模版填写值
for (const [key, value] of Object.entries(cordovaPackageJson)) {
  configXmlString = configXmlString.replaceAll(`__${key}__`, String(value));
}
const configXmlPath = resolve(CORDOVA_ROOT, "config.xml");

console.log(`config.xml will be create to ${configXmlPath}`);
writeFileSync(configXmlPath, configXmlString);
console.log("Create config.xml success !");

console.log("start build www");
!noBuild && exec("pnpm vite-build-android");

cd("packages");

cd("cordova");

for (const pathName of ["platforms", "plugins"]) {
  const path = resolve("./", pathName);
  console.log(`rm:${path}`);

  rmSync(path, { force: true, recursive: true });

  cpSync(
    resolve(CURRENT_SCRIPT_SRC_ROOT, "cordova", pathName),
    resolve(CORDOVA_ROOT, pathName),
    { force: true, recursive: true }
  );
}

//安装依赖
exec("pnpm install");

console.log("");

console.log("run: cordova build android");

exec("cordova build android");
exec("cat package.json");
const releaseApkPath = resolve(
  RELEADE_PATH,
  `${packageJson.displayName}.${version}.apk`
);
try {
  cpSync(
    "platforms/android/app/build/outputs/apk/debug/app-debug.apk",
    releaseApkPath,
    {}
  );
  console.log(`release:${relativePath(releaseApkPath)}`);
} catch (error) {
  console.error(error);
}

function relativePath(path: string) {
  return relative(PACKSGE_ROOT, path);
}
