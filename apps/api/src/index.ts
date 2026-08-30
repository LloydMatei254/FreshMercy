import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { env } from './config/env.js'
import { logger } from './utils/logger.js'
import { errorHandler } from './middleware/errorHandler.js'
import { prisma } from './config/db.js'
import router from './routes/index.js'

const app = express()

app.use(helmet({
  contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
}))

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)

    const allowed = [
      env.FRONTEND_URL,
      // Allow all Vercel preview deployments for this project
      /https:\/\/fresh-mercy-web.*\.vercel\.app$/,
      /https:\/\/freshmercy.*\.vercel\.app$/,
      // Allow localhost for development
      'http://localhost:5173',
      'http://localhost:3000',
    ]

    const isAllowed = allowed.some((pattern) =>
      pattern instanceof RegExp ? pattern.test(origin) : pattern === origin
    )

    if (isAllowed) {
      callback(null, true)
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`))
    }
  },
  credentials:    true,
  methods:        ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.set('trust proxy', 1)

// ── Health check (always responds — no DB needed) ─────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } })
})

app.use('/api', router)

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } })
})

app.use(errorHandler)

// ── Start server — don't crash if DB is unavailable ───────
async function start() {
  // Start listening immediately — don't wait for DB
  const server = app.listen(env.PORT, () => {
    logger.info(`🙏 Fresh Mercy API running on port ${env.PORT} [${env.NODE_ENV}]`)
    logger.info(`🔑 DATABASE_URL present: ${!!process.env.DATABASE_URL}`)
    logger.info(`🔑 JWT_SECRET present:   ${!!process.env.JWT_SECRET}`)
  })

  // Try to connect to DB in the background
  prisma.$connect()
    .then(() => logger.info('✅ Database connected'))
    .catch((err) => {
      logger.error({ err }, '⚠️  Database connection failed — API running without DB')
    })

  process.on('SIGTERM', async () => {
    logger.info('SIGTERM — shutting down')
    server.close()
    await prisma.$disconnect()
    process.exit(0)
  })
}

start()
