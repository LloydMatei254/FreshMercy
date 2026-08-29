import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const navItems = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Devotionals',to: '/devotionals' },
  { label: 'Pillars',    to: '/pillars' },
  { label: 'Prayer',     to: '/prayer' },
  { label: 'Community',  to: '/community' },
  { label: 'Resources',  to: '/resources' },
  { label: 'Contact',    to: '/contact' },
]

export function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const { pathname } = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isHero = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isHero
          ? 'bg-cream/97 backdrop-blur-sm shadow-soft py-3'
          : 'bg-transparent py-5',
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-baseline gap-1 focus-visible:ring-gold"
          aria-label="Fresh Mercy Home"
        >
          <span
            className={cn(
              'font-serif font-black text-xl tracking-widest',
              scrolled || !isHero ? 'text-forest' : 'text-cream',
            )}
          >
            FRESH
          </span>
          <span
            className={cn(
              'font-script italic font-semibold text-2xl leading-none',
              'text-gold',
            )}
          >
            Mercy
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase rounded-full transition-colors duration-200',
                  isActive
                    ? 'text-gold'
                    : scrolled || !isHero
                    ? 'text-forest hover:text-gold'
                    : 'text-cream/80 hover:text-cream',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/search"
            aria-label="Search devotionals"
            className={cn(
              'p-2 rounded-full transition-colors',
              scrolled || !isHero
                ? 'text-forest hover:text-gold'
                : 'text-cream/80 hover:text-cream',
            )}
          >
            <Search className="h-4 w-4" />
          </Link>
          <Button asChild size="md" variant="primary">
            <Link to="/devotionals">Get Daily Mercy</Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/search"
            aria-label="Search"
            className={scrolled || !isHero ? 'text-forest' : 'text-cream'}
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className={cn(
              'p-2 rounded-full transition-colors',
              scrolled || !isHero ? 'text-forest' : 'text-cream',
            )}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!isOpen}
        className={cn(
          'lg:hidden fixed inset-0 top-[60px] z-40 bg-cream transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col h-full overflow-y-auto px-6 pt-6 pb-10 gap-1"
        >
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'px-4 py-3.5 text-sm font-bold tracking-wider uppercase rounded-xl transition-colors duration-150 border-b border-gold/10',
                  isActive ? 'text-gold bg-gold/5' : 'text-forest hover:text-gold hover:bg-gold/5',
                )
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="mt-6 pt-6 border-t border-gold/20 flex flex-col gap-3">
            <Button asChild size="lg" variant="primary" className="w-full">
              <Link to="/devotionals">Get Daily Mercy</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link to="/prayer">Submit Prayer Request</Link>
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[60px] z-30 bg-forest/40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
