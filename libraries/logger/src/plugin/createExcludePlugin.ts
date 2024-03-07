import { minimatch } from 'minimatch'
import { Logger } from '../Logger'
import { createPlugin } from '../LoggerFactory'

type ExcludeConfig = { exclude?: string[] }
export function excludeFilter(path: string, exclude?: string[]) {
  if (!exclude) return true
  return !exclude.some(include => {
    return minimatch(path, include)
  })
}
export default function createExcludePlugin(isStatic: boolean = true) {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger as Logger<ExcludeConfig>
    const exclude = _logger.getConfig().exclude

    if (isStatic) {
      const isClude = excludeFilter(logger.path, exclude)

      _logger.emitter.on('created', () => {
        !isClude && _logger.factory.global?.info('exclude:', _logger.path)
      })

      _logger.addFilter(() => isClude)
    } else {
      _logger.emitter.on('created', () => {
        !excludeFilter(logger.path, exclude) &&
          _logger.factory.global?.info('exclude:', _logger.path)
      })

      _logger.addFilter(() => excludeFilter(logger.path, exclude))
    }
    return _logger
  })
}
