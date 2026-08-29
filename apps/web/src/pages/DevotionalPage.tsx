import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Clock, User, BookOpen, ChevronUp } from 'lucide-react'
import { SEO } from '@/components/features/SEO'
import { ScriptureBlock } from '@/components/features/ScriptureBlock'
import { ShareButtons } from '@/components/features/ShareButtons'
import { DevotionalCard } from '@/components/features/DevotionalCard'
import { Button } from '@/components/ui/Button'
import { PageLoader } from '@/components/ui/LoadingSpinner'
import { NewsletterForm } from '@/components/features/NewsletterForm'
import { useDevotional, useRelatedDevotionals } from '@/hooks/useDevotionals'
import { formatDate } from '@/lib/utils'

export default function DevotionalPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal')

  const { data, isLoading, isError } = useDevotional(slug)
  const { data: related } = useRelatedDevotionals(slug)

  const fontSizeClass = {
    normal: 'text-base',
    large:  'text-lg',
    xlarge: 'text-xl',
  }[fontSize]

  if (isLoading) return <PageLoader />

  if (isError || !data?.success) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-24 px-5">
        <div className="text-center max-w-md">
          <p className="font-serif text-2xl text-forest mb-4">Devotional not found</p>
          <p className="text-[#7A7A6A] text-sm mb-6">
            This devotional may have been moved or is no longer available.
          </p>
          <Button asChild variant="primary">
            <Link to="/devotionals">Browse All Devotionals</Link>
          </Button>
        </div>
      </div>
    )
  }

  const devotional = data.data

  return (
    <>
      <SEO
        title={devotional.title}
        description={devotional.excerpt}
        url={`/devotionals/${devotional.slug}`}
        type="article"
        publishedAt={devotional.publishedAt ?? undefined}
        author={devotional.author}
      />

      {/* Hero banner */}
      <div className="bg-forest pt-32 pb-16 px-5">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/devotionals"
            className="inline-flex items-center gap-2 text-cream/60 hover:text-cream text-xs font-bold tracking-wider uppercase mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Devotionals
          </Link>

          {devotional.categories?.[0] && (
            <span className="inline-block bg-gold/20 text-gold text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-gold/30 mb-4">
              {devotional.categories[0].name}
            </span>
          )}

          <h1 className="font-serif font-bold text-cream mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.15 }}>
            {devotional.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-cream/50 text-xs">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {devotional.author}
            </span>
            {devotional.publishedAt && (
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                {formatDate(devotional.publishedAt)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {devotional.readingTimeMinutes ?? 3} min read
            </span>
          </div>
        </div>
      </div>

      {/* Reading area */}
      <div className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-5 py-12">

          {/* Text size controls */}
          <div className="flex items-center gap-2 mb-8" aria-label="Text size controls">
            <span className="text-xs font-bold tracking-wider uppercase text-[#7A7A6A] mr-2">Text Size</span>
            {(['normal', 'large', 'xlarge'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  fontSize === size
                    ? 'bg-gold text-forest'
                    : 'bg-parchment text-forest hover:bg-gold/20'
                }`}
                aria-pressed={fontSize === size}
              >
                {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
              </button>
            ))}
          </div>

          {/* Featured scripture */}
          <ScriptureBlock
            text={devotional.scripture}
            reference={devotional.scriptureReference}
            className="mb-8"
          />

          {/* Main content */}
          <div className={`prose-mercy ${fontSizeClass} mb-10`}
               dangerouslySetInnerHTML={{ __html: devotional.content }} />

          {/* Prayer */}
          {devotional.prayer && (
            <div className="bg-forest rounded-2xl p-7 mb-8">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gold mb-4">
                A Prayer
              </p>
              <p className="font-serif italic text-cream/80 text-base leading-relaxed">
                {devotional.prayer}
              </p>
            </div>
          )}

          {/* Reflection questions */}
          {devotional.reflectionQuestions && devotional.reflectionQuestions.length > 0 && (
            <div className="bg-parchment rounded-2xl border border-gold/15 p-7 mb-8">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gold mb-4">
                Reflection Questions
              </p>
              <ol className="flex flex-col gap-3 list-decimal list-inside">
                {devotional.reflectionQuestions.map((q, i) => (
                  <li key={i} className="text-forest text-base leading-relaxed">{q}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Share */}
          <div className="border-t border-gold/15 pt-8 mb-12">
            <ShareButtons
              title={devotional.title}
              excerpt={devotional.excerpt}
              path={`/devotionals/${devotional.slug}`}
            />
          </div>

          {/* Back to top */}
          <div className="text-center mb-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7A7A6A] hover:text-gold transition-colors"
            >
              <ChevronUp className="h-4 w-4" />
              Back to top
            </button>
          </div>

          {/* Related devotionals */}
          {related?.success && related.data.length > 0 && (
            <section className="mb-14" aria-labelledby="related-heading">
              <h2 id="related-heading" className="font-serif text-xl text-forest mb-6">
                More Devotionals
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.data.slice(0, 2).map((d) => (
                  <DevotionalCard key={d.id} devotional={d} />
                ))}
              </div>
            </section>
          )}

          {/* Newsletter CTA */}
          <div className="bg-forest rounded-2xl p-8 text-center">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gold mb-2">
              Get Daily Mercy
            </p>
            <h2 className="font-serif text-xl text-cream mb-2">
              Start every morning like this
            </h2>
            <p className="text-cream/60 text-sm mb-6">
              New devotionals delivered to your inbox every morning.
            </p>
            <NewsletterForm source="devotional-page" variant="inline" className="max-w-sm mx-auto" />
          </div>
        </div>
      </div>
    </>
  )
}
