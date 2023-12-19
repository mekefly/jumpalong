import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export function stringToBoolean(str) {
  switch (str) {
    case "true":
      return true;
      break;
    case "false":
      return false;
      break;
    default:
      return true;
      break;
  }
}
export function camelize(str) {
  const camelizeRE = /_(\w)/g;
  return str.toLowerCase().replace(camelizeRE, (_, r) => r.toUpperCase());
}

export function getEnvs(ENVKeys, defaults = [], handle = (v) => v) {
  const env = process.env;
  const options = {};
  ENVKeys.forEach((ENVKey, index) => {
    const optionsKey = camelize(ENVKey);

    options[optionsKey] = handle(
      env[createEnvKey(ENVKey)] ?? defaults[index],
      optionsKey,
      ENVKey
    );
  });
  return options;
}
export function checkUndefined(options) {
  for (const key in options) {
    const option = options[key];

    if (option === undefined) {
      throw new Error(`必须传入${key}`);
    }
  }
  return options;
}

const ENV_PREFIX = `ROLLUP_BUILD_`;
export function createEnvKey(key) {
  return `${ENV_PREFIX}${key}`;
}
export function readPackageJson(packagePath) {
  return JSON.parse(
    readFileSync(resolve(packagePath, "package.json"), "utf-8")
  );
}

/**
 * @param {string} path1
 * @param {string} path2
 */
export function pathSubtract(path1, path2) {
  if (path1.startsWith(path2)) {
    const value = path1.slice(path2.length, path1.length).replaceAll("\\", "/");
    if (value.startsWith("/")) {
      return value.slice(1);
    }
    return value;
  }
  throw new Error(`${path1}不完全遮盖${path2}`);
}

export function jsonModifier(filePath, json) {
  if (!json) {
    json = JSON.parse(readFileSync(filePath, "utf-8"));
  }
  let jsonString = stringify(json);
  return {
    json,
    setup() {
      const _jsonString = stringify(json);
      if (_jsonString === jsonString) {
        return;
      }
      writeFileSync(filePath, _jsonString);
    },
  };
}

function stringify(any) {
  return _stringify(any);
}
function _stringify(any, l = 0, set = new Set()) {
  if (typeof any === "object") {
    if (any === null) {
      return String(any);
    } else if (Array.isArray(any)) {
      if (set.has(any)) throw new Error();
      set.add(any);
      return `[\n${any
        .map((item) => `${nEmptyGrid(l + 1)}${_stringify(item, l + 1, set)}`)
        .join(",\n")}\n${nEmptyGrid(l)}]`;
    } else {
      if (set.has(any)) throw new Error();
      set.add(any);
      return `{\n${Object.entries(any)
        .map(
          ([key, value]) =>
            `${nEmptyGrid(l + 1)}"${key}":${_stringify(value, l + 1, set)}`
        )
        .join(",\n")}\n${nEmptyGrid(l)}}`;
    }
  } else {
    return JSON.stringify(any);
  }
}
function nEmptyGrid(n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    s += "  ";
  }
  return s;
}
