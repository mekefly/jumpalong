declare global {
  var logger: typeof import("@jumpalong/logger")["logger"];
  var __DEV__: boolean;
  var __TEST__: boolean;
  var intoLoggerScope: typeof logger;
  var loggerScope: typeof import("@jumpalong/logger")["logger"];
}

/* prettier-ignore */
export { };
