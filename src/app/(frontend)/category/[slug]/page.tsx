// src/app/(frontend)/category/[slug]/page.tsx
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { Container, Box, Text, SimpleGrid } from '@mantine/core'
import { ArticleCard } from '@/components/ArticleCard'
import type { ResolvedArticle } from '@/types/resolved'
import type { Category } from '@/payload-types'
import styles from './page.module.css'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const category = categories[0] as Category
  if (!category) notFound()

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      'category.slug': { equals: slug },
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 24,
  })

  return (
    <Container size={1100} py="xl">
      <Box component="header" className={styles.header}>
        <Text className={styles.eyebrow}>Category</Text>
        <Text component="h1" className={styles.title}>
          {category.name}
        </Text>
        {category.description && <Text className={styles.description}>{category.description}</Text>}
        <Text className={styles.count}>
          {articles.length} {articles.length === 1 ? 'article' : 'articles'}
        </Text>
      </Box>

      {articles.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {(articles as ResolvedArticle[]).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </SimpleGrid>
      ) : (
        <Text className={styles.empty}>No articles in this category yet. Check back soon.</Text>
      )}
    </Container>
  )
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const category = docs[0] as Category
  if (!category) return {}

  return {
    title: `${category.name} | Ignorami`,
    description: category.description || `Read all ${category.name} articles on Ignorami.`,
  }
}
