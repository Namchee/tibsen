import client from './../common/client';
import { DeprecatedError } from '../exception/deprecated';
import { UnauthorizedError } from '../exception/unauthorized';
import { Got } from 'got';

export class SSOAuthenticator {
  private static readonly BASE_URL = 'https://sso.unpar.ac.id';
  private static readonly LOGIN_URL = 'login';
  private static readonly LOGOUT_URL = 'logout';
  private static readonly SERVICE_NAME = 'https://studentportal.unpar.ac.id/C_home/sso_login';
  private static readonly STUPOR_URL = 'https://studentportal.unpar.ac.id/home';

  /* eslint-disable max-len */
  private static readonly HIDDEN_INPUT_PATTERN = /<input type="hidden" name="([\w]+)"(\s*value="(.+?)")?\/>/g;
  private static readonly SUBMIT_PATTERN = /<button\s*(type="submit")+\s*(value="(\w+)").*?>/;
  /* eslint-enable */

  public client: Got;

  public constructor() {
    this.client = client;
  }

  private getMiscData = (body: string): Record<string, string> => {
    const formData: Record<string, string> = {};

    Array.from(body.matchAll(SSOAuthenticator.HIDDEN_INPUT_PATTERN))
      .forEach((group) => {
        formData[group[1]] = group[3] || '';
      });

    Array.from(body.matchAll(SSOAuthenticator.SUBMIT_PATTERN))
      .forEach((button) => {
        formData[button[2]] = button[5];
      });

    return formData;
  }

  public login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const url = `${SSOAuthenticator.BASE_URL}/${SSOAuthenticator.LOGIN_URL}`;

    // get the hidden url values
    const { body } = await this.client.get(
      url,
      {
        searchParams: {
          service: SSOAuthenticator.SERVICE_NAME,
        },
      },
    );

    const miscData = this.getMiscData(body);

    // send the post request, fetch the ticket
    const { statusCode, headers } = await this.client.post(
      url,
      {
        form: {
          username,
          password,
          ...miscData,
        },
      },
    );

    // wrong password...
    if (statusCode === 401) {
      throw new UnauthorizedError('Wrong password');
    }

    if (!headers.location) {
      throw new DeprecatedError('`headers.location` does not exist');
    }

    // validate the ticket
    await this.client.get(headers.location);
    // resend GET request, awaiting to be redirected
    await this.client.get(SSOAuthenticator.SERVICE_NAME);

    // check if the request is being redirected or not
    const verification = await this.client.get(
      SSOAuthenticator.STUPOR_URL,
    );

    return verification.statusCode === 200;
  }
}
