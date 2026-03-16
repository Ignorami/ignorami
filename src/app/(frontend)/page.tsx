// src/app/(frontend)/page.tsx
import { getPayloadClient } from '@/lib/payload'
import { ArticleCard } from '@/components/ArticleCard'
import styles from './page.module.css'

export const revalidate = 60

export default async function HomePage() {
  const payload = await getPayloadClient()

  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 10,
    depth: 2, // resolve author, category, coverImage relationships
  })

  const [featured, ...rest] = articles

  return (
    <div className={styles.page}>
      <section className={styles.featured}>
        {featured && <ArticleCard article={featured} featured />}
      </section>

      <section className={styles.grid}>
        {rest.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
    </div>
  )
}
