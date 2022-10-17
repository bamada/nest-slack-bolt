/**
 * Decorator may listen and react to various slack events (Message, Command).
 */
export const MetadataBase = <T extends string | RegExp = string | RegExp>(
  metadataKey: string,
) => {
  return (pattern: T) => {
    return (target: object, propertyKey: string | symbol) => {
      const properties =
        Reflect.getMetadata(metadataKey, target.constructor) || [];

      Reflect.defineMetadata(
        metadataKey,
        [
          ...properties,
          {
            target: target.constructor.name,
            propertyKey,
            pattern,
          },
        ],
        target.constructor,
      );
    };
  };
};
