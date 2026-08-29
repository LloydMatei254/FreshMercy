import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  url?: string         // accepted but unused (canonical set in index.html)
  type?: string        // accepted but unused
  publishedAt?: string // accepted but unused
  author?: string      // accepted but unused
  image?: string       // accepted but unused
  noIndex?: boolean
}

const BASE_TITLE = 'Fresh Mercy'
const BASE_DESC  = 'Where Mercy Meets You — A gospel-centered community rooted in Lamentations 3:22-23.'

export function SEO({ title, description = BASE_DESC, noIndex = false }: SEOProps) {
  const fullTitle = title
    ? `${title} | ${BASE_TITLE}`
    : `${BASE_TITLE} | Where Mercy Meets You`

  useEffect(() => {
    document.title = fullTitle

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', description)

    if (noIndex) {
      let metaRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
      if (!metaRobots) {
        metaRobots = document.createElement('meta')
        metaRobots.setAttribute('name', 'robots')
        document.head.appendChild(metaRobots)
      }
      metaRobots.setAttribute('content', 'noindex, nofollow')
    }
  }, [fullTitle, description, noIndex])

  return null
}
