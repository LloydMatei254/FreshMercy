import { Link } from 'react-router-dom'
import { BookOpen, Heart, Users, Mail } from 'lucide-react'
import { SEO } from '@/components/features/SEO'
import { Button } from '@/components/ui/Button'

const resources = [
  {
    icon: <BookOpen className="h-7 w-7" />,
    title: 'Daily Devotionals',
    desc: 'A growing library of scripture-rooted devotionals covering every season of life and faith.',
    cta: { label: 'Browse Devotionals', to: '/devotionals' },
  },
  {
    icon: <Heart className="h-7 w-7" />,
    title: 'Prayer Resources',
    desc: 'Submit your prayer requests and access scripture-based prayers for specific needs — anxiety, grief, restoration, and more.',
    cta: { label: 'Prayer Page', to: '/prayer' },
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: 'Community',
    desc: 'Connect with others in the Fresh Mercy community — through Bible studies, prayer circles, and gospel conversations.',
    cta: { label: 'Join Community', to: '/community' },
  },
  {
    icon: <Mail className="h-7 w-7" />,
    title: 'Morning Mercy Newsletter',
    desc: 'Get a fresh devotional, scripture, and prayer delivered to your inbox every morning before the day begins.',
    cta: { label: 'Subscribe Free', to: '/devotionals' },
  },
]

const scriptures = [
  { text: 'Your word is a lamp to my feet and a light to my path.', ref: 'Psalm 119:105' },
  { text: 'The unfolding of your words gives light; it imparts understanding to the simple.', ref: 'Psalm 119:130' },
  { text: 'Man shall not live by bread alone, but by every word that comes from the mouth of God.', ref: 'Matthew 4:4' },
  { text: 'Faith comes from hearing, and hearing through the word of Christ.', ref: 'Romans 10:17' },
]

export default function ResourcesPage() {
  return (
    <>
      <SEO
        title="Resources"
        description="Gospel resources from Fresh Mercy — devotionals, prayer guides, community, and the daily mercy newsletter."
        url="/resources"
      />

      <div className="bg-forest pt-32 pb-16 px-5 text-center">
        <span className="section-label text-gold/80">Tools for the Journey</span>
        <h1 className="font-serif text-display-lg text-cream mt-2 mb-4">Resources</h1>
        <p className="text-cream/70 max-w-xl mx-auto leading-relaxed">
          Everything here is designed to help you stay rooted in God's Word,
          connected to His people, and anchored in His mercy — day by day.
        </p>
      </div>

      <div className="bg-cream">
        {/* Resources grid */}
        <section className="section-padding max-w-7xl mx-auto px-5" aria-labelledby="resources-heading">
          <h2 id="resources-heading" className="sr-only">Available Resources</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {resources.map(({ icon, title, desc, cta }) => (
              <div
                key={title}
                className="bg-parchment rounded-2xl border border-gold/15 p-8 flex flex-col gap-5 card-hover"
              >
                <div className="text-gold bg-gold/10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold text-forest mb-3">{title}</h3>
                  <p className="text-[#4A4A3A] leading-relaxed text-sm">{desc}</p>
                </div>
                <Button asChild variant="primary" size="md">
                  <Link to={cta.to}>{cta.label}</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Scripture on God's Word */}
        <section className="bg-parchment section-padding px-5" aria-labelledby="word-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-label">The Power of Scripture</span>
              <h2 id="word-heading" className="font-serif text-display-md text-forest mt-2">
                What God Says About His Word
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {scriptures.map(({ text, ref }) => (
                <blockquote
                  key={ref}
                  className="bg-cream rounded-2xl border border-gold/15 p-6 border-l-2 border-l-gold"
                >
                  <p className="font-serif italic text-forest text-base leading-relaxed mb-2">"{text}"</p>
                  <cite className="text-[10px] font-bold tracking-widest uppercase text-gold not-italic">— {ref}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
