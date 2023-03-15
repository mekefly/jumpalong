import { createLoggerPlugin } from "./Plugin";

type IncludeType = { [key in string]: IncludeType } | boolean | undefined;

export interface LoggerIncludeConfig {
  include?: IncludeType;
}
export function createIncludePlugin() {
  return createLoggerPlugin({
    filter(logger) {
      let include: IncludeType = logger.getConfig().include;

      logger.chain.traverseBackward((name) => {
        if (typeof include === "boolean") return include;
        if (include === undefined) return false;

        include = include[name];
      });

      if (typeof include === "boolean") return include;
      return false;
    },
    config: { include: true } as LoggerIncludeConfig,
  });
}
