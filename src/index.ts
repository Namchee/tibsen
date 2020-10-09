import { DateTime } from 'luxon';
import { createHTTPClient } from './common/client';
import { SSOAuthenticator } from './services/sso';
import { StuPorCrawler } from './services/stupor';
import { RequestBody } from './common/request';
import { ParameterError } from './exception/parameter';

export async function absen(params: RequestBody): Promise<void> {
  const { schedule, email, password } = params;
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
}
