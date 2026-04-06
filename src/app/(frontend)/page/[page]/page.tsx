import { Container, Box, SimpleGrid } from '@mantine/core'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/ArticleCard'
import { ShortFormCard } from '@/components/ShortFormCard'
import { Pagination } from '@/components/Pagination'
import { getArticles, getShortFormArticles } from '@/lib/getArticles'
import Link from 'next/link'
import styles from '../../page.module.css'

export const revalidate = 60

type Props = {
  params: Promise<{ page: string }>
}

export default async function PaginatedPage({ params }: Props) {
  const { page: pageParam } = await params
  const page = parseInt(pageParam)

  if (isNaN(page) || page < 2) notFound()

  const [{ articles, totalPages }, shortFormArticles] = await Promise.all([
    getArticles(page),
    getShortFormArticles(5),
  ])

  if (page > totalPages) notFound()

  return (
    <Container size={1100} py="xl">
      <Box className={styles.layout}>
        <Box className={styles.main}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </SimpleGrid>
          <Pagination currentPage={page} totalPages={totalPages} />
        </Box>

        {shortFormArticles.length > 0 && (
          <Box component="aside" className={styles.sidebar}>
            <Box className={styles.sidebarHeader}>
              <span className={styles.sidebarTitle}>Short Form</span>
            </Box>
            <Box className={styles.sidebarArticles}>
              {shortFormArticles.map((article) => (
                <ShortFormCard key={article.id} article={article} />
              ))}
            </Box>
            <Link href="/short-form" className={styles.seeAll}>
              See All Short Form →
            </Link>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export async function generateMetadata({ params }: Props) {
  const { page } = await params
  return {
    title: `Page ${page} | Ignorami`,
  }
}
