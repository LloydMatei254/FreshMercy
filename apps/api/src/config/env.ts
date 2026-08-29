import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV:     z.enum(['development', 'test', 'production']).default('development'),
  PORT:         z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  JWT_SECRET:   z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  ADMIN_EMAIL:  z.string().email().default('admin@freshmercy.org'),

  EMAIL_PROVIDER: z.enum(['resend', 'sendgrid', 'mailgun', 'smtp', 'console']).default('console'),
  EMAIL_FROM:    z.string().default('Fresh Mercy <hello@freshmercy.org>'),
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
  console.error('❌ Invalid environment variables:')
  console.error(parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data
