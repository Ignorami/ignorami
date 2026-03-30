import Link from 'next/link'
import { Group } from '@mantine/core'
import styles from './Pagination.module.css'

type Props = {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null

  const prev = currentPage > 1 ? (currentPage === 2 ? '/' : `/page/${currentPage - 1}`) : null
  const next = currentPage < totalPages ? `/page/${currentPage + 1}` : null

  return (
    <Group justify="space-between" className={styles.pagination}>
      <div>
        {prev && (
          <Link href={prev} className={styles.link}>
            ← Newer
          </Link>
        )}
      </div>
      <span className={styles.count}>
        Page {currentPage} of {totalPages}
      </span>
      <div>
        {next && (
          <Link href={next} className={styles.link}>
            Older →
          </Link>
        )}
      </div>
    </Group>
  )
}
