// src/app/feed.xml/route.ts
import { getPayloadClient } from '@/lib/payload'
import { Feed } from 'feed'
import type { ResolvedArticle } from '@/types/resolved'

const BASE_URL = 'https://ignorami.com'

export async function GET() {
  const payload = await getPayloadClient()

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 20,
    depth: 2,
  })

  const feed = new Feed({
    title: 'Ignorami',
    description: 'Journalism, but worse.',
    id: BASE_URL,
    link: BASE_URL,
    language: 'en',
    favicon: `${BASE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Ignorami`,
    feedLinks: {
      rss: `${BASE_URL}/feed.xml`,
    },
    author: {
      name: 'Ignorami',
      email: 'helloignorami@gmail.com',
      link: BASE_URL,
    },
  })

  for (const article of articles as ResolvedArticle[]) {
    feed.addItem({
      title: article.title,
      id: `${BASE_URL}/articles/${article.slug}`,
      link: `${BASE_URL}/articles/${article.slug}`,
      description: article.dek || '',
      date: new Date(article.publishedAt || article.createdAt),
      category: article.category ? [{ name: article.category.name }] : undefined,
      author: article.author
        ? [{ name: article.author.name, email: 'helloignorami@gmail.com' }]
        : undefined,
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
