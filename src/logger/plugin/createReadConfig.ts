import logger_config from "../config/logger.config";
import logger_config_dev from "../config/logger.config.dev";
import logger_config_prod from "../config/logger.config.prod";
import { Logger } from "../Logger";
import { createPlugin } from "../LoggerFactory";

export default function createReadConfig<Config = {}>() {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger as any as Logger<Config>;
    //默认配置
    loggerFactory.assignConfig(logger_config);
    if (__DEV__) {
      //开发环境
      loggerFactory.assignConfig(logger_config_dev);
    } else {
      //生产环境
      loggerFactory.assignConfig(logger_config_prod);
    }

    return _logger;
  });
}
