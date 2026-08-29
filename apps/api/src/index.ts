import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { env } from './config/env.js'
import { logger } from './utils/logger.js'
import { errorHandler } from './middleware/errorHandler.js'
import { prisma } from './config/db.js'
import router from './routes/index.js'

const app = express()

// ── Security headers ───────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
}))

// ── CORS ──────────────────────────────────────────────────
app.use(cors({
  origin:      env.FRONTEND_URL,
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// ── Body parsing ──────────────────────────────────────────
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

// ── Trust proxy (for rate limiting behind Nginx/Cloudflare) ──
app.set('trust proxy', 1)

// ── Routes ────────────────────────────────────────────────
app.use('/api', router)

// ── 404 fallback ─────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } })
})

// ── Global error handler ──────────────────────────────────
app.use(errorHandler)

// ── Start server ─────────────────────────────────────────
async function start() {
  try {
    await prisma.$connect()
    logger.info('Database connected')

    app.listen(env.PORT, () => {
      logger.info(`🙏 Fresh Mercy API running on port ${env.PORT} [${env.NODE_ENV}]`)
    })
  } catch (err) {
    logger.error({ err }, 'Failed to start server')
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received — shutting down')
  await prisma.$disconnect()
  process.exit(0)
})

start()
