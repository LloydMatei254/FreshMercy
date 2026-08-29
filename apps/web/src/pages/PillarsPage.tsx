import { SEO } from '@/components/features/SEO'

const pillars = [
  {
    number: '01',
    title: 'Grace Alone',
    scripture: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.',
    reference: 'Ephesians 2:8',
    description: 'Salvation is not earned — it is freely given. We proclaim the grace of God that appears to all people, offering redemption through Christ alone. There is no performance here, no merit system. Only the love of a Father who gave everything.',
    color: 'from-gold/20 to-gold/5',
  },
  {
    number: '02',
    title: 'The Living Word',
    scripture: 'All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.',
    reference: '2 Timothy 3:16',
    description: 'Scripture is our foundation and our daily bread. We dig into God\'s Word to be transformed, not just informed — letting it renew our minds and shape our lives. The Bible is not a rulebook; it is a love letter.',
    color: 'from-olive/20 to-olive/5',
  },
  {
    number: '03',
    title: 'Prayer & Surrender',
    scripture: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.',
    reference: 'Philippians 4:6',
    description: 'Prayer is not a last resort — it is our first response. In surrender, we find strength. In seeking Him, we are found. We believe a life rooted in consistent, honest prayer is the life that experiences the full breadth of God\'s faithfulness.',
    color: 'from-forest/20 to-forest/5',
  },
  {
    number: '04',
    title: 'Authentic Community',
    scripture: 'And let us consider how to stir up one another to love and good works, not neglecting to meet together.',
    reference: 'Hebrews 10:24–25',
    description: 'Mercy is best shared, not stored. We build honest, life-giving community where the broken are welcomed, the weary find rest, and no one walks alone. This is not a performance space — it is a family table.',
    color: 'from-gold/20 to-gold/5',
  },
  {
    number: '05',
    title: 'Daily Renewal',
    scripture: 'His mercies never come to an end; they are new every morning: great is your faithfulness.',
    reference: 'Lamentations 3:22–23',
    description: 'New morning, new mercy. We teach the rhythm of daily returning to God — through devotion, repentance, and the continual renewal of His spirit within us. Every morning is a reset. Every sunrise is an invitation.',
    color: 'from-olive/20 to-olive/5',
  },
  {
    number: '06',
    title: 'Gospel Mission',
    scripture: 'Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
    reference: 'Matthew 28:19',
    description: 'The Great Commission is not optional. We go — into our homes, our neighborhoods, and to the ends of the earth — carrying the good news of Jesus Christ. Every act of mercy we share is an act of mission.',
    color: 'from-forest/20 to-forest/5',
  },
]

export default function PillarsPage() {
  return (
    <>
      <SEO
        title="Our Pillars"
        description="The six pillars that form the foundation of Fresh Mercy: Grace Alone, The Living Word, Prayer, Community, Daily Renewal, and Gospel Mission."
        url="/pillars"
      />

      <div className="bg-forest pt-32 pb-16 px-5 text-center">
        <span className="section-label text-gold/80">What We Stand On</span>
        <h1 className="font-serif text-display-lg text-cream mt-2 mb-4">Our Pillars</h1>
        <p className="text-cream/70 max-w-xl mx-auto leading-relaxed">
          Six convictions that shape everything we do at Fresh Mercy —
          each one rooted in scripture, each one pointing to Christ.
        </p>
      </div>

      <div className="bg-cream min-h-screen py-16 px-5">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {pillars.map((pillar) => (
            <article
              key={pillar.number}
              className={`relative rounded-2xl border border-gold/15 p-8 md:p-10 bg-gradient-to-br ${pillar.color} overflow-hidden card-hover`}
              aria-labelledby={`pillar-${pillar.number}-heading`}
            >
              <div className="absolute top-6 right-8 font-serif font-black text-5xl text-forest/10 select-none" aria-hidden="true">
                {pillar.number}
              </div>
              <div className="relative">
                <h2 id={`pillar-${pillar.number}-heading`} className="font-serif text-display-sm text-forest mb-4">
                  {pillar.title}
                </h2>
                <blockquote className="border-l-2 border-gold pl-5 mb-5">
                  <p className="font-serif italic text-forest text-base leading-relaxed mb-1">
                    "{pillar.scripture}"
                  </p>
                  <cite className="text-[10px] font-bold tracking-widest uppercase text-gold not-italic">
                    — {pillar.reference}
                  </cite>
                </blockquote>
                <p className="text-[#4A4A3A] leading-relaxed max-w-2xl">
                  {pillar.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
