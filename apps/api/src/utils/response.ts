import type { Response } from 'express'

export function ok<T>(res: Response, data: T, message?: string) {
  return res.json({ success: true, data, message })
}

export function created<T>(res: Response, data: T, message?: string) {
  return res.status(201).json({ success: true, data, message })
}

export function noContent(res: Response) {
  return res.status(204).send()
}

export function badRequest(res: Response, message: string, code = 'BAD_REQUEST') {
  return res.status(400).json({ success: false, error: { code, message } })
}

export function unauthorized(res: Response, message = 'Unauthorized') {
  return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message } })
}

export function forbidden(res: Response, message = 'Forbidden') {
  return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message } })
}

export function notFound(res: Response, message = 'Not found') {
  return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message } })
}

export function conflict(res: Response, message: string) {
  return res.status(409).json({ success: false, error: { code: 'CONFLICT', message } })
}

export function tooManyRequests(res: Response) {
  return res.status(429).json({
    success: false,
    error: { code: 'TOO_MANY_REQUESTS', message: 'Too many requests — please try again later.' },
  })
}

export function serverError(res: Response, message = 'Internal server error') {
  return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message } })
}
