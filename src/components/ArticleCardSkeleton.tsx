import { Box, Skeleton } from '@mantine/core'
import styles from './ArticleCardSkeleton.module.css'

type Props = {
  featured?: boolean
}

export function ArticleCardSkeleton({ featured = false }: Props) {
  return (
    <Box className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <Skeleton className={styles.image} />
      <Box className={styles.body}>
        <Skeleton height={10} width="30%" mb="xs" />
        <Skeleton height={featured ? 36 : 24} mb="xs" />
        <Skeleton height={featured ? 24 : 20} width="90%" mb="xs" />
        <Skeleton height={12} width="40%" mt="xs" />
      </Box>
    </Box>
  )
}
