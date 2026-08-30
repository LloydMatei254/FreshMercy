import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { SEO } from '@/components/features/SEO'
import { DevotionalCard } from '@/components/features/DevotionalCard'
import { Button } from '@/components/ui/Button'
import { SkeletonCard } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { useDevotionals, useTodaysDevotional } from '@/hooks/useDevotionals'

const PAGE_SIZE = 9

export default function DevotionalsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const { data, isLoading } = useDevotionals({ page, pageSize: PAGE_SIZE, search: search || undefined })
  const { data: todayData }  = useTodaysDevotional()

  const items      = data?.data?.items ?? []
  const totalPages = data?.data?.totalPages ?? 1
  const total      = data?.data?.total ?? 0

  return (
    <>
      <SEO
        title="Devotionals"
        description="Browse our library of gospel-centered devotionals rooted in scripture. New mercies every morning."
        url="/devotionals"
      />

      {/* Page header */}
      <div className="bg-forest pt-16 pb-16 text-center px-5">
        <span className="section-label text-gold/80">New Every Morning</span>
        <h1 className="font-serif text-display-lg text-cream mt-2 mb-4">Devotionals</h1>
        <p className="text-cream/70 max-w-xl mx-auto text-base leading-relaxed">
          A growing library of gospel-centered devotionals — each one rooted in scripture,
          written to meet you where you are.
        </p>

        {/* Search bar */}
        <div className="mt-8 max-w-lg mx-auto relative">
          <label htmlFor="devotional-search" className="sr-only">Search devotionals</label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/40" aria-hidden="true" />
          <input
            id="devotional-search"
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search devotionals, scripture, topics…"
            className="w-full bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-gold"
            aria-label="Search devotionals"
          />
        </div>
      </div>

      <div className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-5 py-14">

          {/* Today's devotional callout */}
          {!search && page === 1 && todayData?.success && todayData.data && (
            <div className="mb-12">
              <span className="section-label mb-3 block">✦ Today's Mercy</span>
              <div className="max-w-2xl">
                <DevotionalCard devotional={todayData.data} featured />
              </div>
            </div>
          )}

          {/* Results count */}
          {!isLoading && (
            <p className="text-sm text-[#7A7A6A] mb-6">
              {search
                ? `${total} result${total !== 1 ? 's' : ''} for "${search}"`
                : `${total} devotional${total !== 1 ? 's' : ''}`
              }
            </p>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              icon="📖"
              title={search ? 'No devotionals found' : 'No devotionals yet'}
              description={
                search
                  ? 'Try a different search term or browse all devotionals.'
                  : 'Check back soon — new mercies are on the way.'
              }
              action={search ? { label: 'Clear Search', onClick: () => setSearch('') } : undefined}
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((d) => <DevotionalCard key={d.id} devotional={d} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="flex items-center justify-center gap-4 mt-12"
              aria-label="Devotionals pagination"
            >
              <Button
                variant="outline"
                size="md"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-[#7A7A6A]">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="md"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          )}

        </div>
      </div>
    </>
  )
}
