/* eslint-disable max-len */
import { TibsenError } from './base';

export class DeprecatedError extends TibsenError {
  constructor(message: string) {
    super(
      `Deprecated error: ${message}.
      It seems that SSO is using a new protocol, please update the repository or contact the developer`,
    );
  }
}
