import { LoggerFactory } from "./LoggerFactory";
import creaateConsoleLog from "./plugin/creaateConsoleLog";
import createIncludePlugin from "./plugin/createIncludePlugin";
import createLevelFilter from "./plugin/createLevelFilter";
import createReadConfig from "./plugin/createReadConfig";

function createFactroy() {
  return new LoggerFactory()
    .addPlugin(createIncludePlugin())
    .addPlugin(creaateConsoleLog())
    .addPlugin(createLevelFilter())
    .addPlugin(createReadConfig())

    .provideFactoryGlobal()
    .provideRootGlobal();
}
export const loggerFactory = createFactroy();
export const createLogger = (path: string) => loggerFactory.create(path);
export const logger = loggerFactory.getGlobal();
