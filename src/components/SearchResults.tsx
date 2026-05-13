'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton, Box, Text, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { ArticleCard } from './ArticleCard'
import type { ResolvedArticle } from '@/types/resolved'
import styles from './SearchResults.module.css'

type Props = {
  query: string
}

export function SearchResults({ query: initialQuery }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<ResolvedArticle[]>([])
  const [loading, setLoading] = useState(!!initialQuery)
  const [hasSearched, setHasSearched] = useState(!!initialQuery)
  const [debounced] = useDebouncedValue(query, 300)

  // True when the user is typing but debounce hasn't fired yet
  const isTyping = query !== debounced

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.docs)
      setHasSearched(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounced) {
      search(debounced)
      router.replace(`/search?q=${encodeURIComponent(debounced)}`, { scroll: false })
    } else {
      setResults([])
      router.replace('/search', { scroll: false })
    }
  }, [debounced, search, router])

  useEffect(() => {
    if (initialQuery) search(initialQuery)
  }, [])

  const showNoResults =
    !loading && !isTyping && hasSearched && results.length === 0 && debounced.trim().length >= 2
  const showEmpty = !loading && !isTyping && !debounced
  const showResults = !loading && !isTyping && results.length > 0

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
