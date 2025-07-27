// lib/logger.ts
import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = path.join(process.cwd(), 'logs');

export const logger = winston.createLogger({
  level: process.env.LOG_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),

    new DailyRotateFile({
      filename: `${logDir}/%DATE%-error.log`,
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d'
    }),

    new DailyRotateFile({
      filename: `${logDir}/%DATE%-combined.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d'
    })
  ]
});
