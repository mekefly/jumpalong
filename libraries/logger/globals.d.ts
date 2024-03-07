declare global {
  var logger: typeof import('@jumpalong/logger')['logger']
  var __DEV__: boolean
  var __TEST__: boolean
  var loggerScope: typeof import('@jumpalong/logger')['logger']
  /**
   *进入局部作用域
   */
  var $LoggerScope: (flag?: 'disabled') => void
}

/* prettier-ignore */
export { };
