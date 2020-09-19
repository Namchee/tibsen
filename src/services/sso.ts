import { Got } from 'got';

export class SSOAuthenticator {
  private static readonly BASE_URL = 'https://sso.unpar.ac.id';
  private static readonly LOGIN_URL = 'login';
  private static readonly LOGOUT_URL = 'logout';

  private static readonly HIDDEN_INPUT_PATTERN = /<input type="hidden" name="([\w]+)"( value="([\w\/\=\-\_\+]+)")?\/>/g;
  private static readonly SUBMIT_PATTERN = /<button.*(type="submit")+.*(value="(\w+)").*?>/

  public constructor(
    private readonly client: Got,
  ) { }

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

  public login = async (username: string, password: string): Promise<boolean> => {
    const url = `${SSOAuthenticator.BASE_URL}/${SSOAuthenticator.LOGIN_URL}`;

    const { body } = await this.client.get(url);

    const miscData = this.getMiscData(body);

    await this.client.post(
      url,
      {
        form: {
          username,
          password,
          ...miscData,
        }
      }
    );

    return this.isLoggedIn();
  }

  public isLoggedIn = async (): Promise<boolean> => {
    const url = `${SSOAuthenticator.BASE_URL}/${SSOAuthenticator.LOGIN_URL}`;
    const { body } = await this.client.get(url);

    return /have successfully logged into the/i.test(body);
  }

  public logout = async (): Promise<boolean> => {
    const url = `${SSOAuthenticator.BASE_URL}/${SSOAuthenticator.LOGOUT_URL}`;
    await this.client.get(url);
    
    return this.isLoggedOut();
  }

  public isLoggedOut = async (): Promise<boolean> => {
    const url = `${SSOAuthenticator.BASE_URL}/${SSOAuthenticator.LOGOUT_URL}`;
    const { body } = await this.client.get(url);

    return /have successfully logged out/i.test(body);
  }
}
