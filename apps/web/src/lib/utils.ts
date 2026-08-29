import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, parseISO } from 'date-fns'

// ── Tailwind class merger ─────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Date formatting ───────────────────────────────────────
export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'MMMM d, yyyy')
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM d, yyyy')
}

export function formatRelative(dateStr: string): string {
  return formatDistanceToNow(parseISO(dateStr), { addSuffix: true })
}

// ── Reading time ──────────────────────────────────────────
export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// ── Slug helpers ──────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

// ── Truncate ──────────────────────────────────────────────
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}

// ── Share helpers ─────────────────────────────────────────
export function getShareUrl(path: string): string {
  const base = import.meta.env.VITE_APP_URL ?? window.location.origin
  return `${base}${path}`
}

export function shareOnWhatsApp(text: string, url: string): void {
  const encoded = encodeURIComponent(`${text} ${url}`)
  window.open(`https://wa.me/?text=${encoded}`, '_blank', 'noopener,noreferrer')
}

export function shareOnX(text: string, url: string): void {
  const encoded = encodeURIComponent(text)
  const encodedUrl = encodeURIComponent(url)
  window.open(
    `https://twitter.com/intent/tweet?text=${encoded}&url=${encodedUrl}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export function shareOnFacebook(url: string): void {
  const encodedUrl = encodeURIComponent(url)
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    '_blank',
    'noopener,noreferrer',
  )
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// ── Native share ──────────────────────────────────────────
export async function nativeShare(data: ShareData): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share(data)
      return true
    } catch {
      return false
    }
  }
  return false
}
