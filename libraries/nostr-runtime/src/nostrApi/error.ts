export class NotFoundNostrApiError extends Error {
  constructor(name: string) {
    super(`NotFoundError:Not Found ${name}`)
  }
}
