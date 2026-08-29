import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/db.js'
import { ok } from '../utils/response.js'

// ── GET /stories ───────────────────────────────────────────
export async function getApprovedStories(_req: Request, res: Response, next: NextFunction) {
  try {
    const stories = await prisma.story.findMany({
      where:   { approved: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, location: true, story: true,
        image: true, approved: true, featured: true, createdAt: true,
      },
    })
    ok(res, stories)
  } catch (err) {
    next(err)
  }
}
