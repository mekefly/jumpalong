#!/usr/bin/env node
import { cac } from "cac";
import { readFileSync } from "fs";
import pc from "picocolors";
import { build } from "./build";
import { DEFAULT_BUILD_OPTIONS } from "./buildOptions";
const packageJsonString = readFileSync("package.json", "utf-8");
const packageJson = JSON.parse(packageJsonString);

const cli = cac();
cli.version(packageJson.version);

const map: any = {};
const set = new Set();

for (const key in DEFAULT_BUILD_OPTIONS) {
  const value = (DEFAULT_BUILD_OPTIONS as any)[key];

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

cli.option("-w, --watch", "监听更改");

cli.usage("可以输入参数设置\n','号将清空默认值，命令后面的例子就是默认值选项");
cli.help();

const parsed = cli.parse();

async function run() {
  if (!parsed.options["help"]) {
    console.time("build");
    console.log(`您可以输入 ${pc.red("`--help(h)`")} 来查看更多选项 \n`);
    await build(parsed.options);
    console.log(`您可以输入 ${pc.red("`--help(h)`")} 来查看更多选项 \n`);
    console.timeEnd("build");
  }
}
run();
