import { getPayloadClient } from './payload'
import type { ResolvedArticle } from '@/types/resolved'

const ARTICLES_PER_PAGE = 9

export async function getArticles(page: number = 1) {
  const payload = await getPayloadClient()

  const { docs, totalDocs } = await payload.find({
    collection: 'articles',
    where: { status: { equals: 'published' }, contentType: { equals: 'article' } },
    sort: '-publishedAt',
    limit: ARTICLES_PER_PAGE,
    page,
    depth: 2,
  })

  const totalPages = Math.ceil(totalDocs / ARTICLES_PER_PAGE)
  const articles = docs as ResolvedArticle[]

  return { articles, totalPages, totalDocs }
}

export async function getFeaturedArticle() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      featured: { equals: true },
    },
    limit: 1,
    depth: 2,
  })

  return (docs[0] as ResolvedArticle) ?? null
}

export async function getShortFormArticles(limit: number = 5) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      contentType: { equals: 'short-form' },
    },
    sort: '-publishedAt',
    depth: 2,
    limit,
  })

  return docs as ResolvedArticle[]
}
