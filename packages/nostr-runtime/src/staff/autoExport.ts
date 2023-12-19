//ts-node  packages\nostr-runtime\src\staff\autoExport.ts
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  lstatSync,
} from "fs";
import { resolve } from "path";
const exportName = "exports.ts";
function autoExport(path: string) {
  let files = readdirSync(resolve(path, ""));

  //child
  files.forEach((fileName) => {
    let filePath = resolve(path, fileName);
    if (lstatSync(filePath).isDirectory()) {
      autoExport(filePath);
    }
  });

  let modelFiles = files.filter((name) => {
    let filePath = resolve(path, name);
    return isModel(filePath) && exportName !== name && "index.ts" !== name;
  });
  if (modelFiles.length > 0) {
    writeFileSync(resolve(path, "exports.ts"), generate(modelFiles));
    indexAutoCreate(path);
  }
}
function indexAutoCreate(path: string) {
  //index不存在自动创建
  let indexPath = resolve(path, "index.ts");
  let indexPart = `export * from "./${removeTheExtendedName(exportName)}";`;
  if (!existsSync(indexPath)) {
    writeFileSync(indexPath, indexPart);
  } else {
    if (lstatSync(indexPath).isFile()) {
      let line = readFile(indexPath).split("\n");
      //如果存在这一行，就不需要添加了
      if (line.some((item) => item === indexPart)) {
        return;
      }
      line.push(indexPart)
      writeFileSync(indexPath, line.join("\n"));
    } else if (lstatSync(indexPath).isDirectory()) {
      indexAutoCreate(indexPath);
    }
  }
}
/**esmodel */
function isModel(path: string): boolean {
  if (lstatSync(path).isFile()) {
    return readFile(path)
      .split("\n")
      .some((line) => line.startsWith("export"));
  } else {
    return isModel(resolve(path, "index.ts"));
  }
}
function readFile(path: string) {
  return readFileSync(path, "utf-8");
}
function generate(files: string[]) {
  return (
    files
      .map((fileName) => {
        let shortName = removeTheExtendedName(fileName);
        //约定大于配置，如果有默认导出，就把首字母为大写
        if (isUppercase(shortName)) {
          return `export {default as ${shortName}} from "./${shortName}";`;
        } else {
          return `export * from "./${shortName}";`;
        }
      })
      .join("\n") + "\n"
  );
}
function removeTheExtendedName(name: string) {
  return name.endsWith(".ts") ? name.slice(0, name.length - 3) : name;
}

function isUppercase(str: string) {
  return str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90;
}

autoExport(__dirname);
