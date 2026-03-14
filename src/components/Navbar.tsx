// src/components/Navbar.tsx
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import styles from './Navbar.module.css'

export async function Navbar() {
  const payload = await getPayloadClient()
  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 8,
  })

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.dateline}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <Link href="/" className={styles.wordmark}>
          Ignorami
        </Link>
        <div className={styles.tagline}>Tagline Goes Here</div>
      </div>
      <nav className={styles.nav}>
        <ul>
          {categories.map((cat: any) => (
            <li key={cat.id}>
              <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
