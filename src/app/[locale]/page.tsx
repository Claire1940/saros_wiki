import { getLatestArticles } from '@/lib/getLatestArticles'
import type { ModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saros.wiki'

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  // Homepage modules are rendered as plain text blocks without internal article links.
  const moduleLinkMap: ModuleLinkMap = {}

  const homeConfig = {
    heroPrimaryUrl: 'https://www.playstation.com/en-us/games/saros/',
    heroSecondaryUrl: 'https://housemarque.com/games/saros/',
    videoId: 'OcLGdMG0L8Q',
    videoTitle: 'SAROS - Gameplay Overview Trailer | PS5 Games',
    crashCommunityUrl: 'https://discord.com/invite/housemarque',
    crashSupportUrl: 'https://www.reddit.com/r/Saros/',
    ctaCommunityUrl: 'https://discord.com/invite/housemarque',
    ctaGameUrl: 'https://store.playstation.com/en-us/product/UP9000-PPSA07632_00-SAROS00000000000',
    footerLinks: {
      discord: 'https://discord.com/invite/housemarque',
      twitter: 'https://x.com/Housemarque',
      steamCommunity: 'https://www.reddit.com/r/Saros/',
      steamStore: 'https://www.youtube.com/housemarquegames',
    },
  } as const

  const structuredData = {
    "@context": 'https://schema.org',
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": 'Saros Wiki',
        "description":
          'Track Saros release milestones, trailers, story details, combat systems, editions, and PS5 Pro features in one focused hub.',
        "image": {
          "@type": "ImageObject",
          "url": `${siteUrl}/images/hero.webp`,
          "width": 1920,
          "height": 1080,
          "caption": 'SAROS - PS5 Sci-Fi Action Shooter',
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": 'Saros Wiki',
        "alternateName": 'SAROS',
        "url": siteUrl,
        "description": 'Community resource hub for Saros release updates, trailers, story guides, and combat coverage.',
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/android-chrome-512x512.png`,
          "width": 512,
          "height": 512,
        },
        "image": {
          "@type": "ImageObject",
          "url": `${siteUrl}/images/hero.webp`,
          "width": 1920,
          "height": 1080,
          "caption": 'Saros Wiki - Official Resources',
        },
        "sameAs": [
          'https://www.playstation.com/en-us/games/saros/',
          'https://housemarque.com/games/saros/',
          'https://discord.com/invite/housemarque',
          'https://x.com/Housemarque',
          'https://www.reddit.com/r/Saros/',
          'https://www.youtube.com/housemarquegames',
        ],
      },
      {
        "@type": "VideoGame",
        "name": 'SAROS',
        "gamePlatform": ['PlayStation 5', 'PlayStation 5 Pro'],
        "applicationCategory": 'Game',
        "genre": ['Sci-Fi', 'Action', 'Third-Person Shooter'],
        "numberOfPlayers": {
          "minValue": 1,
          "maxValue": 1,
        },
        "offers": {
          "@type": "Offer",
          "price": '69.99',
          "priceCurrency": 'USD',
          "availability": 'https://schema.org/PreOrder',
          "url": 'https://www.playstation.com/en-us/games/saros/',
        },
      },
    ],
  }

  return (
    <HomePageClient
      latestArticles={latestArticles}
      moduleLinkMap={moduleLinkMap}
      locale={locale}
      homeConfig={homeConfig}
      structuredData={structuredData}
    />
  )
}
