// src/components/ArticleCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import styles from './ArticleCard.module.css'

type Props = {
  article: any
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: Props) {
  const { title, dek, slug, author, category, coverImage, publishedAt } = article

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      {coverImage?.url && (
        <Link href={`/articles/${slug}`} className={styles.imageWrap}>
          <Image src={coverImage.url} alt={coverImage.alt || title} fill className={styles.image} />
        </Link>
      )}
      <div className={styles.body}>
        {category?.name && (
          <Link href={`/category/${category.slug}`} className={styles.category}>
            {category.name}
          </Link>
        )}
        <Link href={`/articles/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        {dek && <p className={styles.dek}>{dek}</p>}
        <div className={styles.meta}>
          {author?.name && <span>By {author.name}</span>}
          {publishedAt && (
            <span className={styles.date}>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
