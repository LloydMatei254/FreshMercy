import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { prisma } from '../config/db.js'
import { ok, notFound } from '../utils/response.js'

const listSchema = z.object({
  page:     z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(50).default(9),
  search:   z.string().optional(),
  category: z.string().optional(),
})

const selectSummary = {
  id: true, title: true, slug: true, excerpt: true,
  scripture: true, scriptureReference: true,
  author: true, featuredImage: true, publishedAt: true,
  readingTimeMinutes: true,
  categories: { select: { id: true, name: true, slug: true, color: true } },
} as const

// ── GET /devotionals ───────────────────────────────────────
export async function listDevotionals(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, pageSize, search, category } = listSchema.parse(req.query)
    const skip = (page - 1) * pageSize

    const where = {
      status: 'PUBLISHED' as const,
      ...(search && {
        OR: [
          { title:    { contains: search, mode: 'insensitive' as const } },
          { excerpt:  { contains: search, mode: 'insensitive' as const } },
          { content:  { contains: search, mode: 'insensitive' as const } },
          { scriptureReference: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(category && { categories: { some: { slug: category } } }),
    }

    const [items, total] = await Promise.all([
      prisma.devotional.findMany({ where, skip, take: pageSize, orderBy: { publishedAt: 'desc' }, select: selectSummary }),
      prisma.devotional.count({ where }),
    ])

    return ok(res, { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) })
  } catch (err) {
    next(err)
  }
}

// ── GET /devotionals/featured ──────────────────────────────
export async function getFeaturedDevotional(_req: Request, res: Response, next: NextFunction) {
  try {
    const devotional = await prisma.devotional.findFirst({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      select: selectSummary,
    })
    if (!devotional) return notFound(res, 'No featured devotional found')
    return ok(res, devotional)
  } catch (err) {
    next(err)
  }
}

// ── GET /devotionals/today ─────────────────────────────────
export async function getTodaysDevotional(_req: Request, res: Response, next: NextFunction) {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1)

    let devotional = await prisma.devotional.findFirst({
      where: { status: 'PUBLISHED', publishedAt: { gte: today, lt: tomorrow } },
      orderBy: { publishedAt: 'desc' },
      select: selectSummary,
    })

    if (!devotional) {
      devotional = await prisma.devotional.findFirst({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        select: selectSummary,
      })
    }

    if (!devotional) return notFound(res, 'No devotionals published yet')
    return ok(res, devotional)
  } catch (err) {
    next(err)
  }
}

// ── GET /devotionals/:slug ─────────────────────────────────
export async function getDevotionalBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = String(req.params.slug)
    const devotional = await prisma.devotional.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: {
        categories: { select: { id: true, name: true, slug: true, color: true } },
        tags:       { select: { id: true, name: true, slug: true } },
      },
    })
    if (!devotional) return notFound(res, 'Devotional not found')
    return ok(res, devotional)
  } catch (err) {
    next(err)
  }
}

// ── GET /devotionals/:slug/related ─────────────────────────
export async function getRelatedDevotionals(req: Request, res: Response, next: NextFunction) {
  try {
    const slug  = String(req.params.slug)
    const limit = Math.min(Number(req.query.limit) || 3, 6)

    const current = await prisma.devotional.findFirst({
      where:  { slug },
      select: { id: true, categories: { select: { id: true } } },
    })
    if (!current) return notFound(res, 'Devotional not found')

    const categoryIds = current.categories.map((c) => c.id)

    const related = await prisma.devotional.findMany({
      where: {
        status: 'PUBLISHED',
        id:     { not: current.id },
        ...(categoryIds.length > 0 && {
          categories: { some: { id: { in: categoryIds } } },
        }),
      },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      select: selectSummary,
    })

    return ok(res, related)
  } catch (err) {
    next(err)
  }
}
