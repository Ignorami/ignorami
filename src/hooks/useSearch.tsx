'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDebouncedValue } from '@mantine/hooks'
import type { ResolvedArticle } from '@/types/resolved'

export function useSearch(initialQuery: string) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<ResolvedArticle[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(!!initialQuery)
  const [debounced] = useDebouncedValue(query, 300)

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

  const showNoResults =
    !loading && !isTyping && hasSearched && results.length === 0 && debounced.trim().length >= 2
  const showEmpty = !loading && !isTyping && !debounced
  const showResults = !loading && !isTyping && results.length > 0

  return {
    query,
    setQuery,
    results,
    loading,
    isTyping,
    debounced,
    showNoResults,
    showEmpty,
    showResults,
  }
}
