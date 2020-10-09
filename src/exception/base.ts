export class TibsenError extends Error {
  public constructor(
    message = '',
    public readonly code = 500,
  ) {
    super(message);
  }
}
