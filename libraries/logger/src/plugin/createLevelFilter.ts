import { Logger } from '../Logger'
import { createPlugin } from '../LoggerFactory'
import { LogLevel } from '../LogLevel'

type LevelFilterConfig = { level?: LogLevel; showDebug?: boolean }
export default function createLevelFilter() {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger as Logger<LevelFilterConfig>

    _logger.addFilter((logger, level) => {
      return level <= (_logger.getConfig().level ?? LogLevel.Silly)
    })
    return _logger
  })
}
