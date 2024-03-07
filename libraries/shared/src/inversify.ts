import { inject, interfaces, LazyServiceIdentifer } from "inversify";

export function lazyInject<T>(identifier: interfaces.ServiceIdentifier<T>) {
  return inject(new LazyServiceIdentifer(() => identifier));
}
