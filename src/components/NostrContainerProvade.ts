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

export function useNostrContainerFactory<T>(
  serviceIdentifier: ContainerKey<T>
): () => T {
  logger.debug("useNostrContainerGet:", serviceIdentifier);
  const nostrContainer = useNostrContainer();
  logger.debug("nostrContainer", nostrContainer);

  return () => nostrContainer.get(serviceIdentifier);
}
