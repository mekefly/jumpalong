import { cac } from "cac";
import { readFileSync } from "fs";
import { cd, echo, exec, exit, which } from "shelljs";

//获取json
const packageJsonString = readFileSync("package.json", "utf-8");
const packageJson = JSON.parse(packageJsonString);

//命令行工具版本号
const cli = cac();
cli.version(packageJson.version);

//命令行选项
const Options = {
  test: false,
  noBuild: false,
};
//构建命令行工具
const set = new Set();
for (const key in Options) {
  const value = (Options as any)[key];

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

console.log("You can enter --help,To get more help");

// 参数
const { options } = cli.parse();

const { test, noBuild, help } = options as Partial<
  typeof Options & { help: boolean }
>;

//处理帮助
if (help) {
} else {
  //验证是否具有git命令
  if (!which("git")) {
    echo("Sorry, this script requires git");
    exit(1);
  }
  deploy();
}

function deploy() {
  if (!noBuild) {
    exec("npm run build-only");
  }

  cd("dist");

  exec("git init");
  exec("git add -A");
  exec("git commit -m 'deploy'");
  exec(`git branch -M main`);

  if (test) {
    exec(`git push -f -u git@github.com:jumpalong/test.git main`);
  } else {
    exec(`git push -f git@github.com:jumpalong/jumpalong.github.io.git main`);
  }

  cd("..");
}
