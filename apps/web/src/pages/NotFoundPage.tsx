import { Link } from 'react-router-dom'
import { SEO } from '@/components/features/SEO'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" noIndex />
      <div className="min-h-screen bg-cream flex items-center justify-center pt-24 px-5">
        <div className="text-center max-w-lg">
          {/* Decorative */}
          <div className="font-serif font-black text-[10rem] leading-none text-forest/8 select-none mb-0" aria-hidden="true">
            404
          </div>
          <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />

          <h1 className="font-serif text-3xl text-forest mb-4">
            Even when the path changes, mercy remains.
          </h1>
          <p className="text-[#4A4A3A] leading-relaxed mb-8">
            The page you're looking for doesn't exist, but His mercies are new every morning —
            and there's still plenty here for you.
          </p>

          <blockquote className="border-l-2 border-gold pl-5 text-left mb-10 max-w-sm mx-auto">
            <p className="font-serif italic text-forest text-base leading-relaxed">
              "The LORD is my shepherd; I shall not want."
            </p>
            <cite className="text-[10px] font-bold tracking-widest uppercase text-gold not-italic">
              — Psalm 23:1
            </cite>
          </blockquote>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link to="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/devotionals">Read Today's Mercy</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
