const { exec } = require("shelljs");
const { accessSync } = require("fs");
const { resolve } = require("path");

const BUILD_SCRIPT_PATH = "dist/scripts/build/main.js";
let isRun = 0;

try {
  //如果没有build则build后执行
  accessSync(BUILD_SCRIPT_PATH);
} catch (error) {
  scriptBuild();
}

if (require("minimist")(process.argv).reBuildScript) scriptBuild();

build();

function build(params) {
  let c = `node ${BUILD_SCRIPT_PATH} ${process.argv.splice(2).join(" ")}`;
  console.log(`run: ${c}`);
  exec(c);
}
function scriptBuild() {
  if (isRun++) return;
  let c = "npx tsc -p scripts/tsconfig.json";
  console.log(`run: ${c}`);
  exec(c);
}
