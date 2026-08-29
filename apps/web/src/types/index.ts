// ── API Response wrapper ──────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
  }
}

export interface PaginatedResponse<T> {
  success: boolean
  data: {
    items: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

// ── Devotional ────────────────────────────────────────────
export type DevotionalStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface Devotional {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  scripture: string
  scriptureReference: string
  prayer?: string
  reflectionQuestions?: string[]
  author: string
  authorBio?: string
  featuredImage?: string
  publishedAt: string | null
  status: DevotionalStatus
  readingTimeMinutes?: number
  categories: Category[]
  tags: Tag[]
  createdAt: string
  updatedAt: string
}

export interface DevotionalSummary {
  id: string
  title: string
  slug: string
  excerpt: string
  scripture: string
  scriptureReference: string
  author: string
  featuredImage?: string
  publishedAt: string | null
  readingTimeMinutes?: number
  categories: Category[]
}

// ── Category / Tag ─────────────────────────────────────────
export interface Category {
  id: string
  name: string
  slug: string
  color?: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

// ── Newsletter ─────────────────────────────────────────────
export type SubscriberStatus = 'ACTIVE' | 'UNSUBSCRIBED'

export interface NewsletterSubscriber {
  id: string
  email: string
  status: SubscriberStatus
  source: string
  subscribedAt: string
}

// ── Prayer Request ─────────────────────────────────────────
export type PrayerRequestStatus = 'NEW' | 'PRAYED' | 'ARCHIVED'

export interface PrayerRequest {
  id: string
  name?: string
  isAnonymous: boolean
  request: string
  status: PrayerRequestStatus
  createdAt: string
}

// ── Contact ────────────────────────────────────────────────
export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  isRead: boolean
  createdAt: string
}

// ── Story ──────────────────────────────────────────────────
export interface Story {
  id: string
  name: string
  location?: string
  story: string
  image?: string
  approved: boolean
  featured: boolean
  createdAt: string
}

// ── Admin / Auth ───────────────────────────────────────────
export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'
  createdAt: string
}

export interface AuthTokenPayload {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

// ── Dashboard metrics ──────────────────────────────────────
export interface DashboardMetrics {
  totalDevotionals: number
  publishedDevotionals: number
  totalSubscribers: number
  newPrayerRequests: number
  unreadMessages: number
  totalStories: number
  pendingStories: number
}

// ── Forms ──────────────────────────────────────────────────
export interface NewsletterFormData {
  email: string
}

export interface PrayerFormData {
  name?: string
  email?: string
  request: string
  isAnonymous: boolean
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface LoginFormData {
  email: string
  password: string
}
