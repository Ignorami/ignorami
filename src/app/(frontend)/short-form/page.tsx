import { getPayloadClient } from '@/lib/payload'
import { Container, Box, Text, SimpleGrid } from '@mantine/core'
import { ArticleCard } from '@/components/ArticleCard'
import type { ResolvedArticle } from '@/types/resolved'
import styles from './page.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Short Form | Ignorami',
  description: 'Brief dispatches from the Ignorami desk.',
}

export default async function ShortFormPage() {
  const payload = await getPayloadClient()

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
      contentType: { equals: 'short-form' },
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 24,
  })

  return (
    <Container size={1100} py="xl">
      <Box component="header" className={styles.header}>
        <Text className={styles.eyebrow}>Content Type</Text>
        <Text component="h1" className={styles.title}>
          Short Form
        </Text>
        <Text className={styles.description}>Brief dispatches from the Ignorami desk.</Text>
      </Box>

      {articles.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {(articles as ResolvedArticle[]).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </SimpleGrid>
      ) : (
        <Text className={styles.empty}>No short form articles yet. Check back soon.</Text>
      )}
    </Container>
  )
}
