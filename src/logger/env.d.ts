/* eslint-disable */

import { Logger } from "./Logger";

/* prettier-ignore */
export { };

declare global {
  var logger: typeof import("./").logger;
  var __DEV__: boolean;
  var intoLoggerScope: logger;
  var loggerScope: Logger;
}
