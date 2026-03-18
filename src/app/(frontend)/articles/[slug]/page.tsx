import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Box, Text, Anchor, Group } from '@mantine/core'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { ResolvedArticle } from '@/types/resolved'
import styles from './page.module.css'
import { ContentTypeBadge } from '@/components/ContentTypeBadge'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  const article = docs[0] as ResolvedArticle
  if (!article) notFound()

  const { title, dek, content, author, category, coverImage, publishedAt } = article

  return (
    <Container size={720} py="xl">
      <Box component="article">
        <Box component="header" className={styles.header}>
          {article.contentType && article.contentType !== 'satire' && (
            <ContentTypeBadge contentType={article.contentType} />
          )}
          {category && (
            <Anchor
              component={Link}
              href={`/category/${category.slug}`}
              className={styles.category}
            >
              {category.name}
            </Anchor>
          )}
          <Text component="h1" className={styles.title}>
            {title}
          </Text>
          {dek && <Text className={styles.dek}>{dek}</Text>}
          <Group gap="md" className={styles.meta}>
            {author?.name && (
              <Text component="span" className={styles.metaItem}>
                By{' '}
                <Anchor
                  component={Link}
                  href={`/authors/${author.slug}`}
                  className={styles.metaLink}
                >
                  {author.name}
                </Anchor>
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

        {coverImage?.url && (
          <Box className={styles.heroWrap}>
            <Image
              src={coverImage.url}
              alt={coverImage.alt || title}
              fill
              priority
              className={styles.hero}
            />
            {coverImage.caption && <Text className={styles.caption}>{coverImage.caption}</Text>}
          </Box>
        )}

        <Box className="article-body">
          <RichText data={content} />
        </Box>

        {author && (
          <Box component="footer" className={styles.authorBox}>
            {author.avatar?.url && (
              <Image
                src={author.avatar.url}
                alt={author.name}
                width={56}
                height={56}
                className={styles.avatar}
              />
            )}
            <Box>
              <Text className={styles.authorName}>{author.name}</Text>
              {author.bio && <Text className={styles.authorBio}>{author.bio}</Text>}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const article = docs[0] as ResolvedArticle
  if (!article) return {}

  return {
    title: article.seo?.metaTitle || `${article.title} | Ignorami`,
    description: article.seo?.metaDescription || article.dek,
    openGraph: {
      images: article.seo?.ogImage?.url
        ? [article.seo.ogImage.url]
        : article.coverImage?.url
          ? [article.coverImage.url]
          : [],
    },
  }
}
