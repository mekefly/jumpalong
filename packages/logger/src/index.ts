import { Logger } from './Logger'
import { LoggerFactory } from './LoggerFactory'
import createConsoleLog from './plugin/creaateConsoleLog'
import createDisabledPlugin from './plugin/createDisabledPlugin'
import createExcludePlugin from './plugin/createExcludePlugin'
import createIncludePlugin from './plugin/createIncludePlugin'
import createLevelFilter from './plugin/createLevelFilter'
import createReadConfig from './plugin/createReadConfig'
export * from './LogLevel'

export function createFactroy() {
  return new LoggerFactory()
    .addPlugin(createIncludePlugin())
    .addPlugin(createDisabledPlugin())
    .addPlugin(createExcludePlugin())
    .addPlugin(createLevelFilter())

    .addPlugin(createConsoleLog())

    .provideFactoryGlobal()
    .provideRootGlobal()
}
export const loggerFactory = createFactroy()
export const createLogger = (path: string) => loggerFactory.create(path)
export const logger = loggerFactory.getGlobal()

export async function loggerAssignConfig(
  logger: Logger<any>,
  globConfigs: Record<string, any>,
  includes: string[]
) {
  for (const [key, module] of Object.entries(globConfigs)) {
    if (includes.some(item => key.includes(item))) {
      if (typeof module === 'function') {
        loggerFactory.assignConfig((await module()).default)
        logger.assignConfig((await module()).default)
      } else {
        loggerFactory.assignConfig((await module).default)
        logger.assignConfig((await module).default)
      }
    }
  }
}
