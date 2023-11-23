import { createLogger, format, transports, Logger } from 'winston';
import { ErrorRequestHandler, Request, Response } from 'express';

// Create a logger instance
const logger: Logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }:any) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log' }), 
  ],
});

function logError(error: Error): void {
  logger.error(error.message, { error: error.stack });
}

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
) => {
  // Log the error
  logError(err);

  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default errorMiddleware;
