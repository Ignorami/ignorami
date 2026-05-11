'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Text, TextInput } from '@mantine/core'
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
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(!!initialQuery)
  const [debounced] = useDebouncedValue(query, 300)

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

  // Run initial search if query provided via URL
  useEffect(() => {
    if (initialQuery) search(initialQuery)
  }, [])

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

      {loading && <Text className={styles.status}>Searching...</Text>}

      {!loading && hasSearched && results.length === 0 && query.trim().length >= 2 && (
        <Text className={styles.status}>No results found for &ldquo;{query}&rdquo;.</Text>
      )}

      {!loading && results.length > 0 && (
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
