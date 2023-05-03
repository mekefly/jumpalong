import replace from "@rollup/plugin-replace";
import { relative, resolve } from "path";
export default function (
  key: string = "loggerFactory",
  globalKey: string = "logger"
) {
  function createStatement(_path: string) {
    return `window[Symbol.for('${key}')].create(${JSON.stringify(_path)})`;
  }

  function createPath(path: string) {
    return relative(resolve(), path).replace(/\\/g, "/");
  }
  return replace({
    preventAssignment: true,
    values: {
      ["intoLoggerScope"]: (path: string) => {
        const _path = createPath(path);

        return `const ${globalKey} = ${createStatement(_path)}`;
      },
      ["loggerScope"]: (path: string) => {
        const _path = createPath(path);

        return createStatement(_path);
      },
    },
  });
}
