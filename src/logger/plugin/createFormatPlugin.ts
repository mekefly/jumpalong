import { Styles } from "../Logger";
import { createLoggerPlugin } from "./Plugin";

export function createFormatPlugin() {
  return createLoggerPlugin({
    initialization(logger) {
      logger.assignConfig(
        {
          format(logger, level, args) {
            const config = logger.getConfig();

            if (config.origin) {
              return [
                `%c[${logger.chain.toArrayOfTraverseBackward().join(">")}]\n`,
                Styles[level] as string,
                ...args,
              ];
            } else {
              return [
                `%c[${logger.namespace}]\n`,
                Styles[level] as string,
                ...args,
              ];
            }
          },
        },
        false
      );
    },
    config: {
      origin: true,
    },
  });
}
