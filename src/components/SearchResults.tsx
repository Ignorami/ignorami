'use client'

import { Skeleton, Box, Text, TextInput } from '@mantine/core'
import { ArticleCard } from './ArticleCard'
import { useSearch } from '@/hooks/useSearch'
import styles from './SearchResults.module.css'

type Props = {
  query: string
}

export function SearchResults({ query: initialQuery }: Props) {
  const {
    query,
    setQuery,
    results,
    loading,
    isTyping,
    debounced,
    showNoResults,
    showEmpty,
    showResults,
  } = useSearch(initialQuery)

  return (
    <Box>
      <TextInput
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        placeholder="Search articles..."
        size="md"
        className={styles.input}
        autoFocus
      />

      {((loading || isTyping) && debounced.trim().length >= 2) ||
      (isTyping && query.trim().length >= 2) ? (
        <Box className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i}>
              <Skeleton height={200} mb="sm" />
              <Skeleton height={12} width="40%" mb="xs" />
              <Skeleton height={20} mb="xs" />
              <Skeleton height={12} width="80%" mb="xs" />
              <Skeleton height={12} width="60%" />
            </Box>
          ))}
        </Box>
      ) : null}

      {showNoResults && (
        <Text className={styles.status}>No results found for &ldquo;{debounced}&rdquo;.</Text>
      )}

      {showEmpty && <Text className={styles.status}>Search results will appear here.</Text>}

      {showResults && (
        <Box className={styles.results}>
          <Text className={styles.count}>
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </Text>
          <Box className={styles.grid}>
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
