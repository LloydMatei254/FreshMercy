import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedAt?: string
  author?: string
  noIndex?: boolean
}

const BASE_TITLE = 'Fresh Mercy'
const BASE_DESC  = 'Where Mercy Meets You — A gospel-centered community rooted in Lamentations 3:22-23.'
const BASE_URL   = import.meta.env.VITE_APP_URL ?? 'https://freshmercy.org'
const OG_IMAGE   = `${BASE_URL}/og-image.png`

export function SEO({
  title,
  description = BASE_DESC,
  image = OG_IMAGE,
  url,
  type = 'website',
  publishedAt,
  author,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} | Where Mercy Meets You`
  const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:site_name"   content="Fresh Mercy" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Article-specific */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Structured data */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context':       'https://schema.org',
            '@type':          'Article',
            headline:         fullTitle,
            description,
            image,
            url:              canonicalUrl,
            datePublished:    publishedAt,
            author:           { '@type': 'Person', name: author ?? 'Fresh Mercy' },
            publisher:        {
              '@type': 'Organization',
              name:    'Fresh Mercy',
              url:     BASE_URL,
            },
          })}
        </script>
      )}
    </Helmet>
  )
}
