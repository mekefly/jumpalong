import { cac } from "cac";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { relative, resolve } from "path";
import { cp, exit, mkdir } from "shelljs";
const cli = cac();
const parsedArgv = cli.parse();
if (parsedArgv.options["help"]) {
  console.log("argv:");
  console.log("  <packageName>");

  exit(0);
}
const [packageName] = parsedArgv.args;
const packagesPath = "packages";

const BASE_PATH = "scripts/create";
const runDir = resolve();
const relativeRunDir = (path: string) => relative(runDir, path);
const templateName = "template";
const subPackageDir = `${packagesPath}/${packageName}/`;
const subPackageFullDir = resolve(subPackageDir);
const fullPackagesPath = resolve(packagesPath);

existPackagesDir();
existsSubPackageDir();
copy();
initPackage();
iGuessYouNeed();

function existPackagesDir() {
  if (!existsSync(fullPackagesPath)) {
    mkdir(fullPackagesPath);
  }
}
function existsSubPackageDir() {
  if (existsSync(subPackageFullDir)) {
    console.error("该项目已存在");

    exit(1);
  }
}
function copy() {
  const result = cp(
    "-r",
    relativeRunDir(resolve(BASE_PATH, templateName)),
    relativeRunDir(subPackageFullDir)
  );

  if (result.code !== 0) {
    exit(result.code);
  }
}

function initPackage() {
  const packageJson = getPackageJson();

  const workSpaceName =
    packageJson.shortName ??
    packageJson.workspaceName ??
    packageJson.name ??
    "workspace";

  const subPackageName = `@${workSpaceName}/${packageName}`;

  const subPackageJson = getPackageJson(resolve(subPackageFullDir));

  subPackageJson.name = subPackageName;

  writePackageJson(subPackageFullDir, subPackageJson);
}

function writePackageJson(packagePath: string = resolve(), jsonObj: any) {
  writeFileSync(resolve(packagePath, "package.json"), JSON.stringify(jsonObj));
}

function getPackageJson(packagePath: string = resolve()): any {
  return JSON.parse(
    readFileSync(resolve(packagePath, "package.json"), "utf-8")
  );
}
function iGuessYouNeed() {
  console.log(`项目已创建到：${subPackageFullDir}`);
}
