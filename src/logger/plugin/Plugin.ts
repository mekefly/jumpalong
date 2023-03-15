import { Logger } from "../Logger";

export type LoggerPlugin<Config extends object = {}> = {
  filter?: LoggerFilter<Config>;
  config?: Config;
  initialization?: (logger: Logger<Config>) => void;
};
export function createLoggerPlugin<T extends object>(
  v: LoggerPlugin<T>
): LoggerPlugin<T> {
  return v as any;
}

export type LoggerFilter<Config extends object = {}> = (
  logger: Logger<Config>
) => boolean | void;
