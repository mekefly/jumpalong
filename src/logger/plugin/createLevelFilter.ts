import { Logger } from "../Logger";
import { createPlugin } from "../LoggerFactory";
import { LogLevel } from "../LogLevel";

export default function createLevelFilter() {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger as Logger<{ level?: LogLevel }>;

    _logger.addFilter((logger, level) => {
      return level <= (_logger.getConfig().level ?? LogLevel.Info);
    });
    return _logger;
  });
}
