import { CookieJar } from 'tough-cookie';
import { SSOAuthenticator } from './services/sso';
import { USER_AGENT } from './common/const';
import got from 'got';

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

// const ssoAuth = new SSOAuthenticator(client);