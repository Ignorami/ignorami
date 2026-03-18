import Link from 'next/link'
import Image from 'next/image'
import { Box, Text, Anchor, Group } from '@mantine/core'
import styles from './ArticleCard.module.css'
import type { ResolvedArticle } from '@/types/resolved'
import { ContentTypeBadge } from './ContentTypeBadge'

type Props = {
  article: ResolvedArticle
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: Props) {
  const { title, dek, slug, author, category, coverImage, publishedAt } = article

  return (
    <Box component="article" className={`${styles.card} ${featured ? styles.featured : ''}`}>
      {coverImage?.url && (
        <Link href={`/articles/${slug}`} className={styles.imageWrap}>
          <Image src={coverImage.url} alt={coverImage.alt || title} fill className={styles.image} />
        </Link>
      )}
      <Box className={styles.body}>
        {article.contentType && article.contentType !== 'satire' && (
          <ContentTypeBadge contentType={article.contentType} />
        )}
        {category && (
          <Anchor component={Link} href={`/category/${category.slug}`} className={styles.category}>
            {category.name}
          </Anchor>
        )}
        <Anchor component={Link} href={`/articles/${slug}`} className={styles.titleLink}>
          <Text component="h2" className={styles.title}>
            {title}
          </Text>
        </Anchor>
        {dek && <Text className={styles.dek}>{dek}</Text>}
        <Group gap="md" className={styles.meta}>
          {author?.name && (
            <Text component="span" className={styles.metaItem}>
              By {author.name}
            </Text>
          )}
          {publishedAt && (
            <Text component="time" className={styles.metaItem}>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          )}
        </Group>
      </Box>
    </Box>
  )
}
