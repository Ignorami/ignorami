import { Container } from '@mantine/core'
import { notFound } from 'next/navigation'
import { ArticleGrid } from '@/components/ArticleGrid'
import { getArticles } from '@/lib/getArticles'

export const revalidate = 60

type Props = {
  params: Promise<{ page: string }>
}

export default async function PaginatedPage({ params }: Props) {
  const { page: pageParam } = await params
  const page = parseInt(pageParam)

  if (isNaN(page) || page < 2) notFound()

  const { articles, totalPages } = await getArticles(page)

  if (page > totalPages) notFound()

  return (
    <Container size={1100} py="xl">
      <ArticleGrid articles={articles} currentPage={page} totalPages={totalPages} />
    </Container>
  )
}

export async function generateMetadata({ params }: Props) {
  const { page } = await params
  return {
    title: `Page ${page} | Ignorami`,
  }
}
