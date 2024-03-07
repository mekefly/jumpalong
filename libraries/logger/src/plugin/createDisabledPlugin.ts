import { Logger } from '../Logger'
import { createPlugin } from '../LoggerFactory'

type ExcludeConfig = { disabled?: boolean }
export default function createDisabledPlugin() {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger as Logger<ExcludeConfig>

    _logger.addFilter(() => !_logger.getConfig()?.disabled)
    _logger.emitter.on('created', () => {
      _logger.getConfig()?.disabled &&
        _logger.factory.global?.info('disabled:', _logger.path)
    })

    return _logger
  })
}
