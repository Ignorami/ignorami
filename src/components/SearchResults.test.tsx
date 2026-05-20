import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SearchResults } from './SearchResults'

vi.mock('@mantine/core', () => ({
  Box: ({ children }: any) => <div>{children}</div>,
  Text: ({ children }: any) => <p>{children}</p>,
  TextInput: ({ value, onChange, placeholder }: any) => (
    <input value={value} onChange={onChange} placeholder={placeholder} />
  ),
  Skeleton: () => <div data-testid="skeleton" />,
}))

vi.mock('./ArticleCard', () => ({
  ArticleCard: ({ article }: any) => <div data-testid="article-card">{article.title}</div>,
}))

const mockUseSearch = vi.fn()
vi.mock('@/hooks/useSearch', () => ({
  useSearch: (query: string) => mockUseSearch(query),
}))

const defaultState = {
  query: '',
  setQuery: vi.fn(),
  results: [],
  loading: false,
  isTyping: false,
  debounced: '',
  showNoResults: false,
  showEmpty: true,
  showResults: false,
}

describe('SearchResults', () => {
  it('renders the search input', () => {
    mockUseSearch.mockReturnValue(defaultState)
    render(<SearchResults query="" />)
    expect(screen.getByPlaceholderText('Search articles...')).toBeInTheDocument()
  })

  it('shows empty state when no query', () => {
    mockUseSearch.mockReturnValue(defaultState)
    render(<SearchResults query="" />)
    expect(screen.getByText('Search results will appear here.')).toBeInTheDocument()
  })

  it('shows no results message', () => {
    mockUseSearch.mockReturnValue({
      ...defaultState,
      query: 'test',
      debounced: 'test',
      showEmpty: false,
      showNoResults: true,
      hasSearched: true,
    })
    render(<SearchResults query="test" />)
    expect(screen.getByText(/No results found for/)).toBeInTheDocument()
  })

  it('shows skeleton when loading', () => {
    mockUseSearch.mockReturnValue({
      ...defaultState,
      query: 'test',
      debounced: 'test',
      loading: true,
      showEmpty: false,
    })
    render(<SearchResults query="test" />)
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0)
  })

  it('shows results when available', () => {
    mockUseSearch.mockReturnValue({
      ...defaultState,
      query: 'test',
      debounced: 'test',
      results: [{ id: 1, title: 'Test Article', slug: 'test-article', contentType: 'article' }],
      showEmpty: false,
      showResults: true,
    })
    render(<SearchResults query="test" />)
    expect(screen.getByTestId('article-card')).toBeInTheDocument()
    expect(screen.getByText('1 result')).toBeInTheDocument()
  })

  it('shows plural result count', () => {
    mockUseSearch.mockReturnValue({
      ...defaultState,
      query: 'test',
      debounced: 'test',
      results: [
        { id: 1, title: 'Test Article', slug: 'test-article', contentType: 'article' },
        { id: 2, title: 'Another Article', slug: 'another-article', contentType: 'article' },
      ],
      showEmpty: false,
      showResults: true,
    })
    render(<SearchResults query="test" />)
    expect(screen.getByText('2 results')).toBeInTheDocument()
  })
})
