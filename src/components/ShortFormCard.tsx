import Link from 'next/link'
import { Box, Anchor } from '@mantine/core'
import type { ResolvedArticle } from '@/types/resolved'
import styles from './ShortFormCard.module.css'

type Props = {
  article: ResolvedArticle
}

export function ShortFormCard({ article }: Props) {
  const { title, dek, slug, category, publishedAt } = article

  return (
    <Box component="article" className={styles.card}>
      <Box className={styles.eyebrow}>
        {category && (
          <Anchor component={Link} href={`/category/${category.slug}`} className={styles.category}>
            {category.name}
          </Anchor>
        )}
        {publishedAt && (
          <span className={styles.date}>
            {new Date(publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        )}
      </Box>
      <Anchor component={Link} href={`/articles/${slug}`} className={styles.titleLink}>
        <Box component="h3" className={styles.title}>
          {title}
        </Box>
      </Anchor>
      {dek && <p className={styles.dek}>{dek}</p>}
    </Box>
  )
}
