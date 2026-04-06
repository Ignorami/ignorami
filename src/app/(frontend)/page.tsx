import { Container, Box, SimpleGrid } from '@mantine/core'
import { ArticleCard } from '@/components/ArticleCard'
import { ShortFormCard } from '@/components/ShortFormCard'
import { Pagination } from '@/components/Pagination'
import { getArticles, getFeaturedArticle, getShortFormArticles } from '@/lib/getArticles'
import type { ResolvedArticle } from '@/types/resolved'
import Link from 'next/link'
import styles from './page.module.css'

export const revalidate = 60

export default async function HomePage() {
  const [{ articles, totalPages }, featured, shortFormArticles] = await Promise.all([
    getArticles(1),
    getFeaturedArticle(),
    getShortFormArticles(5),
  ])

  const mainArticles = featured ? articles.filter((a) => a.id !== featured.id) : articles

  return (
    <Container size={1100} py="xl">
      <Box className={styles.layout}>
        {/* Main feed */}
        <Box className={styles.main}>
          {featured && (
            <Box className={styles.featured}>
              <ArticleCard article={featured} featured />
            </Box>
          )}
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {mainArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </SimpleGrid>
          <Pagination currentPage={1} totalPages={totalPages} />
        </Box>

        {/* Short form sidebar */}
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
