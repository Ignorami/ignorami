import { Box, SimpleGrid } from '@mantine/core'
import { ArticleCard } from './ArticleCard'
import { Pagination } from './Pagination'
import type { ResolvedArticle } from '@/types/resolved'
import styles from './ArticleGrid.module.css'

type Props = {
  articles: ResolvedArticle[]
  featured?: ResolvedArticle
  currentPage: number
  totalPages: number
}

export function ArticleGrid({ articles, featured, currentPage, totalPages }: Props) {
  const nonFeaturedArticles = featured ? articles.filter((a) => a.id !== featured.id) : articles
  return (
    <Box>
      {featured && currentPage === 1 && (
        <Box className={styles.featured}>
          <ArticleCard article={featured} featured />
        </Box>
      )}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {nonFeaturedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </SimpleGrid>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </Box>
  )
}
