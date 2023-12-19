import { minimatch } from "minimatch";
import { Logger } from "../Logger";
import { createPlugin } from "../LoggerFactory";

type ExcludeConfig = { exclude?: string[] };
export default function createExcludePlugin(isStatic: boolean = true) {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger as Logger<ExcludeConfig>;

    const excludeFilter = (exclude: string[]) => {
      return !exclude.some((include) => {
        return minimatch(logger.path, include);
      });
    };

    const exclude = _logger.getConfig().exclude ?? [];
    if (isStatic) {
      const isClude = excludeFilter(exclude);

      _logger.addFilter(() => isClude);
    } else {
      _logger.addFilter(() => excludeFilter(exclude));
    }
    return _logger;
  });
}
