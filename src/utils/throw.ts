import { Logger } from "@/logger/Logger";
import { NotFoundError } from "@/nostr/nostrApi/NostrApi";
const logger = loggerScope;

export function throwNotFoundError(
  name: string,
  _logger: Logger<any> = logger
): never {
  const msg = `Not found ${name}`;
  _logger.error(new NotFoundError(msg));
  throw new NotFoundError(msg);
}
