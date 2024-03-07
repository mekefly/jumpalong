import { loggerAssignConfig, logger } from '@jumpalong/logger'
//@LoggerScope
console.log(import.meta.glob('./config/*.ts'))

if (__TEST__) {
  await loggerAssignConfig(logger, import.meta.glob('./config/*.ts'), [
    'test.ts',
  ])
  logger.info('info')
}

if (__DEV__) {
  await loggerAssignConfig(logger, import.meta.glob('./config/*.ts'), [
    'dev.ts',
  ])
  logger.info('info')
}

console.log(__DEV__)
