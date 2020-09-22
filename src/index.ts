import config from './../config.json';
import { DateTime } from 'luxon';
import { createHTTPClient } from './common/client';
import { SSOAuthenticator } from './services/sso';
import { StuPorCrawler } from './services/stupor';

(async () => {
  const { weekday, hour } = DateTime.local().setZone('Asia/Jakarta');

  if (config[weekday - 1].includes(hour)) { // sunday is zero
    const [username, password] = process.argv.slice(2);

    if (!username) {
      throw new Error('Username must be supplied.');
    }

    if (!password) {
      throw new Error('Password must be supplied.');
    }

    const httpClient = createHTTPClient();
    const authenticator = new SSOAuthenticator(httpClient, username, password);
    const crawler = new StuPorCrawler(authenticator);

    const result = await crawler.markPresence();

    if (!result) {
      throw new Error('Presence marking failed.');
    }
  }
})();
