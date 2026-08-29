import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { logger } from '../utils/logger.js'
import { env } from '../config/env.js'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    const messages = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`)
    res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: messages[0], details: messages },
    })
    return
  }

  // Application errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message },
    })
    return
  }

  // Unknown errors
  logger.error({ err }, 'Unhandled error')
  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : (err instanceof Error ? err.message : 'Unknown error'),
    },
  })
}
