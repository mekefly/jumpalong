import logger_config from '../config/logger.config'
import { Logger } from '../Logger'
import { createPlugin, LoggerFactory } from '../LoggerFactory'

export default function createReadConfig<Config = {}>() {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger as any as Logger<Config>
    //默认配置

    loggerFactory.assignConfig(logger_config)

    if (__TEST__) {
      //开发环境
      assignConfig(loggerFactory, '.test.ts')

      return _logger
    }
    if (__DEV__) {
      //测试配置
      assignConfig(loggerFactory, '.dev.ts')
    } else {
      //生产环境
      assignConfig(loggerFactory, '.prod.ts')
    }

    return _logger
  })
}
import loggerConfig from '../config/logger.config'
import loggerConfigDev from '../config/logger.config.dev'
import loggerConfigProd from '../config/logger.config.prod'
import loggerConfigTest from '../config/logger.config.test'
async function assignConfig(loggerFactory: LoggerFactory, endsStr: string) {
  const moduleConfigs: Record<string, any> = {
    '../config/logger.config.ts': loggerConfig,
    '../config/logger.config.dev.ts': loggerConfigDev,
    '../config/logger.config.prod.ts': loggerConfigProd,
    '../config/logger.config.test.ts': loggerConfigTest,
  }

  for (const [key, module] of Object.entries(moduleConfigs)) {
    if (key.endsWith(endsStr)) {
      loggerFactory.assignConfig((await module).default)
    }
  }
}
