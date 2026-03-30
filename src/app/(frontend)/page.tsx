// src/app/(frontend)/page.tsx
import { Container } from '@mantine/core'
import { ArticleGrid } from '@/components/ArticleGrid'
import { getArticles, getFeaturedArticle } from '@/lib/getArticles'

export const revalidate = 60

export default async function HomePage() {
  const [{ articles, totalPages }, featured] = await Promise.all([
    getArticles(1),
    getFeaturedArticle(),
  ])

  const rest = featured ? articles.filter((a) => a.id !== featured.id) : articles

  return (
    <Container size={1100} py="xl">
      <ArticleGrid
        articles={rest}
        featured={featured ?? articles[0]}
        currentPage={1}
        totalPages={totalPages}
      />
    </Container>
  )
}
