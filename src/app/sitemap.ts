import { getPayloadClient } from '@/lib/payload'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://ignorami.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: { status: { equals: 'published' } },
    limit: 1000,
    depth: 0,
  })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 100,
    depth: 0,
  })

  const { docs: authors } = await payload.find({
    collection: 'authors',
    limit: 100,
    depth: 0,
  })

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: new Date(category.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const authorUrls: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${BASE_URL}/authors/${author.slug}`,
    lastModified: new Date(author.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/short-form`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...articleUrls,
    ...categoryUrls,
    ...authorUrls,
  ]
}
