import { SEO } from '@/components/features/SEO'

export default function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy" url="/privacy" noIndex />
      <div className="bg-forest pt-16 pb-16 px-5 text-center">
        <h1 className="font-serif text-display-lg text-cream mb-2">Privacy Policy</h1>
        <p className="text-cream/60 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="bg-cream min-h-screen py-16 px-5">
        <div className="max-w-3xl mx-auto prose-mercy">
          <p className="text-xs font-bold tracking-widest uppercase text-gold border border-gold/30 bg-gold/5 rounded-xl px-4 py-3 mb-8">
            ⚠️ This is a placeholder privacy policy. Have this reviewed by a qualified legal professional before publishing to the public.
          </p>

          <h2>1. Information We Collect</h2>
          <p>When you use Fresh Mercy, we may collect the following information:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1 text-[#4A4A3A] text-sm mb-4">
            <li>Email address (when you subscribe to the newsletter or contact us)</li>
            <li>Name (optional, when submitted with contact or prayer forms)</li>
            <li>Prayer requests (kept strictly confidential)</li>
            <li>Contact messages</li>
            <li>Usage data (pages visited, time on site — analytics only if enabled)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information only to:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1 text-[#4A4A3A] text-sm mb-4">
            <li>Send you daily devotionals and newsletters (if subscribed)</li>
            <li>Respond to your messages and prayer requests</li>
            <li>Improve the ministry platform</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>We do <strong>not</strong> sell, rent, or trade your personal information with third parties.</p>

          <h2>3. Prayer Requests</h2>
          <p>Prayer requests are treated with the highest level of confidentiality. They are accessible only to authorized Fresh Mercy team members for the sole purpose of prayer. They are never published, shared, or used for any other purpose.</p>

          <h2>4. Newsletter & Email</h2>
          <p>By subscribing to our newsletter, you consent to receiving devotional emails from Fresh Mercy. You may unsubscribe at any time by clicking the unsubscribe link in any email, or by contacting us directly.</p>

          <h2>5. Data Storage & Security</h2>
          <p>Your data is stored securely on managed servers. We use industry-standard security practices including encrypted connections (HTTPS), hashed passwords, and restricted data access. No system is 100% secure; we will notify you of any breach affecting your data as required by law.</p>

          <h2>6. Cookies</h2>
          <p>We use only functional cookies necessary for the website to operate. We do not use advertising or tracking cookies without your consent. Analytics, if enabled, uses privacy-respecting tooling.</p>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 flex flex-col gap-1 text-[#4A4A3A] text-sm mb-4">
            <li>Access the personal information we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Unsubscribe from any communications at any time</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href="mailto:lloydmatei@gmail.com" className="text-gold hover:underline">lloydmatei@gmail.com</a>.</p>

          <h2>8. Contact</h2>
          <p>For any questions about this Privacy Policy, contact us at <a href="mailto:lloydmatei@gmail.com" className="text-gold hover:underline">lloydmatei@gmail.com</a>.</p>
        </div>
      </div>
    </>
  )
}
