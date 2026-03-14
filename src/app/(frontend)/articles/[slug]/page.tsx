// src/app/(frontend)/articles/[slug]/page.tsx
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import styles from './page.module.css'

type Props = {
  params: { slug: string }
}

export default async function ArticlePage({ params }: Props) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: params.slug },
      status: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  const article = docs[0]
  if (!article) notFound()

  const { title, dek, content, author, category, coverImage, publishedAt } = article

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        {category?.name && (
          <Link href={`/category/${category.slug}`} className={styles.category}>
            {category.name}
          </Link>
        )}
        <h1 className={styles.title}>{title}</h1>
        {dek && <p className={styles.dek}>{dek}</p>}
        <div className={styles.meta}>
          {author?.name && (
            <span>
              By <Link href={`/authors/${author.slug}`}>{author.name}</Link>
            </span>
          )}
          {publishedAt && (
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          )}
        </div>
      </header>

      {coverImage?.url && (
        <div className={styles.heroWrap}>
          <Image
            src={coverImage.url}
            alt={coverImage.alt || title}
            fill
            priority
            className={styles.hero}
          />
          {coverImage.caption && <p className={styles.caption}>{coverImage.caption}</p>}
        </div>
      )}

      <div className={styles.body}>
        <RichText data={content} />
      </div>

      {author && (
        <footer className={styles.authorBox}>
          {author.avatar?.url && (
            <Image
              src={author.avatar.url}
              alt={author.name}
              width={56}
              height={56}
              className={styles.avatar}
            />
          )}
          <div>
            <p className={styles.authorName}>{author.name}</p>
            {author.bio && <p className={styles.authorBio}>{author.bio}</p>}
          </div>
        </footer>
      )}
    </article>
  )
}

export async function generateMetadata({ params }: Props) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: params.slug } },
    limit: 1,
  })
  const article = docs[0]
  if (!article) return {}

  return {
    title: article.seo?.metaTitle || article.title,
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
