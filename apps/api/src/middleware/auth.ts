import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { unauthorized } from '../utils/response.js'
import type { AuthTokenPayload } from '../types/index.js'

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : req.cookies?.fm_token

  if (!token) {
    unauthorized(res)
    return
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload
    req.user = payload
    next()
  } catch {
    unauthorized(res, 'Token is invalid or has expired')
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      unauthorized(res)
      return
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Insufficient permissions' },
      })
      return
    }
    next()
  }
}
