import logger_config from "../config/logger.config";
import { Logger } from "../Logger";
import { createPlugin, LoggerFactory } from "../LoggerFactory";

export default function createReadConfig<Config = {}>() {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger as any as Logger<Config>;
    //默认配置

    loggerFactory.assignConfig(logger_config);

    if (__DEV__) {
      //开发环境
      assignConfig(loggerFactory, ".dev.ts");
    } else {
      //生产环境
      assignConfig(loggerFactory, ".prod.ts");
    }

    return _logger;
  });
}
function assignConfig(loggerFactory: LoggerFactory, endsStr: string) {
  const moduleConfigs: Record<string, { default: any }> =
    //@ts-ignore
    import.meta.globEager("../config/*.ts");

  for (const [key, module] of Object.entries(moduleConfigs)) {
    if (key.endsWith(endsStr)) {
      loggerFactory.assignConfig(module.default);
    }
  }
}
