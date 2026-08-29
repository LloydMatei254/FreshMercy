import { Link } from 'react-router-dom'
import { Clock, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import type { DevotionalSummary } from '@/types'

interface DevotionalCardProps {
  devotional: DevotionalSummary
  featured?: boolean
  className?: string
}

export function DevotionalCard({ devotional, featured = false, className }: DevotionalCardProps) {
  return (
    <article
      className={cn(
        'group rounded-2xl border border-gold/15 transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lifted',
        featured
          ? 'bg-forest text-cream p-0 overflow-hidden'
          : 'bg-cream p-6',
        className,
      )}
      aria-label={`Devotional: ${devotional.title}`}
    >
      {featured ? (
        <div className="p-8 flex flex-col gap-4 h-full">
          <div className="flex items-center gap-2">
            <Badge variant="gold">Featured</Badge>
            <span className="text-[10px] font-bold tracking-widest uppercase text-cream/50">
              {devotional.publishedAt ? formatDate(devotional.publishedAt) : 'Coming soon'}
            </span>
          </div>
          <p className="text-xs italic text-gold font-script text-lg leading-snug">
            "{devotional.scriptureReference}"
          </p>
          <h2 className="font-serif text-2xl font-bold text-cream leading-snug group-hover:text-gold/90 transition-colors">
            {devotional.title}
          </h2>
          <p className="text-cream/70 text-sm leading-relaxed flex-1">
            {devotional.excerpt}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-cream/50 text-xs">
              <Clock className="h-3 w-3" />
              <span>{devotional.readingTimeMinutes ?? 3} min read</span>
            </div>
            <Link
              to={`/devotionals/${devotional.slug}`}
              className="text-xs font-bold tracking-widest uppercase text-gold hover:text-gold-300 transition-colors flex items-center gap-1"
            >
              Read Full Devotional →
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 h-full">
          {devotional.categories?.[0] && (
            <Badge variant="olive">{devotional.categories[0].name}</Badge>
          )}
          <p className="text-[10px] font-bold tracking-widest uppercase text-gold">
            {devotional.publishedAt ? formatDate(devotional.publishedAt) : 'Draft'}
          </p>
          <h3 className="font-serif text-lg font-bold text-forest leading-snug group-hover:text-gold transition-colors">
            <Link to={`/devotionals/${devotional.slug}`}>{devotional.title}</Link>
          </h3>
          <p className="text-sm text-[#4A4A3A] leading-relaxed flex-1">
            {devotional.excerpt}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-gold/10">
            <div className="flex items-center gap-1.5 text-[#7A7A6A] text-xs">
              <BookOpen className="h-3 w-3" />
              <span>{devotional.author}</span>
            </div>
            <Link
              to={`/devotionals/${devotional.slug}`}
              className="text-xs font-bold tracking-wider uppercase text-forest hover:text-gold transition-colors"
            >
              Read →
            </Link>
          </div>
        </div>
      )}
    </article>
  )
}
