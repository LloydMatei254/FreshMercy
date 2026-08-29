import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { prisma } from '../config/db.js'
import { created } from '../utils/response.js'
import { sendEmail, emailTemplates } from '../services/email.service.js'

const prayerSchema = z.object({
  name:        z.string().max(100).optional(),
  email:       z.string().email().optional().or(z.literal('')),
  request:     z.string().min(10, 'Please share at least a few words').max(2000),
  isAnonymous: z.boolean().default(false),
})

// ── POST /prayer-requests ──────────────────────────────────
export async function submitPrayerRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const data = prayerSchema.parse(req.body)

    const prayerRequest = await prisma.prayerRequest.create({
      data: {
        name:        data.isAnonymous ? null : (data.name || null),
        email:       data.isAnonymous ? null : (data.email || null),
        request:     data.request,
        isAnonymous: data.isAnonymous,
        status:      'NEW',
      },
    })

    // Notify admin (fire-and-forget)
    sendEmail(
      emailTemplates.prayerNotification(data.request, data.isAnonymous, data.name),
    ).catch(() => {})

    created(res, { id: prayerRequest.id }, 'Your prayer request has been received.')
  } catch (err) {
    next(err)
  }
}
