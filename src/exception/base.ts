export class TibsenError extends Error {
  public constructor(
    message = '',
    public readonly code = 400) {
    super(message);
  }
}
