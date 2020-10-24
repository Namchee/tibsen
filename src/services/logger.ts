import create from 'got/dist/source/create';
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File(
      {
        filename: 'absen.log',
        level: 'info',
      },
    ),
  ],
});
