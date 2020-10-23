import { Context, Next } from 'koa';
import { TibsenError } from '../exception/base';

export async function responseTimeMiddleware(
  ctx: Context,
  next: Next,
): Promise<void> {
  const start = process.hrtime()[1] / 1000;

  await next();

  const ms = Number((process.hrtime()[1] / 1000) - start).toFixed(3);
  ctx.set('X-Response-Time', `${ms}ms`);
}
