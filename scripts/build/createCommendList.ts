import { resolve } from "path";
import { BuildOptions } from "./buildOptions";
import { commandSplicing } from "./commandSplicing";
import { PackageJson } from "./json";
import { Commend } from "./types";
import {
  createEnvString,
  genExportName,
  genFileName,
  genNameByPackageName,
  intraProjectPath,
} from "./utils";

export function createCommendList(
  buildOptions: BuildOptions,
  packageJson: PackageJson,
  packagePath: string
) {
  const { inputPath, output, format, prod, declaration } = buildOptions;
  const { name, shortName = genNameByPackageName(name ?? "dist") } =
    packageJson;

  const commendList = commandSplicing(
    createInputCommendList(packagePath, inputPath),
    createOutputCommendList(packagePath, output, format, shortName, prod),
    createNameCommendList(genExportName(shortName)),
    createPackagePathCommendList(packagePath),
    createDeclarationCommendList(declaration, packagePath)
  );
  return commendList;
}
export function createPackagePathCommendList(packagePath: string) {
  return [[createEnvString("PACKAGE_PATH", intraProjectPath(packagePath))]];
}

const declarationCreatedSet = new Set();
export function createDeclarationCommendList(
  declaration: boolean,
  packagePath: string,
  _declarationCreated: boolean = declarationCreatedSet.has(packagePath)
) {
  declarationCreatedSet.add(
    (declaration = declaration && !_declarationCreated)
  );
  const declarationStr = declaration ? "true" : "false";
  return [[createEnvString("DECLARATION", declarationStr)]];
}

export function createNameCommendList(name: string) {
  return [[createEnvString("NAME", name)]];
}

export function createFormatCommendList(format: string[]) {
  const commendList: Commend[] = [];
  format.forEach((format) => {
    commendList.push([createEnvString("FORMAT", format)]);
  });
  return commendList;
}
export function createInputCommendList(
  packagePath: string,
  inputPath: string[]
) {
  const commendList: Commend[] = [];
  inputPath.forEach((input) => {
    commendList.push([
      createEnvString("INPUT", intraProjectPath(resolve(packagePath, input))),
    ]);
  });
  return commendList;
}
export function createProdCommendList(prods: string[]) {
  const commendList: Commend[] = [];
  prods.forEach((prod) => {
    commendList.push([createEnvString("PROD", prod)]);
  });
  return commendList;
}
export function createOutputCommendList(
  packagePath: string,
  output: string,
  format: string[],
  name: string,
  prod: string[]
) {
  const commendList: Commend[] = [];

  prod.forEach((prod) => {
    format.forEach((format) => {
      const commend = [
        createEnvString(
          "OUTPUT",
          intraProjectPath(
            resolve(packagePath, output, genFileName(name, format, prod))
          )
        ),
      ];
      commendList.push(
        ...commandSplicing(
          createFormatCommendList([format]),
          createProdCommendList([prod]),
          [commend]
        )
      );
    });
  });

  return commandSplicing(commendList);
}
function createCommend(...rest: string[]) {
  return rest;
}
