import { UnauthorizedError } from '../exception/unauthorized';
import { SSOAuthenticator } from './sso';

export class StuPorCrawler {
  private static readonly STUPOR_URL = 'https://studentportal.unpar.ac.id/jadwal';
  private static readonly PRESENCE_URL = 'daftar_kehadiran/absen_perkuliahan';

  /* eslint-disable max-len */
  private static readonly BUTTON_PATTERN = /<a\s*onclick="absenPerkuliahan\(this\)"\s*target="_blank"\s*class="btn btn-danger"\s*data-param-tahun="(\d+?)"\s*data-param-semester="(\d+?)"\s*data-param-kodeprodi="(\d+?)"\s*data-param-kodemk="(.+?)"\s*data-param-kelas="(\w+?)"\s*data-param-pertemuanke="(\d+)"\s*data-param-waktuabsen="(\d{2}:\d{2})".+?>/g;
  /* eslint-enable max-len */

  public constructor(
    private readonly authenticator: SSOAuthenticator,
  ) { }

  public markPresence = async (): Promise<boolean> => {
    const authenticatedClient = this.authenticator.client;
    const login = await this.authenticator.login();

    if (!login) {
      throw new UnauthorizedError('Login failed');
    }

    const { body } = await authenticatedClient.get(
      StuPorCrawler.STUPOR_URL,
    );

    const availableCourse = body.match(StuPorCrawler.BUTTON_PATTERN);

    if (!availableCourse) {
      return false;
    }

    const presenceData = {
      tahunAkademik: availableCourse[1],
      semesterAkademik: availableCourse[2],
      kodeProdi: availableCourse[3],
      kodeMk: availableCourse[4],
      kelas: availableCourse[5],
      pertemuanKe: availableCourse[6],
      waktuAbsen: availableCourse[7],
    };

    const presenceRequest = await authenticatedClient.post(
      `${StuPorCrawler.STUPOR_URL}/${StuPorCrawler.PRESENCE_URL}`,
      {
        form: presenceData,
      },
    );

    return presenceRequest.statusCode === 200;
  }
}
