// src/components/Pagination.tsx
import Link from 'next/link'
import { Group } from '@mantine/core'
import styles from './Pagination.module.css'

type Props = {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null

  const prevHref = currentPage > 1 ? (currentPage === 2 ? '/' : `/page/${currentPage - 1}`) : null
  const nextHref = currentPage < totalPages ? `/page/${currentPage + 1}` : null

  return (
    <Group justify="space-between" className={styles.pagination}>
      <div>
        {prevHref ? (
          <Link href={prevHref} className={styles.link}>
            ← Newer
          </Link>
        ) : (
          <span className={`${styles.link} ${styles.disabled}`}>← Newer</span>
        )}
      </div>
      <span className={styles.count}>
        Page {currentPage} of {totalPages}
      </span>
      <div>
        {nextHref ? (
          <Link href={nextHref} className={styles.link}>
            Older →
          </Link>
        ) : (
          <span className={`${styles.link} ${styles.disabled}`}>Older →</span>
        )}
      </div>
    </Group>
  )
}
