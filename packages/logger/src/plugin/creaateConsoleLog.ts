import { createPlugin } from '../LoggerFactory'
import { LogLevel } from '../LogLevel'

export const LogLevelMethodMap: Record<
  LogLevel,
  'error' | 'warn' | 'log' | 'info' | 'debug'
> = {
  [LogLevel.Error]: 'error',
  [LogLevel.Warn]: 'warn',
  [LogLevel.Info]: 'info',
  [LogLevel.Http]: 'debug',
  [LogLevel.Verbose]: 'debug',
  [LogLevel.Debug]: 'debug',
  [LogLevel.Silly]: 'debug',
}

export const Styles = {
  [LogLevel.Info]: 'color: green;',
  [LogLevel.Warn]: 'color: orange;',
  [LogLevel.Error]: 'color: red;',
  [LogLevel.Http]: 'color: #4bcffa',
  [LogLevel.Verbose]: 'color: #ccae62',
  [LogLevel.Debug]: 'color: #7158e2',
  [LogLevel.Silly]: 'color: #3d3d3d',
}

function openInEditor(path: string) {
  return `http://localhost:5173/__open-in-editor?file=%2Fstudy%2Fjumpalong%2Fpackages%2${encodeURI(
    path
  )}%3A10%3A2`
}
export default function createConsoleLog() {
  return createPlugin((logger, loggerFactory) => {
    const _logger = logger

    logger.addContext(({ level }, args) => {
      let parm = [
        //@ts-ignore
        `[${LogLevel[level]}] %c${logger.path}`,
        Styles[level] as string,
        args.length > 0 ? '\n' : '',
        ...args,
      ] as const

      if (level === LogLevel.Error) {
        let e = Error(parm.join(' '))
        if ((parm as any)[0] === false) {
          console[LogLevelMethodMap[level]](e.message)
        } else {
          throw e
        }
      } else {
        console[LogLevelMethodMap[level]](...parm)
      }
    })

    return _logger
  })
}
