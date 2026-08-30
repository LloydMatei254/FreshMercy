import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MessageCircle, Users, Music, BookOpen, Star } from 'lucide-react'
import { SEO } from '@/components/features/SEO'
import { Button } from '@/components/ui/Button'
import { NewsletterForm } from '@/components/features/NewsletterForm'
import { storyService } from '@/services/story.service'

const features = [
  {
    icon: <BookOpen className="h-7 w-7" />,
    title: 'Bible Studies',
    desc: 'Weekly deep-dives into scripture — live and recorded — for every season of faith. Come hungry, leave full.',
  },
  {
    icon: <MessageCircle className="h-7 w-7" />,
    title: 'Prayer Circle',
    desc: 'Submit your prayer requests. Our team prays over every single one. You are seen and covered.',
    cta: { label: 'Submit a Request', to: '/prayer' },
  },
  {
    icon: <Music className="h-7 w-7" />,
    title: 'Worship & Reflection',
    desc: 'Curated worship playlists and guided reflection times to draw your heart into His presence.',
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: 'Gospel Conversations',
    desc: 'Honest, grace-filled discussions on faith, doubt, life, and the beauty of the gospel. Bring your questions.',
  },
]

const whatsappUrl  = import.meta.env.VITE_WHATSAPP_COMMUNITY_URL  || null
const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL           || null
const discordUrl   = import.meta.env.VITE_DISCORD_URL             || null
const telegramUrl  = import.meta.env.VITE_TELEGRAM_URL            || null

export default function CommunityPage() {
  const { data: storiesData } = useQuery({
    queryKey: ['stories'],
    queryFn:  storyService.getApproved,
  })

  const stories = storiesData?.data ?? []

  return (
    <>
      <SEO
        title="Community"
        description="Join the Fresh Mercy community — Bible studies, prayer circles, worship, and gospel conversations. You are not alone."
        url="/community"
      />

      {/* Header */}
      <div className="bg-forest pt-16 pb-16 px-5 text-center">
        <span className="section-label text-gold/80">You Are Not Alone</span>
        <h1 className="font-serif text-display-lg text-cream mt-2 mb-4">
          Join the Community
        </h1>
        <p className="text-cream/70 max-w-xl mx-auto leading-relaxed">
          Fresh Mercy is more than a website — it is a gathering of souls hungry for God.
          Come as you are. Leave knowing you are loved.
        </p>
        <div className="flex justify-center gap-3 mt-8 flex-wrap">
          {whatsappUrl && (
            <Button asChild variant="primary" size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Join WhatsApp Community
              </a>
            </Button>
          )}
          {discordUrl && (
            <Button asChild variant="outline-light" size="lg">
              <a href={discordUrl} target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </Button>
          )}
          {!whatsappUrl && !discordUrl && (
            <Button asChild variant="primary" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="bg-cream">

        {/* Features grid */}
        <section className="section-padding max-w-7xl mx-auto px-5" aria-labelledby="features-heading">
          <div className="text-center mb-12">
            <span className="section-label">What We Offer</span>
            <h2 id="features-heading" className="font-serif text-display-md text-forest mt-2">
              Ways to Connect
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon, title, desc, cta }) => (
              <div
                key={title}
                className="bg-parchment rounded-2xl border border-gold/15 p-6 flex flex-col gap-4 card-hover"
              >
                <div className="text-gold bg-gold/10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" aria-hidden="true">
                  {icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-forest mb-2">{title}</h3>
                  <p className="text-sm text-[#4A4A3A] leading-relaxed">{desc}</p>
                </div>
                {cta && (
                  <Button asChild variant="outline" size="sm">
                    <Link to={cta.to}>{cta.label}</Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Stories of Mercy */}
        {stories.length > 0 && (
          <section className="bg-parchment section-padding px-5" aria-labelledby="stories-heading">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Community</span>
                <h2 id="stories-heading" className="font-serif text-display-md text-forest mt-2">
                  Stories of Mercy
                </h2>
                <p className="text-[#4A4A3A] mt-3 max-w-lg mx-auto text-sm leading-relaxed">
                  Real people. Real encounters with God's mercy.
                  These are not polished testimonies — they are honest ones.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {stories.slice(0, 3).map((story) => (
                  <blockquote
                    key={story.id}
                    className="bg-cream rounded-2xl border border-gold/15 p-6 flex flex-col gap-4 card-hover"
                  >
                    <Star className="h-5 w-5 text-gold" aria-hidden="true" />
                    <p className="font-serif italic text-forest text-base leading-relaxed flex-1">
                      "{story.story.slice(0, 220)}{story.story.length > 220 ? '…' : ''}"
                    </p>
                    <footer>
                      <cite className="not-italic font-bold text-sm text-forest block">
                        {story.name}
                      </cite>
                      {story.location && (
                        <span className="text-xs text-[#7A7A6A]">{story.location}</span>
                      )}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Social links */}
        <section className="section-padding max-w-3xl mx-auto px-5 text-center" aria-labelledby="social-heading">
          <span className="section-label">Follow Along</span>
          <h2 id="social-heading" className="font-serif text-display-md text-forest mt-2 mb-4">
            Stay Connected
          </h2>
          <p className="text-[#4A4A3A] leading-relaxed mb-8">
            Follow Fresh Mercy on social media for daily scripture, encouragement, and updates.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-opacity"
              >
                Instagram
              </a>
            )}
            {telegramUrl && (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#229ED9] text-white text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-opacity"
              >
                Telegram
              </a>
            )}
            {!instagramUrl && !telegramUrl && (
              <p className="text-sm text-[#7A7A6A]">
                Social links coming soon —{' '}
                <Link to="/contact" className="text-gold hover:underline">contact us</Link> to stay in the loop.
              </p>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-forest section-padding px-5">
          <div className="max-w-xl mx-auto text-center">
            <span className="section-label text-gold/80">Stay Rooted</span>
            <h2 className="font-serif text-display-md text-cream mt-2 mb-3">
              Get Daily Mercy in Your Inbox
            </h2>
            <p className="text-cream/60 text-sm mb-8">
              Start every morning with scripture, devotional, and prayer — wherever you are.
            </p>
            <NewsletterForm source="community-page" variant="stacked" className="max-w-sm mx-auto" />
          </div>
        </section>

      </div>
    </>
  )
}
