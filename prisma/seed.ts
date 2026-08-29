import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Fresh Mercy database…')

  // ── Admin user ─────────────────────────────────────────
  const adminEmail    = process.env.SEED_ADMIN_EMAIL    ?? 'admin@freshmercy.org'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeThisPassword123!'
  const adminName     = process.env.SEED_ADMIN_NAME     ?? 'Fresh Mercy Admin'

  const passwordHash = await argon2.hash(adminPassword)

  await prisma.user.upsert({
    where:  { email: adminEmail },
    update: {},
    create: { email: adminEmail, name: adminName, passwordHash, role: 'SUPER_ADMIN' },
  })
  console.log(`✓ Admin user: ${adminEmail}`)

  // ── Categories ─────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'mercy' },       update: {}, create: { name: 'Mercy',       slug: 'mercy',       color: '#C9A84C' } }),
    prisma.category.upsert({ where: { slug: 'grace' },       update: {}, create: { name: 'Grace',       slug: 'grace',       color: '#4A6741' } }),
    prisma.category.upsert({ where: { slug: 'prayer' },      update: {}, create: { name: 'Prayer',      slug: 'prayer',      color: '#2D4A2D' } }),
    prisma.category.upsert({ where: { slug: 'restoration' }, update: {}, create: { name: 'Restoration', slug: 'restoration', color: '#C9A84C' } }),
    prisma.category.upsert({ where: { slug: 'faith' },       update: {}, create: { name: 'Faith',       slug: 'faith',       color: '#4A6741' } }),
  ])
  console.log('✓ Categories seeded')

  // ── Tags ────────────────────────────────────────────────
  const tags = await Promise.all([
    prisma.tag.upsert({ where: { slug: 'lamentations' }, update: {}, create: { name: 'Lamentations', slug: 'lamentations' } }),
    prisma.tag.upsert({ where: { slug: 'psalms' },       update: {}, create: { name: 'Psalms',       slug: 'psalms' } }),
    prisma.tag.upsert({ where: { slug: 'morning' },      update: {}, create: { name: 'Morning',      slug: 'morning' } }),
    prisma.tag.upsert({ where: { slug: 'hope' },         update: {}, create: { name: 'Hope',         slug: 'hope' } }),
  ])
  console.log('✓ Tags seeded')

  // ── Sample devotionals ──────────────────────────────────
  const devotionals = [
    {
      title:              'Running Toward the Prodigal',
      slug:               'running-toward-the-prodigal',
      excerpt:            'Before he could finish his rehearsed apology, the father was already running. That is the picture of our God.',
      content:            `<p>There is a moment in Luke 15 that changes everything. The son has prepared his speech, rehearsed his words: <em>"I am no longer worthy to be called your son; make me like one of your hired servants."</em> Humbled, broken, returning not in triumph but in desperation.</p>

<p>But before he can even begin — while he is still <em>a long way off</em> — the father sees him. And the father runs.</p>

<p>This detail is not incidental. In the ancient Near East, a man of position did not run. Running meant lifting your robes, exposing your legs — it was undignified. The father's running was itself a statement: <strong>I am willing to be undignified for the sake of you coming home.</strong></p>

<p>God is not waiting behind a desk, reviewing your record before deciding whether to let you back in. He is at the window. He is looking down the road. And the moment He sees even the distant outline of you turning toward home — He runs.</p>

<p>You don't need a perfect speech. You don't need to clean yourself up first. The mercy runs toward you before your words are even formed.</p>

<p>Whatever road you are walking back from today — know that the Father is already moving toward you. His arms are already open. His mercy runs faster than your shame.</p>`,
      scripture:          'But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him.',
      scriptureReference: 'Luke 15:20',
      prayer:             'Father, I am still a long way off. But I am turning toward You today. Thank You that You do not wait for me to arrive — You run to meet me. Receive me, not because I am worthy, but because You are merciful. Amen.',
      reflectionQuestions: [
        'What does the father\'s running tell you about the nature of God\'s love?',
        'Is there something you have been waiting to "clean up" before returning to God? What would it look like to simply start walking back?',
        'How does this parable change the way you see your own failures and God\'s response to them?',
      ],
      author:             'Fresh Mercy',
      status:             'PUBLISHED' as const,
      publishedAt:        new Date(),
      readingTimeMinutes: 4,
      categories:         { connect: [{ slug: 'mercy' }, { slug: 'grace' }] },
      tags:               { connect: [{ slug: 'morning' }, { slug: 'hope' }] },
    },
    {
      title:              'His Mercies Are Not Exhausted',
      slug:               'his-mercies-are-not-exhausted',
      excerpt:            'The Hebrew word for mercies in Lamentations is rahamim — compassion rooted in deep, tender love. They cannot run dry.',
      content:            `<p>The book of Lamentations is one of the most raw books in all of scripture. It is a collection of grief poems written in the aftermath of Jerusalem's destruction. The city is in ruins. The temple has been burned. The people are in exile.</p>

<p>And yet — right in the middle of this devastation — the writer pauses. Breathes. And says something extraordinary:</p>

<blockquote>"It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness." — Lamentations 3:22–23</blockquote>

<p>The Hebrew word used here for "mercies" is <em>chesed</em> — the covenant love of God. Steadfast. Unwavering. Not based on our performance. And the word for "compassions" is <em>rahamim</em> — a word rooted in the Hebrew word for "womb," suggesting a deep, tender, maternal love.</p>

<p>This is the love that does not exhaust. This is the mercy that does not run out. Not because we are loveable, but because He is love itself.</p>

<p>Today, you may feel like you have used up your portion of grace. Like surely God must be tired of your patterns, your failures, your repeated returns to the same struggles. But the writer of Lamentations — sitting in the ruins of everything — declares: <strong>His compassions fail not.</strong></p>

<p>They are new every morning. Not recycled. Not reluctantly renewed. New. Fresh. Waiting for you when you open your eyes.</p>`,
      scripture:          'It is of the LORD\'s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.',
      scriptureReference: 'Lamentations 3:22–23 (KJV)',
      prayer:             'Lord, I receive Your mercy today — not because I have earned it, but because You are faithful. Let me not be consumed by shame or fear, but renewed by the fresh compassion You place before me this morning. Great is Your faithfulness. Amen.',
      reflectionQuestions: [
        'What does it mean to you that God\'s mercies are "new every morning" — not just available, but fresh?',
        'Are there areas where you have been acting as if your supply of grace has run out?',
      ],
      author:             'Fresh Mercy',
      status:             'PUBLISHED' as const,
      publishedAt:        new Date(Date.now() - 86400000),
      readingTimeMinutes: 5,
      categories:         { connect: [{ slug: 'mercy' }, { slug: 'faith' }] },
      tags:               { connect: [{ slug: 'lamentations' }, { slug: 'morning' }] },
    },
    {
      title:              'Great Is Thy Faithfulness',
      slug:               'great-is-thy-faithfulness',
      excerpt:            'When Thomas Chisholm penned those words, he was reflecting on a lifetime of ordinary days where God showed up.',
      content:            `<p>Thomas Chisholm was not writing from a mountaintop experience. He was an ordinary man — often ill, never wealthy, serving God in the margins of history. And yet in 1923, he wrote words that would become one of the most beloved hymns in Christian history:</p>

<blockquote>"Great is Thy faithfulness, O God my Father, There is no shadow of turning with Thee; Thou changest not, Thy compassions, they fail not; As Thou hast been, Thou forever will be."</blockquote>

<p>What makes these words extraordinary is what they are not. They are not written from abundance. They are not the overflow of an easy life. They are the quiet testimony of a man who looked back across ordinary days — sick days, hard days, days of unanswered questions — and saw that God had been present in all of them.</p>

<p>Faithfulness is not always dramatic. Often it looks like bread on the table when you didn't know how it would get there. Peace in a situation that had no business being peaceful. A door that opened when all the other ones were closed.</p>

<p>God's faithfulness is not measured in spectacular moments alone — it is woven into the ordinary fabric of your life. The consistency of His character is the ground you stand on when everything else shifts.</p>

<p>Look back today. Count the ordinary mercies. They are more numerous than you have noticed.</p>`,
      scripture:          'Great is your faithfulness.',
      scriptureReference: 'Lamentations 3:23',
      prayer:             'God, help me see Your faithfulness in the ordinary — in the places I have walked through without noticing Your hand. You have been there in every season. You are here now. Great is Your faithfulness. Amen.',
      reflectionQuestions: [
        'When you look back at your life, where do you see evidence of God\'s quiet, ordinary faithfulness?',
        'How does knowing that God "changest not" affect the way you approach uncertainty today?',
      ],
      author:             'Fresh Mercy',
      status:             'PUBLISHED' as const,
      publishedAt:        new Date(Date.now() - 172800000),
      readingTimeMinutes: 4,
      categories:         { connect: [{ slug: 'faith' }, { slug: 'mercy' }] },
      tags:               { connect: [{ slug: 'lamentations' }, { slug: 'hope' }] },
    },
  ]

  for (const d of devotionals) {
    await prisma.devotional.upsert({
      where:  { slug: d.slug },
      update: {},
      create: d,
    })
    console.log(`✓ Devotional: "${d.title}"`)
  }

  // ── Sample stories ──────────────────────────────────────
  const stories = [
    {
      name:     'Amara T.',
      location: 'Nairobi, Kenya',
      story:    'I came to Fresh Mercy in the darkest season of my life. The daily devotionals reminded me every morning that God had not forgotten me. Lamentations 3:22 became my anchor.',
      approved: true,
      featured: true,
    },
    {
      name:     'David O.',
      location: 'Lagos, Nigeria',
      story:    'For the first time in years I felt like I could be honest about my struggles in a Christian space. This community is the real deal — no performance, just grace.',
      approved: true,
      featured: false,
    },
    {
      name:     'Grace M.',
      location: 'London, UK',
      story:    'Lam. 3:22-23 became my lifeline. Fresh Mercy helped me understand those verses in a way that genuinely changed how I wake up every day.',
      approved: true,
      featured: false,
    },
  ]

  for (const s of stories) {
    await prisma.story.upsert({
      where:  { id: `seed-${s.name.replace(/[^a-z]/gi, '').toLowerCase()}` },
      update: {},
      create: s,
    }).catch(() => prisma.story.create({ data: s }))
    console.log(`✓ Story: ${s.name}`)
  }

  console.log('\n✅ Seed complete! Fresh Mercy is ready.')
  console.log(`\n📧 Admin email: ${adminEmail}`)
  console.log(`🔑 Admin password: ${adminPassword}`)
  console.log('⚠️  Change the admin password immediately after first login!\n')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
