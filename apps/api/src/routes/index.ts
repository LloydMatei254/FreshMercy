import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'

// Controllers
import * as devotional from '../controllers/devotional.controller.js'
import * as newsletter from '../controllers/newsletter.controller.js'
import * as prayer     from '../controllers/prayer.controller.js'
import * as contact    from '../controllers/contact.controller.js'
import * as story      from '../controllers/story.controller.js'
import * as admin      from '../controllers/admin.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// ── Rate limiters ──────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max:      env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Too many requests.' } },
})

const formLimiter = rateLimit({
  windowMs: env.FORM_RATE_LIMIT_WINDOW_MS,
  max:      env.FORM_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Too many submissions — please wait before trying again.' } },
})

router.use(globalLimiter)

// ── Health ────────────────────────────────────────────────
router.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } })
})

// ── Devotionals (public) ──────────────────────────────────
// NOTE: specific routes must come BEFORE /:slug
router.get('/devotionals/featured', devotional.getFeaturedDevotional)
router.get('/devotionals/today',    devotional.getTodaysDevotional)
router.get('/devotionals',          devotional.listDevotionals)
router.get('/devotionals/:slug/related', devotional.getRelatedDevotionals)
router.get('/devotionals/:slug',    devotional.getDevotionalBySlug)

// ── Newsletter (public) ───────────────────────────────────
router.post('/newsletter/subscribe',   formLimiter, newsletter.subscribe)
router.post('/newsletter/unsubscribe', formLimiter, newsletter.unsubscribe)

// ── Prayer Requests (public) ──────────────────────────────
router.post('/prayer-requests', formLimiter, prayer.submitPrayerRequest)

// ── Contact (public) ──────────────────────────────────────
router.post('/contact', formLimiter, contact.submitContact)

// ── Stories (public) ─────────────────────────────────────
router.get('/stories', story.getApprovedStories)

// ── Admin Auth ────────────────────────────────────────────
router.post('/admin/auth/login',   formLimiter, admin.login)
router.post('/admin/auth/logout',  admin.logout)
router.get('/admin/auth/me',       requireAuth, admin.getMe)

// ── Admin (protected) ─────────────────────────────────────
router.use('/admin', requireAuth)

router.get('/admin/dashboard', admin.getDashboard)

// Devotionals CRUD
router.get('/admin/devotionals',              admin.adminListDevotionals)
router.post('/admin/devotionals',             admin.adminCreateDevotional)
router.get('/admin/devotionals/:id',          admin.adminGetDevotional)
router.put('/admin/devotionals/:id',          admin.adminUpdateDevotional)
router.delete('/admin/devotionals/:id',       admin.adminDeleteDevotional)
router.post('/admin/devotionals/:id/publish', admin.adminPublishDevotional)

// Prayer Requests
router.get('/admin/prayer-requests',      admin.adminListPrayerRequests)
router.put('/admin/prayer-requests/:id',  admin.adminUpdatePrayerRequest)

// Messages
router.get('/admin/messages',     admin.adminListMessages)
router.put('/admin/messages/:id', admin.adminUpdateMessage)

// Subscribers
router.get('/admin/subscribers', admin.adminListSubscribers)

// Stories
router.get('/admin/stories',              admin.adminListStories)
router.put('/admin/stories/:id/approve',  admin.adminApproveStory)

export default router
