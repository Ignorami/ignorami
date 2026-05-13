import { Container, Box, SimpleGrid, Skeleton } from '@mantine/core'
import { ArticleCardSkeleton } from '@/components/ArticleCardSkeleton'
import styles from './page.module.css'

export default function AuthorLoading() {
  return (
    <Container size={1100} py="xl">
      <Box className={styles.header}>
        <Box className={styles.meta}>
          <Skeleton height={10} width="15%" mb="sm" />
          <Skeleton height={48} width="50%" mb="sm" />
          <Skeleton height={14} width="70%" mb="xs" />
          <Skeleton height={14} width="60%" mb="sm" />
          <Skeleton height={10} width="20%" />
        </Box>
      </Box>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
