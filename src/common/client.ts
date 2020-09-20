import got from 'got';
import { USER_AGENT } from './const';
import { CookieJar } from 'tough-cookie';

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

export default client;
