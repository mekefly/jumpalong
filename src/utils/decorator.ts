import { Logger } from "@/logger/Logger";

export const callLogger = () => {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const constructor = target.constructor;
    const _logger: Logger = constructor.logger ?? target.logger ?? logger;
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      _logger.silly(
        `Calling "${constructor.name}:${name}" with arguments:`,
        args
      );
      const result = original.apply(this, args);
      _logger.silly(`Return value of "${constructor.name}:${name}":`, result);
      return result;
    };
    return descriptor;
  };
};
