import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Heart, Users, Mail } from 'lucide-react'
import { SEO } from '@/components/features/SEO'
import { Button } from '@/components/ui/Button'
import { NewsletterForm } from '@/components/features/NewsletterForm'

// ── SVG Logo Mark ──────────────────────────────────────────
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
        <line x1="110" y1="28" x2="110" y2="18" />
        <line x1="135" y1="34" x2="140" y2="25" />
        <line x1="155" y1="50" x2="163" y2="43" />
        <line x1="85"  y1="34" x2="80"  y2="25" />
        <line x1="65"  y1="50" x2="57"  y2="43" />
        <line x1="170" y1="72" x2="179" y2="68" />
        <line x1="50"  y1="72" x2="41"  y2="68" />
      </g>
      <circle cx="110" cy="68" r="18" fill="#C9A84C" opacity="0.85" />
      <ellipse cx="75"  cy="128" rx="55" ry="38" fill="#4A6741" />
      <ellipse cx="148" cy="132" rx="58" ry="34" fill="#2D4A2D" />
      <path
        d="M110 195 Q108 165 112 148 Q116 130 110 108 Q104 90 110 68"
        fill="none" stroke="#FAF6EF" strokeWidth="10" strokeLinecap="round" opacity="0.6"
      />
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

// ── Hero ───────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden text-center px-6 pt-24 pb-20"
      style={{ background: 'linear-gradient(160deg, #1A3020 0%, #2D4A2D 45%, #3A5C3A 70%, #1E2D1E 100%)' }}
      aria-labelledby="hero-heading"
    >
      {/* Glow overlays */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 20% 80%, rgba(74,103,65,0.18) 0%, transparent 60%)' }} />
      </div>

      {/* Logo mark */}
      <div className="mb-6 relative z-10" style={{ animation: 'fadeDown 0.8s ease forwards' }}>
        <LogoMark />
      </div>

      {/* Title */}
      <div className="relative z-10 max-w-2xl mx-auto" style={{ animation: 'fadeUp 0.8s ease 0.3s both' }}>
        <h1 id="hero-heading" className="mb-4 leading-none">
          <span
            className="block font-serif font-black tracking-[0.12em]"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', color: '#FAF6EF' }}
          >
            FRESH
          </span>
          <span
            className="block font-script italic"
            style={{ fontSize: 'clamp(3rem, 9vw, 6rem)', color: '#C9A84C', lineHeight: 1.1, marginTop: '-0.1em' }}
          >
            Mercy
          </span>
        </h1>

        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(250,246,239,0.6)', marginBottom: '0.4rem' }}>
          — Where Mercy Meets You —
        </p>
        <p className="font-serif italic mb-5" style={{ color: '#E2C97E', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
          Lam. 3:22–23
        </p>

        <blockquote
          className="max-w-lg mx-auto mb-8 text-left pl-5"
          style={{ borderLeft: '2px solid #C9A84C' }}
        >
          <p className="italic leading-relaxed" style={{ color: 'rgba(250,246,239,0.80)', fontSize: '1rem' }}>
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

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(250,246,239,0.4)', animation: 'fadeIn 1s ease 1.2s both' }}
        aria-hidden="true"
      >
        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(250,246,239,0.4), transparent)' }} />
      </div>
    </section>
  )
}

// ── Scripture Banner ───────────────────────────────────────
function ScriptureBanner() {
  return (
    <section className="py-14 px-5 text-center" style={{ background: '#2D4A2D' }} aria-label="Core scripture">
      <div className="max-w-3xl mx-auto">
        <p className="font-serif mb-3" style={{ color: '#C9A84C', fontSize: '1.2rem' }}>✦ ✦ ✦</p>
        <blockquote>
          <p className="font-serif italic leading-relaxed mb-4" style={{ color: '#F0E8D5', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}>
            "It is of the LORD's mercies that we are not consumed, because his compassions fail not.
            They are new every morning: great is thy faithfulness."
          </p>
          <cite className="not-italic font-bold tracking-widest uppercase" style={{ fontSize: '0.72rem', color: '#C9A84C' }}>
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
    { icon: <BookOpen className="h-5 w-5" />, title: 'The Living Word', desc: 'Scripture is our foundation and daily bread — we dig in to be transformed, not just informed.' },
    { icon: <Heart    className="h-5 w-5" />, title: 'Grace Alone',     desc: 'Salvation is freely given, not earned. We proclaim the grace of God that appears to all people.' },
    { icon: <Users    className="h-5 w-5" />, title: 'Authentic Community', desc: 'Mercy is best shared. We build honest community where the broken are welcomed and no one walks alone.' },
  ]

  return (
    <section className="py-20 md:py-28 px-5" style={{ background: '#FAF6EF' }} aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Text side */}
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A84C' }}>
              Who We Are
            </span>
            <h2 id="about-heading" className="font-serif font-bold mb-5 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#2D4A2D' }}>
              A Gospel-Centered Community
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: '#4A4A3A' }}>
              Fresh Mercy is a gospel-rooted ministry built on one profound truth — God's mercy
              is renewed every single morning. No matter where you've been or what you've carried,
              His compassions never fail.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: '#4A4A3A' }}>
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
                className="flex items-start gap-4 rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
                style={{ background: '#F0E8D5', borderColor: 'rgba(201,168,76,0.15)' }}
              >
                <div className="shrink-0 p-2 rounded-xl" style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}>
                  {icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold mb-1" style={{ color: '#2D4A2D', fontSize: '1rem' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A4A3A' }}>{desc}</p>
                </div>
              </div>
            ))}
            <Link
              to="/pillars"
              className="text-center text-xs font-bold tracking-widest uppercase mt-1 transition-colors hover:opacity-70"
              style={{ color: '#C9A84C' }}
            >
              See All 6 Pillars →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Devotional Preview (static — no API) ──────────────────
function DevotionalPreview() {
  const devotionals = [
    {
      tag: 'Featured',
      date: 'Morning Mercy',
      title: 'Running Toward the Prodigal',
      excerpt: 'Before he could finish his rehearsed apology, the father was already running. That is the picture of our God — not waiting with crossed arms, but sprinting toward every soul that turns homeward.',
      scripture: 'Luke 15:20',
      slug: 'running-toward-the-prodigal',
      dark: true,
    },
    {
      date: 'Day 2',
      title: 'His Mercies Are Not Exhausted',
      excerpt: 'The Hebrew word for mercies in Lamentations is rahamim — compassion rooted in deep, tender love. They cannot run dry because they flow from an inexhaustible God.',
      scripture: 'Lam. 3:22–23',
      slug: 'his-mercies-are-not-exhausted',
      dark: false,
    },
    {
      date: 'Day 3',
      title: 'Great Is Thy Faithfulness',
      excerpt: 'When Thomas Chisholm penned those words, he was reflecting on a lifetime of ordinary days where God showed up. Faithfulness is not a grand gesture — it is God, faithful in the small things.',
      scripture: 'Lam. 3:23',
      slug: 'great-is-thy-faithfulness',
      dark: false,
    },
  ]

  return (
    <section className="py-20 md:py-28 px-5" style={{ background: '#F0E8D5' }} aria-labelledby="devotionals-heading">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#C9A84C' }}>
              New Every Morning
            </span>
            <h2 id="devotionals-heading" className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#2D4A2D' }}>
              Devotionals
            </h2>
          </div>
          <Link
            to="/devotionals"
            className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-colors hover:opacity-70"
            style={{ color: '#2D4A2D' }}
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {devotionals.map((d) => (
            <Link
              key={d.slug}
              to={`/devotionals/${d.slug}`}
              className="group rounded-2xl border p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted no-underline"
              style={{
                background: d.dark ? '#2D4A2D' : '#FAF6EF',
                borderColor: d.dark ? '#C9A84C' : 'rgba(201,168,76,0.15)',
              }}
            >
              <div className="flex items-center gap-2">
                {d.tag && (
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full" style={{ background: '#C9A84C', color: '#1E2D1E' }}>
                    {d.tag}
                  </span>
                )}
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: d.dark ? 'rgba(250,246,239,0.5)' : '#C9A84C' }}>
                  {d.date}
                </span>
              </div>
              <h3 className="font-serif font-bold leading-snug transition-colors" style={{ color: d.dark ? '#FAF6EF' : '#2D4A2D', fontSize: '1.1rem' }}>
                {d.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: d.dark ? 'rgba(250,246,239,0.7)' : '#4A4A3A' }}>
                {d.excerpt}
              </p>
              <p
                className="text-sm italic pl-3 border-l-2"
                style={{ color: d.dark ? '#E2C97E' : '#4A6741', borderColor: '#C9A84C' }}
              >
                {d.scripture}
              </p>
              <span
                className="text-xs font-bold tracking-widest uppercase self-end"
                style={{ color: d.dark ? '#C9A84C' : '#2D4A2D' }}
              >
                Read →
              </span>
            </Link>
          ))}
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

// ── Today's Mercy callout (static) ────────────────────────
function TodaysMercy() {
  return (
    <section className="py-16 px-5" style={{ background: '#FAF6EF' }} aria-label="Today's mercy">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-2xl border p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center"
          style={{ background: '#2D4A2D', borderColor: '#C9A84C' }}
        >
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#C9A84C' }}>
              ✦ Today's Fresh Mercy
            </p>
            <h2 className="font-serif font-bold text-2xl mb-4 leading-snug" style={{ color: '#FAF6EF' }}>
              Start Your Morning Here
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(250,246,239,0.7)' }}>
              Each morning brings a new devotional rooted in scripture — written to meet you wherever
              you are. No performance required. Just you and God's Word.
            </p>
            <Button asChild variant="primary" size="lg">
              <Link to="/devotionals">Read Today's Devotional</Link>
            </Button>
          </div>
          <div
            className="rounded-xl p-6"
            style={{ background: 'rgba(250,246,239,0.07)', border: '1px solid rgba(201,168,76,0.3)' }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#C9A84C' }}>
              Morning Prayer
            </p>
            <p className="font-serif italic leading-relaxed" style={{ color: 'rgba(250,246,239,0.8)', fontSize: '0.97rem' }}>
              "Lord, this morning I receive Your mercy afresh. Let it cover every fear, every regret,
              every worry I carry. You are faithful. Great is Your faithfulness. Amen."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Pillars Strip ──────────────────────────────────────────
function PillarsStrip() {
  const pillars = [
    { num: '01', name: 'Grace Alone' },
    { num: '02', name: 'The Living Word' },
    { num: '03', name: 'Prayer & Surrender' },
    { num: '04', name: 'Authentic Community' },
    { num: '05', name: 'Daily Renewal' },
    { num: '06', name: 'Gospel Mission' },
  ]

  return (
    <section className="py-16 px-5" style={{ background: '#F0E8D5' }} aria-labelledby="pillars-strip-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#C9A84C' }}>
            What We Stand On
          </span>
          <h2 id="pillars-strip-heading" className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2D4A2D' }}>
            Our Six Pillars
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {pillars.map(({ num, name }) => (
            <Link
              key={num}
              to="/pillars"
              className="rounded-2xl border p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-card no-underline"
              style={{ background: '#FAF6EF', borderColor: 'rgba(201,168,76,0.15)' }}
            >
              <p className="font-serif font-black text-2xl mb-1" style={{ color: 'rgba(45,74,45,0.15)' }}>{num}</p>
              <p className="font-serif font-bold text-sm leading-tight" style={{ color: '#2D4A2D' }}>{name}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="md">
            <Link to="/pillars">Explore All Pillars</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// ── Community Section ──────────────────────────────────────
function CommunitySection() {
  const testimonials = [
    { text: "I came to Fresh Mercy in the darkest season of my life. The daily devotionals reminded me every morning that God had not forgotten me.", cite: "Amara T., Nairobi" },
    { text: "For the first time in years I felt like I could be honest about my struggles in a Christian space. This community is the real deal.", cite: "David O., Lagos" },
    { text: "Lam. 3:22–23 became my lifeline. Fresh Mercy helped me understand those verses in a way that genuinely changed how I wake up every day.", cite: "Grace M., London" },
  ]

  return (
    <section className="py-20 md:py-28 px-5" style={{ background: '#FAF6EF' }} aria-labelledby="community-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#C9A84C' }}>
            You Are Not Alone
          </span>
          <h2 id="community-heading" className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#2D4A2D' }}>
            Stories of Mercy
          </h2>
          <p className="mt-3 max-w-md mx-auto text-sm leading-relaxed" style={{ color: '#4A4A3A' }}>
            Real people. Real encounters with God's mercy.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {testimonials.map(({ text, cite }) => (
            <blockquote
              key={cite}
              className="rounded-2xl p-6 border-l-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-card"
              style={{ background: '#F0E8D5', borderLeftColor: '#C9A84C', borderTopColor: 'rgba(201,168,76,0.15)', borderRightColor: 'rgba(201,168,76,0.15)', borderBottomColor: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.15)', borderLeft: '3px solid #C9A84C' }}
            >
              <p className="font-serif italic leading-relaxed mb-4" style={{ color: '#2D4A2D', fontSize: '0.97rem' }}>"{text}"</p>
              <cite className="not-italic text-xs font-bold tracking-widest uppercase" style={{ color: '#C9A84C' }}>— {cite}</cite>
            </blockquote>
          ))}
        </div>
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/community">Join the Community</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// ── Newsletter CTA ─────────────────────────────────────────
function NewsletterSection() {
  return (
    <section className="py-20 md:py-28 px-5 text-center" style={{ background: '#2D4A2D' }} aria-labelledby="newsletter-heading">
      <div className="max-w-xl mx-auto">
        <Mail className="h-10 w-10 mx-auto mb-5" style={{ color: '#C9A84C' }} aria-hidden="true" />
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(201,168,76,0.8)' }}>
          Get Daily Mercy
        </span>
        <h2 id="newsletter-heading" className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#FAF6EF' }}>
          Fresh Mercy Every Morning
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(250,246,239,0.65)' }}>
          Start your day with scripture, devotional, and prayer — delivered to your inbox
          before your feet hit the floor. Free, always.
        </p>
        <NewsletterForm source="homepage-cta" variant="stacked" className="max-w-sm mx-auto" />
        <p className="text-xs mt-4" style={{ color: 'rgba(250,246,239,0.35)' }}>
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
      <Hero />
      <ScriptureBanner />
      <AboutSnapshot />
      <DevotionalPreview />
      <TodaysMercy />
      <PillarsStrip />
      <CommunitySection />
      <NewsletterSection />
    </>
  )
}
