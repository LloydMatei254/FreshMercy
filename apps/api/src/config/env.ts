import 'dotenv/config'
import { z } from 'zod'

// Log all env keys present (helps debug Railway variable injection)
if (process.env.NODE_ENV === 'production') {
  const keys = Object.keys(process.env).filter(k =>
    ['DATABASE_URL', 'JWT_SECRET', 'PORT', 'NODE_ENV', 'FRONTEND_URL'].includes(k)
  )
  console.log('🔑 Environment keys present:', keys)
}

const envSchema = z.object({
  NODE_ENV:     z.enum(['development', 'test', 'production']).default('development'),
  PORT:         z.coerce.number().default(4000),
  DATABASE_URL: z.string().default('postgresql://placeholder:placeholder@localhost:5432/freshmercy'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  JWT_SECRET:   z.string().default('default-jwt-secret-change-in-production-minimum-32-chars!!'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  ADMIN_EMAIL:  z.string().default('admin@freshmercy.org'),

  EMAIL_PROVIDER: z.enum(['resend', 'sendgrid', 'mailgun', 'smtp', 'console']).default('console'),
  EMAIL_FROM:    z.string().default('Fresh Mercy <lloydmatei@gmail.com>'),
  RESEND_API_KEY:  z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  SMTP_HOST:    z.string().optional(),
  SMTP_PORT:    z.coerce.number().default(587),
  SMTP_USER:    z.string().optional(),
  SMTP_PASS:    z.string().optional(),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900_000),
  RATE_LIMIT_MAX:       z.coerce.number().default(100),
  FORM_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(3_600_000),
  FORM_RATE_LIMIT_MAX:       z.coerce.number().default(10),
})

const parsed = envSchema.safeParse(process.env)
if (!parsed.success) {
  // Log but don't crash — let Railway inject vars and restart
  console.error('⚠️  Environment variable warnings:', parsed.error.flatten().fieldErrors)
}

export const env = parsed.success ? parsed.data : envSchema.parse({})
