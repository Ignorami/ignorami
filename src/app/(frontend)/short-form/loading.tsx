import { Container, Box, SimpleGrid, Skeleton } from '@mantine/core'
import { ArticleCardSkeleton } from '@/components/ArticleCardSkeleton'
import styles from './page.module.css'

export default function ShortFormLoading() {
  return (
    <Container size={1100} py="xl">
      <Box className={styles.header}>
        <Skeleton height={10} width="15%" mb="sm" />
        <Skeleton height={48} width="40%" mb="sm" />
        <Skeleton height={14} width="50%" />
      </Box>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
