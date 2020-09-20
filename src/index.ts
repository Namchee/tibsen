import config from './../config.json';
import { DateTime } from 'luxon';

const { day, hour } = DateTime.local().setZone('Asia/Jakarta');

if (config[day].includes(hour)) {
  // do something :)
}
