import { TibsenError } from './base';

export class UnauthorizedError extends TibsenError {
  public constructor(message = '', code = 401) {
    super(`Unauthorized error: ${message}`, code);
  }
}
