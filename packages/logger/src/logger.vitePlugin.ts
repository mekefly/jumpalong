import replace from '@rollup/plugin-replace'
import { relative, resolve } from 'path'
export default function (
  key: string = 'loggerFactory',
  globalKey: string = 'logger'
) {
  function createStatement(_path: string) {
    return `window[Symbol.for('${key}')].create(${JSON.stringify(_path)});`
  }

  function createPath(path: string) {
    return relative(resolve(), path).replace(/\\/g, '/')
  }

  return replace({
    preventAssignment: true,
    values: {
      ['intoLoggerScope']: (path: string) => {
        const _path = createPath(path)

        return `const ${globalKey} = ${createStatement(_path)}`
      },

      // 可以添加一个`//@LoggerScope`这样的标志来添加一个文件局部使用的logger
      ['@LoggerScope']: (path: string) => {
        const _path = createPath(path)

        return `@LoggerScope\nimport {logger:_logger} from "@/logger";const ${globalKey} = _logger.create(${JSON.stringify(
          _path
        )})`
      },
      ['loggerScope']: (path: string, ...rest) => {
        const _path = createPath(path)
        return createStatement(_path)
      },
    },
  })
}
