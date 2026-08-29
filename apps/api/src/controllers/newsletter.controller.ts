import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { prisma } from '../config/db.js'
import { ok, conflict } from '../utils/response.js'
import { sendEmail, emailTemplates } from '../services/email.service.js'

const subscribeSchema = z.object({
  email:  z.string().email('Invalid email address').transform(e => e.toLowerCase().trim()),
  source: z.string().max(100).default('website'),
})

// ── POST /newsletter/subscribe ─────────────────────────────
export async function subscribe(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, source } = subscribeSchema.parse(req.body)

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } })

    if (existing) {
      if (existing.status === 'ACTIVE') {
        return conflict(res, 'This email is already subscribed.')
      }
      const updated = await prisma.newsletterSubscriber.update({
        where: { email },
        data:  { status: 'ACTIVE', unsubscribedAt: null, subscribedAt: new Date() },
      })
      return ok(res, { email: updated.email }, 'Subscribed successfully!')
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email, source, status: 'ACTIVE', consentAt: new Date(), subscribedAt: new Date() },
    })

    // Send welcome email (fire-and-forget)
    sendEmail(emailTemplates.welcome(email)).catch(() => {})

    ok(res, { email: subscriber.email }, 'Subscribed successfully!')
  } catch (err) {
    next(err)
  }
}

// ── POST /newsletter/unsubscribe ───────────────────────────
export async function unsubscribe(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(req.body)

    await prisma.newsletterSubscriber.updateMany({
      where: { email: email.toLowerCase().trim(), status: 'ACTIVE' },
      data:  { status: 'UNSUBSCRIBED', unsubscribedAt: new Date() },
    })

    ok(res, null, 'Unsubscribed successfully.')
  } catch (err) {
    next(err)
  }
}
