export class NotFoundError extends Error {
  constructor(message = 'Not found', cause) {
    super(message);
    this.cause = cause;
  }
}
