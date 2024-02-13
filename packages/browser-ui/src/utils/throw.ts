import { type Logger } from "@/logger/Logger";


export function throwNotFoundError(
  name: string,
  _logger: Logger<any> = logger
): never {
  const msg = `Not found ${name}`;
  const error = new Error(msg);
  _logger.error(error);
  throw error;
}
