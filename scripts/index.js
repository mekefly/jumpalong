const { exec } = require("shelljs");
const {
  existsSync,
  accessSync,
  readdirSync,
  writeFileSync,
  readFileSync,
} = require("fs");
const { resolve, basename, relative, join, dirname } = require("path");
const minimist = require("minimist");
const { exit } = require("process");
const pc = require("picocolors");

const exclude = [/\.json$/, "index.js"];

const ROOT_DIR = resolve();

const BASE_PATH = __dirname;
const SCRIPT_ROOT = BASE_PATH;
const DIST_BASE_PATH = resolve(relativePath(BASE_PATH), "dist/");
const possibleName = ["main.js"];

const TS_CONFIG_NAME = `tsconfig.json`;
const TS_CONFIG_PATH = `./tsconfig.json`;
const TEMP_TS_CONFIG_NAME = `temp.${TS_CONFIG_NAME}`;
const TEMP_TS_CONFIG_PATH = resolve(
  BASE_PATH,
  dirname(TS_CONFIG_PATH),
  `temp.${basename(TS_CONFIG_PATH)}`
);

const { scriptsArgv, commendArgv, scriptsOptions } = getArgvOptions(
  global.process.argv
);
const rPath = scriptsArgv.join("/");
const distPath = resolve(DIST_BASE_PATH, rPath);
const path = resolve(BASE_PATH, rPath);

if (scriptsArgv.length === 0) {
  help();
  exit(-1);
}
run();

function run(params) {
  //验证要运行的scriptBuild是否存在
  if (!scriptsOptions.reBuild && existsSync(distPath)) {
    runScript(distPath, path);
  } else {
    if (existsSync(path)) {
      buildScript(path);
      runScript(distPath, path);
    } else {
      console.error("命令不存在%s", rPath);
      process.exit(-1);
    }
  }
}

function relativePath(path) {
  return relative(ROOT_DIR, path);
}

function runScript(scriptPath, scriptSrcPath) {
  console.log("scriptSrcPath", scriptSrcPath);
  const sp = findScriptPath(scriptPath);
  let c = `node ${relativePath(sp)} --CURRENT_SCRIPT_SRC_ROOT=${relativePath(
    scriptSrcPath
  )} --SCRIPT_SRC_ROOT=${relativePath(SCRIPT_ROOT)} ${commendArgv.join(" ")}`;
  console.log(`run: ${c}`);
  exec(c);
}

function findScriptPath(scriptPath) {
  for (const name of possibleName) {
    const newScriptPath = resolve(scriptPath, name);
    if (existsSync(newScriptPath)) {
      return newScriptPath;
    }
  }
  return scriptPath;
}

function buildScript(buildPath) {
  const tsConfigPath = findTsConfig(buildPath);
  const termTsConfigPath = resolve(dirname(tsConfigPath), TEMP_TS_CONFIG_NAME);
  writeTermTsConfig(buildPath, tsConfigPath, termTsConfigPath);

  let c = `npx tsc -p ${TEMP_TS_CONFIG_PATH}`;
  console.log(`buildScript: ${c}`);
  exec(c);
}
function writeTermTsConfig(buildPath, tsConfigPath, termTsConfigPath) {
  const tsConfig = readTsConfig(tsConfigPath);
  const include = tsConfig?.include ?? [];

  const jsonConfigContent = JSON.stringify({
    extends: tsConfigPath,
    include:
      include.length === 0
        ? [relative(BASE_PATH, buildPath)]
        : include.map((include) =>
            relative(BASE_PATH, resolve(buildPath, include))
          ),
  });

  writeFileSync(TEMP_TS_CONFIG_PATH, jsonConfigContent);
}
function readTsConfig(tsConfigPath) {
  const configString = readFileSync(tsConfigPath, "utf-8");
  const config = JSON.parse(configString);
  if (config.extends) {
    Object.setPrototypeOf(
      config,
      readTsConfig(resolve(dirname(tsConfigPath), config.extends))
    );
  }
  return config;
}

function findTsConfig(path) {
  let p = path;
  while (p.length >= __dirname.length) {
    const tsConfigPath = resolve(p, TS_CONFIG_PATH);
    if (existsSync(tsConfigPath)) {
      return tsConfigPath;
    }
    p = resolve(p, "../");
  }

  console.error(
    "'tsconfig.json' is Not Found in scripts path.\npath:%s",
    rPath
  );
  exit(-2);
}
/**
 * @param {string[]} argv
 * @return {*}
 */
function getArgvOptions(argv) {
  argv = argv.slice(2);
  if (argv.length === 0) {
    help();
    exit(0);
  }
  let index = argv.indexOf("$");

  if (index === -1) {
    const scriptsOptions = minimist(argv, { boolean: ["reBuild"] });
    const scriptsCommend = argv.find((item, index) => !item.startsWith("-"));

    index = argv.indexOf(scriptsCommend);
    if (index === -1) {
      help();
      exit(1);
    }
  }

  let scriptsArgv = argv.slice(0, index + 1);

  //删除最后一个$
  scriptsArgv =
    scriptsArgv[scriptsArgv.length - 1] === "$"
      ? scriptsArgv.slice(0, -1)
      : scriptsArgv;

  const commendArgv = argv.slice(index + 1, argv.length);

  const scriptsOptions = minimist(scriptsArgv, { boolean: ["reBuild"] });
  return { scriptsArgv: scriptsOptions._, commendArgv, scriptsOptions };
}

function help() {
  console.log("你可以在$后面跟随子命令，例如：");
  console.log(
    "node scripts build $ --prod true => npx tsc -p scripts/temp.tsconfig.json && node scripts/build --prod true"
  );
  console.log("你可以输入简写命令：");
  console.log("node scripts build --prod true");

  let commends = readdirSync(BASE_PATH);
  commends = commends.filter(
    (commend) =>
      !exclude.some((ex) => {
        return typeof ex === "string" ? commend.includes(ex) : ex.test(commend);
      })
  );
  commends.forEach((commend) => console.log(` ${pc.blue(commend)}`));
  exit(0);
}
