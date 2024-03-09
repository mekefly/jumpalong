import {
  checkUndefined,
  getEnvs,
  readPackageJson,
  stringToBoolean,
} from "./utils";

export function initOptions() {
  const options = Object.assign(
    checkUndefined(
      getEnvs(["INPUT", "OUTPUT", "PACKAGE_PATH", "FORMAT", "NAME"])
    ),
    getEnvs(["PROD", "DECLARATION"], ["false", "false"], stringToBoolean)
  );

  options.packageJson = readPackageJson(options.packagePath);

  return options;
}
