import { ContainerKey } from "@/nostr/nostr";
import { throwNotFoundError } from "@/utils/throw";
import { createInjection } from "@/utils/use";
import { Container } from "inversify";
const logger = loggerScope;

export const [provideNostrContainer, useNostrContainer] = createInjection(
  (nostrContainer: Container) => {
    logger.debug("provideNostrContainer", nostrContainer);
    return nostrContainer;
  },
  () => {
    throwNotFoundError("provideNostrContainer", logger);
  }
);
export function useNostrContainerGet<T>(serviceIdentifier: ContainerKey<T>): T {
  logger.debug("useNostrContainerGet:", serviceIdentifier);
  const nostrContainer = useNostrContainer();
  logger.debug("nostrContainer", nostrContainer);
  return nostrContainer.get(serviceIdentifier);
}
export async function useNostrContainerAsyncGet<T>(
  serviceIdentifier: ContainerKey<T>
): Promise<T> {
  logger.debug("useNostrContainerAsyncGet:", serviceIdentifier);
  const nostrContainer = useNostrContainer();
  logger.debug("nostrContainer", nostrContainer);
  return nostrContainer.getAsync(serviceIdentifier);
}

export function useNostrContainerFactory<T>(
  serviceIdentifier: ContainerKey<T>
): () => T {
  logger.debug("useNostrContainerFactory:", serviceIdentifier);
  const nostrContainer = useNostrContainer();
  logger.debug("nostrContainer", nostrContainer);

  return () => nostrContainer.get(serviceIdentifier);
}
