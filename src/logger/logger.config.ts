logger.assignConfig({ origin: true });
try {
  if (__DEV__) {
    logger.assignConfig({ origin: false, include: false });
  }
} catch (error) {}

export {};
