import { Link } from 'react-router-dom'
import { SEO } from '@/components/features/SEO'
import { Button } from '@/components/ui/Button'

const beliefs = [
  { title: 'The Bible', desc: 'We believe the Scriptures are the inspired, authoritative Word of God — our ultimate guide for faith and life.' },
  { title: 'Salvation by Grace', desc: 'We believe salvation is by grace alone, through faith alone, in Christ alone. Nothing added, nothing taken away.' },
  { title: 'The Resurrection', desc: 'We believe in the bodily resurrection of Jesus Christ — the foundation of every hope we hold.' },
  { title: 'The Holy Spirit', desc: 'We believe the Holy Spirit indwells and empowers every believer, producing transformation from the inside out.' },
  { title: 'Prayer', desc: 'We believe prayer is not a last resort but a first response — the lifeblood of our relationship with God.' },
  { title: 'Community', desc: "We believe God's people are meant to do life together — honestly, vulnerably, and with grace." },
]

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description="Learn about Fresh Mercy — who we are, what we believe, our mission and vision."
        url="/about"
      />

      <div className="bg-forest pt-16 pb-16 px-5 text-center">
        <span className="section-label text-gold/80">Our Story</span>
        <h1 className="font-serif text-display-lg text-cream mt-2 mb-4">About Fresh Mercy</h1>
        <p className="text-cream/70 max-w-xl mx-auto leading-relaxed">
          A gospel-centered community built on one foundational truth —
          God's mercy is renewed every single morning.
        </p>
      </div>

      <div className="bg-cream">
        {/* Mission & Vision */}
        <section className="section-padding max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="section-label">Our Mission</span>
              <h2 className="font-serif text-display-sm text-forest mt-2 mb-4">
                Point Every Weary Heart to God
              </h2>
              <p className="text-[#4A4A3A] leading-relaxed mb-4">
                Fresh Mercy exists to proclaim the gospel of Jesus Christ in a way that is accessible,
                honest, and deeply human. We believe the church's most urgent task is not to impress people
                but to introduce them to the God who runs toward the broken.
              </p>
              <p className="text-[#4A4A3A] leading-relaxed">
                Through devotionals, prayer, community, and consistent teaching of God's Word,
                we walk alongside people in every season — celebrating victories, sitting in grief,
                and always pointing back to the source of every mercy.
              </p>
            </div>
            <div>
              <span className="section-label">Our Vision</span>
              <h2 className="font-serif text-display-sm text-forest mt-2 mb-4">
                A World Where Mercy Is Received, Not Just Known
              </h2>
              <p className="text-[#4A4A3A] leading-relaxed mb-4">
                Many people know about God's mercy intellectually. Our vision is a world where
                that knowledge becomes lived experience — where the weary find rest, the broken find
                wholeness, and the lost find home.
              </p>
              <p className="text-[#4A4A3A] leading-relaxed">
                We envision a global community of believers who start every morning anchored in
                God's faithfulness — and who carry that mercy into the world.
              </p>
            </div>
          </div>
        </section>

        {/* Scripture foundation */}
        <section className="bg-forest py-16 px-5 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="section-label text-gold/80">Our Foundation</span>
            <blockquote className="mt-4">
              <p className="font-serif italic text-parchment text-xl md:text-2xl leading-relaxed mb-4">
                "The steadfast love of the LORD never ceases; his mercies never come to an end;
                they are new every morning; great is your faithfulness."
              </p>
              <cite className="text-[11px] font-bold tracking-widest uppercase text-gold not-italic">
                — Lamentations 3:22–23 (ESV)
              </cite>
            </blockquote>
          </div>
        </section>

        {/* What We Believe */}
        <section className="section-padding max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="section-label">Theology</span>
            <h2 className="font-serif text-display-md text-forest mt-2">What We Believe</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map(({ title, desc }) => (
              <div
                key={title}
                className="bg-parchment rounded-2xl border border-gold/15 p-6 hover:border-gold/30 transition-colors card-hover"
              >
                <div className="w-8 h-0.5 bg-gold mb-4" aria-hidden="true" />
                <h3 className="font-serif text-lg font-bold text-forest mb-2">{title}</h3>
                <p className="text-sm text-[#4A4A3A] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who We Serve */}
        <section className="bg-parchment section-padding px-5">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-label">Who We Serve</span>
            <h2 className="font-serif text-display-md text-forest mt-2 mb-6">
              Everyone Who Needs Mercy
            </h2>
            <p className="text-[#4A4A3A] leading-relaxed mb-4">
              We serve the person who grew up in church but lost their way.
              The skeptic who wonders if faith is real. The grieving parent.
              The exhausted caregiver. The student wrestling with purpose.
            </p>
            <p className="text-[#4A4A3A] leading-relaxed mb-8">
              If you have ever felt like mercy was for everyone else but you —
              Fresh Mercy was built for you.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild variant="primary" size="lg">
                <Link to="/devotionals">Read a Devotional</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/prayer">Submit a Prayer Request</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
