import { SEO } from '@/components/features/SEO'

export default function TermsPage() {
  return (
    <>
      <SEO title="Terms of Use" url="/terms" noIndex />
      <div className="bg-forest pt-32 pb-16 px-5 text-center">
        <h1 className="font-serif text-display-lg text-cream mb-2">Terms of Use</h1>
        <p className="text-cream/60 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="bg-cream min-h-screen py-16 px-5">
        <div className="max-w-3xl mx-auto prose-mercy">
          <p className="text-xs font-bold tracking-widest uppercase text-gold border border-gold/30 bg-gold/5 rounded-xl px-4 py-3 mb-8">
            ⚠️ Placeholder terms — have reviewed by legal counsel before public deployment.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the Fresh Mercy website, you agree to these Terms of Use. If you do not agree, please do not use the site.</p>

          <h2>2. Use of Content</h2>
          <p>All devotional content, scripture reflections, prayers, and written materials on Fresh Mercy are provided for personal, non-commercial spiritual use. You may share content with proper attribution to Fresh Mercy. You may not reproduce, republish, or sell content without written permission.</p>

          <h2>3. Scripture</h2>
          <p>Scripture quotations are used in accordance with the permissions granted by their respective publishers. All rights reserved to original copyright holders.</p>

          <h2>4. User Conduct</h2>
          <p>When using any interactive feature (contact forms, prayer forms, newsletter), you agree not to submit content that is harmful, abusive, threatening, or illegal. We reserve the right to remove any submitted content that violates these standards.</p>

          <h2>5. Privacy</h2>
          <p>Your use of the website is also governed by our <a href="/privacy" className="text-gold hover:underline">Privacy Policy</a>.</p>

          <h2>6. Disclaimer</h2>
          <p>Fresh Mercy provides spiritual and devotional content for general encouragement. This content does not constitute professional counseling, medical advice, or legal advice. For serious personal, mental health, or legal matters, please seek qualified professional help.</p>

          <h2>7. Availability</h2>
          <p>We strive to keep the website available at all times but cannot guarantee uninterrupted access. We may modify, suspend, or discontinue any part of the site without notice.</p>

          <h2>8. Changes to Terms</h2>
          <p>We may update these Terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>

          <h2>9. Contact</h2>
          <p>Questions about these Terms? Email <a href="mailto:hello@freshmercy.org" className="text-gold hover:underline">hello@freshmercy.org</a>.</p>
        </div>
      </div>
    </>
  )
}
