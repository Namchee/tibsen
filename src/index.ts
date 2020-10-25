import { schedule } from 'node-cron';
import { DateTime } from 'luxon';
import { createHTTPClient } from './common/client';
import { SSOAuthenticator } from './services/sso';
import { StuPorCrawler } from './services/stupor';
import { isValidConfig } from './common/config';
import { logger } from './services/logger';
import { ParameterError } from './exception/parameter';
import { TibsenError } from './exception/base';
import config from './../config.json';

const task = schedule('1 7-17 * * 1-5', async () => {
  try {
    isValidConfig(config);

    logger.write(`[${new Date().toISOString()}] Absen protocol initiated`);

    const { schedule, email, password } = config;
    const { weekday, hour } = DateTime.local().setZone('Asia/Jakarta');

    if (schedule[weekday - 1].includes(hour)) { // sunday is zero
      const httpClient = createHTTPClient();
      const authenticator = new SSOAuthenticator(httpClient, email, password);
      const crawler = new StuPorCrawler(authenticator);

      const result = await crawler.markPresence();

      if (!result) {
        throw new ParameterError('Wrong schedule');
      }

      logger.write(
        `[${new Date().toISOString()}] Successfully tibsen for ${email}`,
      );
    }
  } catch (err) {
    logger.write(
      `[${new Date().toISOString()}] Tibsen failed. Reason:`,
    );

    const error = err as TibsenError;

    logger.write(
      `[${new Date().toISOString()}] ${error.name}: ${error.message}`,
    );
  }
}, {
  timezone: 'Asia/Jakarta',
});

task.start();
logger.write(`[${new Date().toISOString()}] Tibsen started`);
