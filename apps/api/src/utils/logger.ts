import { pino as createPino } from 'pino'
import { env } from '../config/env.js'

export const logger = createPino(
  env.NODE_ENV === 'development'
    ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
    : { level: 'info' },
)
