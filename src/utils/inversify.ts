import {
  interfaces,
  METADATA_KEY
} from "inversify";

export function lazyInject(
  serviceIdentifierCallback: () => interfaces.ServiceIdentifier<any>
): PropertyDecorator {
  return function (target: any, propertyKey) {
    // inject container as this.container if it's not present
  const metadata = { key: METADATA_KEY.INJECT_TAG, value: };
  const metadataKey = METADATA_KEY.TAGGED_PROP

  const metadatas: interfaces.Metadata[] = _ensureNoMetadataKeyDuplicates(metadata);

  let paramsOrPropertiesMetadata: Record<string | symbol, interfaces.Metadata[] | undefined> = {};
  // read metadata if available
  if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
    paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
  }

  let paramOrPropertyMetadata: interfaces.Metadata[] | undefined = paramsOrPropertiesMetadata[key as string];

  if (paramOrPropertyMetadata === undefined) {
    paramOrPropertyMetadata = [];
  } else {
    for (const m of paramOrPropertyMetadata) {
      if (metadatas.some(md => md.key === m.key)) {
        throw new Error(`${ERROR_MSGS.DUPLICATED_METADATA} ${m.key.toString()}`);
      }
    }
  }

  // set metadata
  paramOrPropertyMetadata.push(...metadatas);
  paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
  Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);

    // define getter
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this.container.get(serviceIdentifierCallback());
      },
    });
  };
}
