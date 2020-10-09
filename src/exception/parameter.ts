import { TibsenError } from "./base";

export class ParameterError extends TibsenError {
  constructor(message: string) {
    super(message, 400);
  }
}
