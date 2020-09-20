import { UnauthorizedError } from '../exception/unauthorized';
import { SSOAuthenticator } from './sso';

export class StuporCrawler {
  private static readonly STUPOR_URL = 'https://studentportal.unpar.ac.id/jadwal';

  public constructor(
    private readonly authenticator: SSOAuthenticator,
  ) { }

  public markPresence = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const login = await this.authenticator.login(username, password);

    if (login) {
      throw new UnauthorizedError('Login failed');
    }

    return true;
  }
}
