import { createPlugin } from "../LoggerFactory";
import { LogLevel } from "../LogLevel";

export const LogLevelMethodMap: Record<
  LogLevel,
  "error" | "warn" | "log" | "info" | "debug"
> = {
  [LogLevel.Error]: "error",
  [LogLevel.Warn]: "warn",
  [LogLevel.Info]: "info",
  [LogLevel.Http]: "debug",
  [LogLevel.Verbose]: "debug",
  [LogLevel.Debug]: "debug",
  [LogLevel.Silly]: "debug",
};

export const Styles = {
  [LogLevel.Info]: "color: green;",
  [LogLevel.Warn]: "color: orange;",
  [LogLevel.Error]: "color: red;",
  [LogLevel.Http]: "color: #4bcffa",
  [LogLevel.Verbose]: "color: #ccae62",
  [LogLevel.Debug]: "color: #7158e2",
  [LogLevel.Silly]: "color: #3d3d3d",
};

export default function creaateConsoleLog() {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger;

    logger.addContext(({ level }, args) => {
      console[LogLevelMethodMap[level]](
        //@ts-ignore
        `[${LogLevel[level]}] %c${logger.path}`,
        Styles[level] as string,
        args.length > 0 ? "\n" : "",
        ...args
      );
    });

    return _logger;
  });
}
