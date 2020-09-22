import { UnauthorizedError } from '../exception/unauthorized';
import { SSOAuthenticator } from './sso';

export class StuPorCrawler {
  private static readonly STUPOR_URL = 'https://studentportal.unpar.ac.id/jadwal';

  public constructor(
    private readonly authenticator: SSOAuthenticator,
  ) { }

  public markPresence = async (): Promise<boolean> => {
    const authenticatedClient = this.authenticator.client;
    const login = await this.authenticator.login();

    if (login) {
      throw new UnauthorizedError('Login failed');
    }

    return true;
  }
}
