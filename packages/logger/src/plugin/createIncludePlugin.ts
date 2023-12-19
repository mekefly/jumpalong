import { minimatch } from "minimatch";
import { Logger } from "../Logger";
import { createPlugin } from "../LoggerFactory";

export default function createIncludePlugin(isStatic: boolean = true) {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger as Logger<{ include?: string[] }>;

    const filter = (include: string[]) => {
      return include.some((include) => {
        return minimatch(logger.path, include);
      });
    };

    if (isStatic) {
      const include = _logger.getConfig().include ?? ["**/*"];
      const isInclude = filter(include);

      _logger.addFilter((logger) => {
        return isInclude;
      });
    } else {
      _logger.addFilter((logger) => {
        const include = logger.getConfig().include ?? ["**/*"];
        return filter(include);
      });
    }
    return _logger;
  });
}
