import { getPayloadClient } from '@/lib/payload'
import { ArticleCard } from '@/components/ArticleCard'
import { Container, Box, SimpleGrid } from '@mantine/core'
import type { ResolvedArticle } from '@/types/resolved'
import styles from './page.module.css'

export const revalidate = 60

export default async function HomePage() {
  const payload = await getPayloadClient()

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 10,
    depth: 2,
  })

  const [featured, ...rest] = articles as ResolvedArticle[]

  return (
    <Container size={1100} py="xl">
      {featured && (
        <Box className={styles.featured}>
          <ArticleCard article={featured} featured />
        </Box>
      )}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {rest.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
