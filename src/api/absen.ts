import { Context } from 'koa';
import { DateTime } from 'luxon';
import { createHTTPClient } from '../common/client';
import { isRequestBody } from '../common/request';
import { TibsenError } from '../exception/base';
import { ParameterError } from '../exception/parameter';
import { SSOAuthenticator } from '../services/sso';
import { StuPorCrawler } from '../services/stupor';

export default async function(
  ctx: Context,
): Promise<void> {
  try {
    const body = ctx.request.body;

    isRequestBody(body);

    const { schedule, email, password } = body;
    const { weekday, hour } = DateTime.local().setZone('Asia/Jakarta');

    if (schedule[weekday - 1].includes(hour)) { // sunday is zero
      const httpClient = createHTTPClient();
      const authenticator = new SSOAuthenticator(httpClient, email, password);
      const crawler = new StuPorCrawler(authenticator);

      const result = await crawler.markPresence();

      if (!result) {
        throw new ParameterError('Wrong schedule');
      }
    }
  } catch (err) {
    const error = err as TibsenError;

    ctx.status = error.code;
    ctx.body = {
      error: error.message,
    };
  }
}
