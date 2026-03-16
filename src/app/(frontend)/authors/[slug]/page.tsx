import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { Container, Box, Text, SimpleGrid } from '@mantine/core'
import { ArticleCard } from '@/components/ArticleCard'
import type { ResolvedArticle } from '@/types/resolved'
import type { Author } from '@/payload-types'
import styles from './page.module.css'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs: authors } = await payload.find({
    collection: 'authors',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const author = authors[0] as Author
  if (!author) notFound()

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      'author.slug': { equals: slug },
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 24,
  })

  return (
    <Container size={1100} py="xl">
      <Box component="header" className={styles.header}>
        {/* Avatar goes here when ready:
        {author.avatar && (
          <Image
            src={author.avatar.url}
            alt={author.name}
            width={80}
            height={80}
            className={styles.avatar}
          />
        )} */}
        <Box className={styles.meta}>
          <Text className={styles.eyebrow}>Author</Text>
          <Text component="h1" className={styles.name}>
            {author.name}
          </Text>
          {author.bio && <Text className={styles.bio}>{author.bio}</Text>}
          <Text className={styles.count}>
            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
          </Text>
        </Box>
      </Box>

      {articles.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {(articles as ResolvedArticle[]).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </SimpleGrid>
      ) : (
        <Text className={styles.empty}>No articles yet. Check back soon.</Text>
      )}
    </Container>
  )
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'authors',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const author = docs[0] as Author
  if (!author) return {}

  return {
    title: `${author.name} | Ignorami`,
    description: author.bio || `Read all articles by ${author.name} on Ignorami.`,
  }
}
