import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { SEO } from '@/components/features/SEO'
import { DevotionalCard } from '@/components/features/DevotionalCard'
import { SkeletonCard } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { useDevotionals } from '@/hooks/useDevotionals'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initial = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initial)
  const [debouncedQuery, setDebouncedQuery] = useState(initial)

  // Debounce query → API
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
      if (query) {
        setSearchParams({ q: query }, { replace: true })
      } else {
        setSearchParams({}, { replace: true })
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [query, setSearchParams])

  const { data, isLoading } = useDevotionals({
    search: debouncedQuery || undefined,
    pageSize: 12,
  })

  const items = data?.data?.items ?? []
  const total = data?.data?.total ?? 0

  return (
    <>
      <SEO
        title="Search Devotionals"
        description="Search all Fresh Mercy devotionals by title, scripture, topic or keyword."
        url="/search"
        noIndex
      />

      <div className="bg-forest pt-16 pb-16 px-5 text-center">
        <span className="section-label text-gold/80">Find What You Need</span>
        <h1 className="font-serif text-display-lg text-cream mt-2 mb-8">Search Devotionals</h1>
        <div className="max-w-xl mx-auto relative">
          <label htmlFor="main-search" className="sr-only">Search devotionals</label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cream/40" aria-hidden="true" />
          <input
            id="main-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, scripture, topic…"
            autoFocus
            className="w-full bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 rounded-2xl pl-12 pr-4 py-4 text-base focus:outline-none focus:border-gold"
            aria-label="Search devotionals"
          />
        </div>
      </div>

      <div className="bg-cream min-h-screen py-12 px-5">
        <div className="max-w-7xl mx-auto">
          {/* Results summary */}
          {debouncedQuery && !isLoading && (
            <p className="text-sm text-[#7A7A6A] mb-6">
              {total} result{total !== 1 ? 's' : ''} for&nbsp;
              <strong className="text-forest">"{debouncedQuery}"</strong>
            </p>
          )}

          {!debouncedQuery && (
            <p className="text-sm text-[#7A7A6A] mb-6">
              Type to search across all devotionals, scriptures, and topics.
            </p>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : debouncedQuery && items.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No devotionals found"
              description={`We couldn't find anything matching "${debouncedQuery}". Try different keywords.`}
              action={{ label: 'Clear Search', onClick: () => setQuery('') }}
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((d) => <DevotionalCard key={d.id} devotional={d} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
