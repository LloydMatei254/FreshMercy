import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

export function LoadingSpinner({
  size = 'md',
  className,
  label = 'Loading…',
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)} role="status">
      <div
        className={cn(
          'rounded-full border-gold border-t-transparent animate-spin',
          sizes[size],
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-[#7A7A6A] animate-pulse">
          Loading fresh mercy…
        </p>
      </div>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gold/10 bg-parchment p-6 animate-pulse">
      <div className="h-3 w-16 rounded bg-gold/20 mb-4" />
      <div className="h-5 w-3/4 rounded bg-forest/10 mb-2" />
      <div className="h-4 w-full rounded bg-forest/10 mb-1" />
      <div className="h-4 w-5/6 rounded bg-forest/10 mb-4" />
      <div className="h-3 w-1/2 rounded bg-gold/20" />
    </div>
  )
}
