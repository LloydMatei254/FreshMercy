import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { prisma } from '../config/db.js'
import { created } from '../utils/response.js'
import { sendEmail, emailTemplates } from '../services/email.service.js'

const contactSchema = z.object({
  name:    z.string().min(2).max(100).trim(),
  email:   z.string().email().transform(e => e.toLowerCase().trim()),
  message: z.string().min(10).max(3000).trim(),
})

// ── POST /contact ──────────────────────────────────────────
export async function submitContact(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, message } = contactSchema.parse(req.body)

    const contact = await prisma.contactMessage.create({
      data: { name, email, message, isRead: false },
    })

    // Notify admin
    sendEmail(emailTemplates.contactNotification(name, email, message)).catch(() => {})

    created(res, { id: contact.id }, 'Message received. We will be in touch soon.')
  } catch (err) {
    next(err)
  }
}
