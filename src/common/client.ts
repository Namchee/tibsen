import got, { Got } from 'got';
import { USER_AGENT } from './const';
import { CookieJar } from 'tough-cookie';

export function createHTTPClient(): Got {
  const cookieJar = new CookieJar();

  const client = got.extend({
    https: {
      rejectUnauthorized: true,
    },
    followRedirect: false,
    headers: {
      'User-Agent': USER_AGENT,
    },
    cookieJar,
  });

  Object.freeze(client);

  return client;
}


