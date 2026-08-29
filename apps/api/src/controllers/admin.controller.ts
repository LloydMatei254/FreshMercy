import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js'
import { ok, created, notFound, unauthorized, conflict } from '../utils/response.js'
import { env } from '../config/env.js'

// ── POST /admin/auth/login ─────────────────────────────────
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = z.object({
      email:    z.string().email(),
      password: z.string().min(1),
    }).parse(req.body)

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) {
      return unauthorized(res, 'Invalid email or password')
    }

    const valid = await argon2.verify(user.passwordHash, password)
    if (!valid) {
      return unauthorized(res, 'Invalid email or password')
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] },
    )

    ok(res, {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    }, 'Logged in successfully')
  } catch (err) {
    next(err)
  }
}

// ── POST /admin/auth/logout ────────────────────────────────
export async function logout(_req: Request, res: Response) {
  res.clearCookie('fm_token')
  ok(res, null, 'Logged out')
}

// ── GET /admin/auth/me ─────────────────────────────────────
export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where:  { id: req.user!.userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })
    if (!user) return notFound(res, 'User not found')
    return ok(res, user)
  } catch (err) {
    next(err)
  }
}

// ── GET /admin/dashboard ───────────────────────────────────
export async function getDashboard(_req: Request, res: Response, next: NextFunction) {
  try {
    const [
      totalDevotionals,
      publishedDevotionals,
      totalSubscribers,
      newPrayerRequests,
      unreadMessages,
      totalStories,
      pendingStories,
    ] = await Promise.all([
      prisma.devotional.count(),
      prisma.devotional.count({ where: { status: 'PUBLISHED' } }),
      prisma.newsletterSubscriber.count({ where: { status: 'ACTIVE' } }),
      prisma.prayerRequest.count({ where: { status: 'NEW' } }),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.story.count(),
      prisma.story.count({ where: { approved: false } }),
    ])

    ok(res, {
      totalDevotionals, publishedDevotionals, totalSubscribers,
      newPrayerRequests, unreadMessages, totalStories, pendingStories,
    })
  } catch (err) {
    next(err)
  }
}

// ── Devotional CRUD ────────────────────────────────────────
const devotionalSchema = z.object({
  title:              z.string().min(3).max(200),
  slug:               z.string().min(3).max(200),
  excerpt:            z.string().min(10).max(500),
  content:            z.string().min(50),
  scripture:          z.string().min(5),
  scriptureReference: z.string().min(3),
  prayer:             z.string().optional(),
  author:             z.string().min(2),
  status:             z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
})

export async function adminListDevotionals(req: Request, res: Response, next: NextFunction) {
  try {
    const page     = Math.max(1, Number(req.query.page) || 1)
    const pageSize = Math.min(50, Number(req.query.pageSize) || 20)
    const skip     = (page - 1) * pageSize

    const [items, total] = await Promise.all([
      prisma.devotional.findMany({
        skip, take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, title: true, slug: true, excerpt: true,
          author: true, publishedAt: true, status: true,
          scripture: true, scriptureReference: true,
          categories: { select: { id: true, name: true, slug: true, color: true } },
        },
      }),
      prisma.devotional.count(),
    ])
    ok(res, { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) })
  } catch (err) {
    next(err)
  }
}

export async function adminGetDevotional(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id)
    const d = await prisma.devotional.findUnique({
      where: { id },
      include: {
        categories: { select: { id: true, name: true, slug: true, color: true } },
        tags:       { select: { id: true, name: true, slug: true } },
      },
    })
    if (!d) return notFound(res, 'Devotional not found')
    return ok(res, d)
  } catch (err) {
    next(err)
  }
}

export async function adminCreateDevotional(req: Request, res: Response, next: NextFunction) {
  try {
    const data = devotionalSchema.parse(req.body)

    const existing = await prisma.devotional.findUnique({ where: { slug: data.slug } })
    if (existing) return conflict(res, 'A devotional with this slug already exists')

    const devotional = await prisma.devotional.create({
      data: {
        ...data,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      },
    })
    return created(res, devotional, 'Devotional created')
  } catch (err) {
    next(err)
  }
}

export async function adminUpdateDevotional(req: Request, res: Response, next: NextFunction) {
  try {
    const data = devotionalSchema.partial().parse(req.body)
    const id   = String(req.params.id)

    const existing = await prisma.devotional.findUnique({ where: { id } })
    if (!existing) return notFound(res, 'Devotional not found')

    const updated = await prisma.devotional.update({ where: { id }, data })
    return ok(res, updated, 'Devotional updated')
  } catch (err) {
    next(err)
  }
}

export async function adminDeleteDevotional(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id)
    const existing = await prisma.devotional.findUnique({ where: { id } })
    if (!existing) return notFound(res, 'Devotional not found')
    await prisma.devotional.delete({ where: { id } })
    return ok(res, null, 'Devotional deleted')
  } catch (err) {
    next(err)
  }
}

export async function adminPublishDevotional(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id)
    const existing = await prisma.devotional.findUnique({ where: { id } })
    if (!existing) return notFound(res, 'Devotional not found')

    const isPublished = existing.status === 'PUBLISHED'
    const updated = await prisma.devotional.update({
      where: { id },
      data: {
        status:      isPublished ? 'DRAFT' : 'PUBLISHED',
        publishedAt: isPublished ? null    : new Date(),
      },
    })
    return ok(res, updated, isPublished ? 'Devotional unpublished' : 'Devotional published')
  } catch (err) {
    next(err)
  }
}

export async function adminUpdatePrayerRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id)
    const { status } = z.object({ status: z.enum(['NEW', 'PRAYED', 'ARCHIVED']) }).parse(req.body)
    const updated = await prisma.prayerRequest.update({ where: { id }, data: { status } })
    return ok(res, updated)
  } catch (err) {
    next(err)
  }
}

export async function adminUpdateMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id)
    const { isRead } = z.object({ isRead: z.boolean() }).parse(req.body)
    const updated = await prisma.contactMessage.update({ where: { id }, data: { isRead } })
    return ok(res, updated)
  } catch (err) {
    next(err)
  }
}

export async function adminApproveStory(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id)
    const { approved } = z.object({ approved: z.boolean() }).parse(req.body)
    const updated = await prisma.story.update({ where: { id }, data: { approved } })
    return ok(res, updated)
  } catch (err) {
    next(err)
  }
}

// ── Prayer Requests list ───────────────────────────────────
export async function adminListPrayerRequests(_req: Request, res: Response, next: NextFunction) {
  try {
    const requests = await prisma.prayerRequest.findMany({ orderBy: { createdAt: 'desc' } })
    return ok(res, requests)
  } catch (err) {
    next(err)
  }
}

// ── Messages list ──────────────────────────────────────────
export async function adminListMessages(_req: Request, res: Response, next: NextFunction) {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
    return ok(res, messages)
  } catch (err) {
    next(err)
  }
}

// ── Subscribers list ───────────────────────────────────────
export async function adminListSubscribers(_req: Request, res: Response, next: NextFunction) {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: 'desc' } })
    return ok(res, subscribers)
  } catch (err) {
    next(err)
  }
}

// ── Stories list ───────────────────────────────────────────
export async function adminListStories(_req: Request, res: Response, next: NextFunction) {
  try {
    const stories = await prisma.story.findMany({ orderBy: { createdAt: 'desc' } })
    return ok(res, stories)
  } catch (err) {
    next(err)
  }
}
