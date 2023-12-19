import cac from "cac";
import { zip } from "compressing";
import { mkdirSync, readdirSync, readFileSync } from "fs";
import { relative, resolve } from "path";
import { exec } from "shelljs";

const cli = cac();
//命令行选项
const defaultOptions = {
  patch: false,
  minor: false,
  major: false,
  test: true,
};

//构建命令行工具
const set = new Set();
for (const key in defaultOptions) {
  const value = (defaultOptions as any)[key];

  let help = "";
  if (Array.isArray(value)) {
    help = `可以用,号分隔写多个 默认值：${
      value.length ? "[空]" : value.join(",")
    }`;
  } else {
    help = String(value);
  }
  const short = key.slice(0, 1).toLocaleUpperCase();
  if (set.has(short)) {
    cli.option(`--${key} <${key}>`, help);
    continue;
  }
  set.add(short);

  cli.option(`-${short}, --${key} <${key}>`, help);
}

cli.usage("可以输入参数设置\n','号将清空默认值，命令后面的例子就是默认值选项");
cli.help();
const parsedArgv = cli.parse();
const { patch, minor, major, test } = Object.assign(
  {},
  defaultOptions,
  parsedArgv.options
);

function isTrue(v: boolean | "true" | "false") {
  if (v === true || v === "true") {
    return true;
  } else if (v === "false" || v === false) {
    return false;
  } else {
    return false;
  }
}

const PACKSGE_ROOT = resolve();

run();
async function run() {
  //发布版本和构建
  let l = "pnpm release";
  if (isTrue(patch)) {
    l += ":patch";
  } else if (isTrue(minor)) {
    l += ":minor";
  } else if (isTrue(major)) {
    l += ":major";
  } else {
    l += ":patch";
  }
  if (isTrue(test)) {
    l += ":test";
  }
  exec(l);

  //获取json
  const packageJsonString = readFileSync("package.json", "utf-8");
  const packageJson = JSON.parse(packageJsonString);

  const version = packageJson.version;
  const tag = `v${version}`;

  const releasePath = resolve("release", version);

  //创建文件夹
  try {
    mkdirSync(releasePath, { recursive: true });
  } catch (error) {}

  //将构建好的dist压缩为zip
  console.log();
  const start = resolve("dist/");
  const end = resolve("release", version, "dist.zip");
  console.log(`zip ${start} to ${end}`);

  await zip.compressDir(start, end);
  console.log();
  //找到需要发布的文件
  const fileNames = readdirSync(releasePath);
  const filePaths = fileNames.map((fileName) =>
    relativePath(resolve(releasePath, fileName))
  );

  const ghRelease = `gh release create ${tag} ${filePaths.join(
    " "
  )}  -d --generate-notes`;

  console.log(`run: ${ghRelease}`);

  exec("git push --tags origin");
  //将其发布
  exec(ghRelease);
}

function relativePath(path: string) {
  return relative(PACKSGE_ROOT, path);
}
