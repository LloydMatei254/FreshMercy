import nodemailer from 'nodemailer'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'

interface EmailPayload {
  to:      string
  subject: string
  html:    string
  text?:   string
}

// ── Console provider (dev / fallback) ──────────────────────
function logEmail(payload: EmailPayload): void {
  logger.info({ to: payload.to, subject: payload.subject }, '📧 [EMAIL] Logged (console provider)')
  if (env.NODE_ENV === 'development') {
    logger.debug(payload.html, '[EMAIL] Body')
  }
}

// ── SMTP transporter ───────────────────────────────────────
function createSmtpTransport() {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: env.SMTP_USER
      ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
      : undefined,
  })
}

// ── Main send function ─────────────────────────────────────
export async function sendEmail(payload: EmailPayload): Promise<void> {
  try {
    if (env.EMAIL_PROVIDER === 'console' || env.NODE_ENV === 'test') {
      logEmail(payload)
      return
    }

    if (env.EMAIL_PROVIDER === 'smtp') {
      const transporter = createSmtpTransport()
      await transporter.sendMail({
        from:    env.EMAIL_FROM,
        to:      payload.to,
        subject: payload.subject,
        html:    payload.html,
        text:    payload.text,
      })
      return
    }

    // Resend
    if (env.EMAIL_PROVIDER === 'resend' && env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.EMAIL_FROM,
          to:   payload.to,
          subject: payload.subject,
          html: payload.html,
        }),
      })
      if (!res.ok) throw new Error(`Resend error: ${res.status}`)
      return
    }

    // Default fallback — log
    logEmail(payload)
  } catch (err) {
    logger.error({ err, to: payload.to }, 'Failed to send email')
    // Do not throw — email failure should never break the main request
  }
}

// ── Email templates ────────────────────────────────────────
export const emailTemplates = {
  welcome(email: string) {
    return {
      to:      email,
      subject: '✦ Fresh Mercy — Welcome!',
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#FAF6EF;padding:40px;border-radius:16px;">
          <h1 style="color:#2D4A2D;font-size:2rem;margin:0 0 4px;">FRESH <span style="color:#C9A84C;font-style:italic;">Mercy</span></h1>
          <p style="color:#7A7A6A;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 32px;">Where Mercy Meets You</p>
          <p style="color:#4A4A3A;line-height:1.8;">You are subscribed to Fresh Mercy daily devotionals. New mercies, every morning.</p>
          <blockquote style="border-left:2px solid #C9A84C;padding-left:20px;margin:24px 0;font-style:italic;color:#2D4A2D;">
            "The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning."
            <br/><cite style="font-size:11px;font-weight:bold;letter-spacing:0.1em;text-transform:uppercase;color:#C9A84C;font-style:normal;">— Lamentations 3:22–23</cite>
          </blockquote>
          <p style="color:#7A7A6A;font-size:12px;margin-top:32px;">
            To unsubscribe, <a href="${env.FRONTEND_URL}/unsubscribe" style="color:#C9A84C;">click here</a>.
          </p>
        </div>
      `,
    }
  },

  contactNotification(name: string, email: string, message: string) {
    return {
      to:      env.ADMIN_EMAIL,
      subject: `[Fresh Mercy] New contact message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#FAF6EF;border-radius:12px;">
          <h2 style="color:#2D4A2D;">New Contact Message</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <hr style="border-color:#C9A84C40;"/>
          <p style="white-space:pre-wrap;color:#4A4A3A;">${message}</p>
        </div>
      `,
    }
  },

  prayerNotification(request: string, isAnonymous: boolean, name?: string) {
    return {
      to:      env.ADMIN_EMAIL,
      subject: '[Fresh Mercy] New Prayer Request',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#FAF6EF;border-radius:12px;">
          <h2 style="color:#2D4A2D;">🙏 New Prayer Request</h2>
          <p><strong>From:</strong> ${isAnonymous ? 'Anonymous' : (name || 'Unknown')}</p>
          <hr style="border-color:#C9A84C40;"/>
          <p style="white-space:pre-wrap;color:#4A4A3A;">${request}</p>
          <p style="font-style:italic;color:#7A7A6A;font-size:12px;margin-top:24px;">
            "The effective, fervent prayer of a righteous man avails much." — James 5:16
          </p>
        </div>
      `,
    }
  },
}
