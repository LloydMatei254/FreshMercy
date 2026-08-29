import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Heart, Users } from 'lucide-react'
import { SEO } from '@/components/features/SEO'
import { Button } from '@/components/ui/Button'
import { DevotionalCard } from '@/components/features/DevotionalCard'
import { NewsletterForm } from '@/components/features/NewsletterForm'
import { ScriptureBlock } from '@/components/features/ScriptureBlock'
import { SkeletonCard } from '@/components/ui/LoadingSpinner'
import { useTodaysDevotional, useDevotionals } from '@/hooks/useDevotionals'

// ── Inline SVG logo mark (same visual as original) ────────
function LogoMark() {
  return (
    <svg
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      className="w-44 md:w-56 drop-shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
      aria-hidden="true"
    >
      <circle cx="110" cy="100" r="88" fill="none" stroke="#C9A84C" strokeWidth="2.5" />
      <g stroke="#C9A84C" strokeWidth="1.5" opacity="0.9">
        {[[110,28,110,18],[135,34,140,25],[155,50,163,43],[85,34,80,25],[65,50,57,43],[170,72,179,68],[50,72,41,68]].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      <circle cx="110" cy="68" r="18" fill="#C9A84C" opacity="0.85" />
      <ellipse cx="75"  cy="128" rx="55" ry="38" fill="#4A6741" />
      <ellipse cx="148" cy="132" rx="58" ry="34" fill="#2D4A2D" />
      <path d="M110 195 Q108 165 112 148 Q116 130 110 108 Q104 90 110 68" fill="none" stroke="#FAF6EF" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
      <g fill="#4A6741" opacity="0.95">
        <path d="M52 110 Q40 90 30 72 Q38 85 55 98 Z" />
        <path d="M55 98 Q35 82 28 60 Q40 76 58 90 Z" />
        <path d="M58 90 Q42 74 38 50 Q50 66 62 82 Z" />
        <path d="M62 82 Q48 66 48 42 Q58 58 64 76 Z" />
        <path d="M64 76 Q54 60 57 36 Q66 52 66 70 Z" />
        <path d="M52 110 Q55 95 66 70" fill="none" stroke="#4A6741" strokeWidth="2.5" />
      </g>
    </svg>
  )
}

// ── Hero Section ───────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-hero-gradient text-center px-6 pt-24 pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Radial glow overlays */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_20%_80%,rgba(74,103,65,0.18)_0%,transparent_60%)]" />
      </div>

      {/* Logo mark */}
      <div className="mb-6 animate-fade-down">
        <LogoMark />
      </div>

      {/* Text */}
      <div className="animate-fade-up max-w-2xl mx-auto">
        <h1 id="hero-heading" className="mb-3 leading-none">
          <span className="block font-serif font-black tracking-[0.12em] text-cream"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}>
            FRESH
          </span>
          <span className="block font-script italic text-gold leading-none"
                style={{ fontSize: 'clamp(3rem, 9vw, 6rem)' }}>
            Mercy
          </span>
        </h1>

        <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-cream/60 mb-1">
          — Where Mercy Meets You —
        </p>
        <p className="font-serif italic text-gold-300 text-sm mb-5 tracking-widest">
          Lam. 3:22–23
        </p>

        <blockquote className="max-w-lg mx-auto border-l-2 border-gold pl-5 text-left mb-8">
          <p className="text-cream/80 italic text-base leading-relaxed">
            "The steadfast love of the LORD never ceases; his mercies never come to an end;
            they are new every morning."
          </p>
        </blockquote>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="xl" variant="primary">
            <Link to="/devotionals">Start Today's Devotional</Link>
          </Button>
          <Button asChild size="xl" variant="outline-light">
            <Link to="/about">Discover Fresh Mercy</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-pulse-soft" aria-hidden="true">
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-cream">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-cream to-transparent" />
      </div>
    </section>
  )
}

// ── Today's Mercy ──────────────────────────────────────────
function TodaysMercySection() {
  const { data, isLoading, isError } = useTodaysDevotional()

  return (
    <section className="bg-parchment section-padding" aria-labelledby="today-heading">
      <div className="max-w-7xl mx-auto px-5">
        <div className="section-header text-center mb-12">
          <span className="section-label">✦ Today's Fresh Mercy</span>
          <h2 id="today-heading" className="font-serif text-display-md text-forest mt-2">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h2>
        </div>

        {isLoading && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2"><SkeletonCard /></div>
            <SkeletonCard />
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-[#7A7A6A] text-sm">Unable to load today's devotional. Please try again.</p>
            <Button asChild variant="outline" size="md" className="mt-4">
              <Link to="/devotionals">Browse All Devotionals</Link>
            </Button>
          </div>
        )}

        {data?.success && data.data && (
          <div className="grid md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-3">
              <DevotionalCard devotional={data.data} featured />
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="bg-cream rounded-2xl border border-gold/15 p-7">
                <ScriptureBlock
                  text={data.data.scripture}
                  reference={data.data.scriptureReference}
                />
                <p className="text-sm text-[#4A4A3A] mt-4 leading-relaxed">
                  Sit with this verse today. Let it speak to whatever you are carrying.
                </p>
              </div>
              <div className="bg-forest rounded-2xl p-6 text-cream">
                <p className="text-xs font-bold tracking-widest uppercase text-gold mb-3">
                  Morning Prayer
                </p>
                <p className="font-serif italic text-cream/80 text-sm leading-relaxed">
                  "Lord, this morning I receive Your mercy afresh. Let it cover every fear, every regret,
                  every worry I carry. You are faithful. Great is Your faithfulness. Amen."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ── Scripture Banner ───────────────────────────────────────
function ScriptureBannerSection() {
  return (
    <section className="bg-forest py-14 text-center" aria-label="Core scripture">
      <div className="max-w-3xl mx-auto px-5">
        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold mb-5 animate-shimmer">
          ✦ ✦ ✦
        </p>
        <blockquote>
          <p className="font-serif italic text-parchment text-xl md:text-2xl leading-relaxed mb-4">
            "It is of the LORD's mercies that we are not consumed, because his compassions fail not.
            They are new every morning: great is thy faithfulness."
          </p>
          <cite className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold not-italic">
            — Lamentations 3:22–23 (KJV)
          </cite>
        </blockquote>
      </div>
    </section>
  )
}

// ── About Snapshot ─────────────────────────────────────────
function AboutSnapshot() {
  const pillars = [
    { icon: <BookOpen className="h-6 w-6" />, title: 'The Living Word', desc: 'Scripture is our foundation and daily bread.' },
    { icon: <Heart    className="h-6 w-6" />, title: 'Grace Alone',     desc: 'Salvation is freely given, not earned.' },
    { icon: <Users    className="h-6 w-6" />, title: 'Community',       desc: 'Mercy is best shared, not stored.' },
  ]

  return (
    <section className="bg-cream section-padding" aria-labelledby="about-snap-heading">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="section-label">Who We Are</span>
            <h2 id="about-snap-heading" className="font-serif text-display-md text-forest mt-2 mb-5">
              A Gospel-Centered Community
            </h2>
            <p className="text-[#4A4A3A] leading-relaxed mb-4">
              Fresh Mercy is a gospel-rooted ministry built on one profound truth — God's mercy
              is renewed every single morning. No matter where you've been or what you've carried,
              His compassions never fail.
            </p>
            <p className="text-[#4A4A3A] leading-relaxed mb-8">
              We exist to point every weary heart back to the Father who runs toward the prodigal,
              who lifts the broken, and whose love is steadfast and unending. This is not religion —
              this is relationship.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link to="/about">Our Story <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pillars">Our Pillars</Link>
              </Button>
            </div>
          </div>

          {/* Pillars preview */}
          <div className="flex flex-col gap-4">
            {pillars.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 bg-parchment rounded-2xl p-5 border border-gold/10 hover:border-gold/30 transition-colors card-hover"
              >
                <div className="shrink-0 text-gold p-2 bg-gold/10 rounded-xl">{icon}</div>
                <div>
                  <h3 className="font-serif font-bold text-forest text-base mb-1">{title}</h3>
                  <p className="text-sm text-[#4A4A3A]">{desc}</p>
                </div>
              </div>
            ))}
            <Link
              to="/pillars"
              className="text-xs font-bold tracking-widest uppercase text-gold hover:text-gold-500 text-center mt-2 transition-colors"
            >
              See All 6 Pillars →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Recent Devotionals ─────────────────────────────────────
function RecentDevotionalsSection() {
  const { data, isLoading } = useDevotionals({ page: 1, pageSize: 3 })

  return (
    <section className="bg-parchment section-padding" aria-labelledby="recent-heading">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-label">New Every Morning</span>
            <h2 id="recent-heading" className="font-serif text-display-md text-forest mt-2">
              Recent Devotionals
            </h2>
          </div>
          <Link
            to="/devotionals"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-forest hover:text-gold transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : data?.data?.items?.map((d) => (
                <DevotionalCard key={d.id} devotional={d} />
              ))
          }
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/devotionals">Explore All Devotionals</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// ── Newsletter CTA ─────────────────────────────────────────
function NewsletterSection() {
  return (
    <section className="bg-forest section-padding" aria-labelledby="newsletter-heading">
      <div className="max-w-2xl mx-auto px-5 text-center">
        <span className="section-label text-gold/80">Get Daily Mercy</span>
        <h2 id="newsletter-heading" className="font-serif text-display-md text-cream mt-2 mb-3">
          Fresh Mercy Every Morning
        </h2>
        <p className="text-cream/70 text-base mb-8 leading-relaxed">
          Start your day with scripture, devotional, and prayer — delivered to your inbox before your
          feet hit the floor.
        </p>
        <NewsletterForm source="homepage-cta" variant="stacked" className="max-w-md mx-auto" />
        <p className="text-xs text-cream/40 mt-4">
          No spam. Unsubscribe anytime. Just fresh mercy.
        </p>
      </div>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <SEO />
      <HeroSection />
      <TodaysMercySection />
      <ScriptureBannerSection />
      <AboutSnapshot />
      <RecentDevotionalsSection />
      <NewsletterSection />
    </>
  )
}
