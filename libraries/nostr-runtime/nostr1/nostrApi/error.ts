export class NotFoundNostrApiError extends Error {
  constructor(err: string) {
    super(`NotFoundError:${err}`);
  }
}
