import schedule from './../schedule.json';
import { DateTime } from 'luxon';
import { createHTTPClient } from './common/client';
import { SSOAuthenticator } from './services/sso';
import { StuPorCrawler } from './services/stupor';
import { config } from 'dotenv';

(async () => {
  if (process.env.NODE_ENV === 'development') {
    config();
  }

  const { weekday, hour } = DateTime.local().setZone('Asia/Jakarta');

  if (schedule[weekday - 1].includes(hour)) { // sunday is zero
    const username = process.env.UNPAR_EMAIL;
    const password = process.env.PASSWORD;

    if (!username) {
      throw new Error('Email account must be supplied.');
    }

    if (!password) {
      throw new Error('Password must be supplied.');
    }

    const httpClient = createHTTPClient();
    const authenticator = new SSOAuthenticator(httpClient, username, password);
    const crawler = new StuPorCrawler(authenticator);

    const result = await crawler.markPresence();

    if (!result) {
      throw new Error(
        'Presence marking failed. Probably caused by corrupted config file'
      );
    }
  }
})();
