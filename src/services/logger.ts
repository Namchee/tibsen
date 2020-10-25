import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const tibsenFormat = printf(
  ({ level, message, timestamp }) => {
    return `[${timestamp}] (${level}): ${message}`;
  },
);

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    tibsenFormat,
  ),
  transports: [
    new transports.File(
      {
        filename: 'absen.log',
      },
    ),
  ],
});
