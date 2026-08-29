import { Link } from 'react-router-dom'
import { Instagram, Youtube, Facebook } from 'lucide-react'
import { useState } from 'react'
import { newsletterService } from '@/services/newsletter.service'

const footerNav = {
  Ministry: [
    { label: 'About', to: '/about' },
    { label: 'Pillars', to: '/pillars' },
    { label: 'Resources', to: '/resources' },
    { label: 'Community', to: '/community' },
  ],
  Devotionals: [
    { label: 'All Devotionals', to: '/devotionals' },
    { label: "Today's Mercy",   to: '/devotionals/today' },
    { label: 'Search',          to: '/search' },
  ],
  Connect: [
    { label: 'Prayer',   to: '/prayer' },
    { label: 'Contact',  to: '/contact' },
    { label: 'Community',to: '/community' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Use',   to: '/terms' },
  ],
}

const socialLinks = [
  {
    label: 'Instagram',
    icon: <Instagram className="h-5 w-5" />,
    href: import.meta.env.VITE_INSTAGRAM_URL || null,
  },
  {
    label: 'YouTube',
    icon: <Youtube className="h-5 w-5" />,
    href: import.meta.env.VITE_YOUTUBE_URL || null,
  },
  {
    label: 'Facebook',
    icon: <Facebook className="h-5 w-5" />,
    href: import.meta.env.VITE_FACEBOOK_URL || null,
  },
]

export function Footer() {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const year = new Date().getFullYear()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await newsletterService.subscribe(email, 'footer')
      if (res.success) {
        setStatus('success')
        setMessage('You are subscribed! Fresh mercy every morning.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Unable to subscribe right now. Please try again.')
    }
  }

  return (
    <footer className="bg-forest text-cream/80" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-baseline gap-1 mb-4">
              <span className="font-serif font-black text-2xl tracking-widest text-cream">FRESH</span>
              <span className="font-script italic text-3xl text-gold leading-none">Mercy</span>
            </Link>
            <p className="text-xs tracking-[0.2em] uppercase text-cream/50 mb-4">
              — Where Mercy Meets You —
            </p>
            <p className="text-sm leading-relaxed text-cream/70 max-w-xs mb-6">
              A gospel-centered ministry rooted in the truth that God's mercies are new every morning.
              Lamentations 3:22–23.
            </p>
            {/* Social */}
            <div className="flex gap-4" aria-label="Social media links">
              {socialLinks
                .filter((s) => s.href)
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Fresh Mercy on ${s.label}`}
                    className="text-cream/50 hover:text-gold transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
            </div>
          </div>

          {/* Nav groups */}
          {Object.entries(footerNav).map(([group, links]) => (
            <div key={group}>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-4">
                {group}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-cream/60 hover:text-cream transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="border-t border-cream/10 pt-10 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <p className="font-serif text-lg text-cream mb-1">
                Get Fresh Mercy Every Morning
              </p>
              <p className="text-sm text-cream/60">
                Daily devotionals delivered straight to your inbox.
              </p>
            </div>
            {status === 'success' ? (
              <p className="text-sm text-gold bg-gold/10 border border-gold/20 px-5 py-3 rounded-xl">
                ✦ {message}
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2 w-full md:w-auto"
                aria-label="Footer newsletter signup"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 min-w-[220px] rounded-xl bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-gold text-forest font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-xl hover:bg-gold-500 transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? '…' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
          {status === 'error' && (
            <p className="text-xs text-red-400 mt-2">{message}</p>
          )}
        </div>

        {/* Bottom row */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© {year} Fresh Mercy. All rights reserved. Built on grace.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-cream/70 transition-colors">Privacy</Link>
            <Link to="/terms"   className="hover:text-cream/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
