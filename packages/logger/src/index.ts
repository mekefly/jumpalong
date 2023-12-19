import { LoggerFactory } from "./LoggerFactory";
import createConsoleLog from "./plugin/creaateConsoleLog";
import createExcludePlugin from "./plugin/createExcludePlugin";
import createIncludePlugin from "./plugin/createIncludePlugin";
import createLevelFilter from "./plugin/createLevelFilter";
import createReadConfig from "./plugin/createReadConfig";

export function createFactroy() {
  return new LoggerFactory()
    .addPlugin(createIncludePlugin())
    .addPlugin(createExcludePlugin())
    .addPlugin(createConsoleLog())
    .addPlugin(createLevelFilter())
    .addPlugin(createReadConfig())

    .provideFactoryGlobal()
    .provideRootGlobal();
}
export const loggerFactory = createFactroy();
export const createLogger = (path: string) => loggerFactory.create(path);
export const logger = loggerFactory.getGlobal();